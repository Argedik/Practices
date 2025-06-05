import React, { useState, useEffect } from 'react';
import { User, FormData } from '../../types';
import { Button } from '../ui/Button';
import styles from './UserForm.module.scss';

interface UserFormProps {
	editingUser: User | null;
	onSubmit: (userData: FormData, isEdit: boolean) => Promise<boolean>;
	onClose: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
	editingUser,
	onSubmit,
	onClose,
}) => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		age: '',
		city: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (editingUser) {
			setFormData({
				name: editingUser.name,
				email: editingUser.email,
				age: editingUser.age.toString(),
				city: editingUser.city,
			});
		} else {
			setFormData({ name: '', email: '', age: '', city: '' });
		}
	}, [editingUser]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.name || !formData.email || !formData.age || !formData.city) {
			alert('Tüm alanları doldurun');
			return;
		}

		setLoading(true);
		const success = await onSubmit(formData, !!editingUser);
		setLoading(false);

		if (success) {
			onClose();
		}
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-header">
					<h2>{editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}</h2>
					<button className="close-btn" onClick={onClose}>
						✕
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Ad Soyad</label>
						<input
							type="text"
							id="name"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							placeholder="Ad Soyad giriniz"
							disabled={loading}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email">E-posta</label>
						<input
							type="email"
							id="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							placeholder="E-posta giriniz"
							disabled={loading}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="age">Yaş</label>
						<input
							type="number"
							id="age"
							value={formData.age}
							onChange={(e) =>
								setFormData({ ...formData, age: e.target.value })
							}
							placeholder="Yaş giriniz"
							min="1"
							max="120"
							disabled={loading}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="city">Şehir</label>
						<input
							type="text"
							id="city"
							value={formData.city}
							onChange={(e) =>
								setFormData({ ...formData, city: e.target.value })
							}
							placeholder="Şehir giriniz"
							disabled={loading}
						/>
					</div>

					<div className={styles.modalActions}>
						<Button
							type="button"
							variant="secondary"
							onClick={onClose}
							disabled={loading}
						>
							İptal
						</Button>
						<Button type="submit" variant="success" disabled={loading}>
							{loading ? '⏳ İşleniyor...' : editingUser ? 'Güncelle' : 'Ekle'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
