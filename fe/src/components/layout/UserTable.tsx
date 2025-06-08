import React from 'react';
import { UserModel } from '../../types';
import { Button } from '../ui/Button';
import styles from './UserTable.module.scss';

interface UserTableProps {
	users: UserModel[];
	onEdit: (user: UserModel) => void;
	onDelete: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
	users,
	onEdit,
	onDelete,
}) => {
	const handleDelete = (id: number, name: string) => {
		if (
			confirm(`"${name}" kullanıcısını silmek istediğinizden emin misiniz?`)
		) {
			onDelete(id);
		}
	};

	return (
		<div className={styles.tableContainer}>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Ad Soyad</th>
						<th>E-posta</th>
						<th>Yaş</th>
						<th>Şehir</th>
						<th>İşlemler</th>
					</tr>
				</thead>
				<tbody>
					{users.length === 0 ? (
						<tr>
							<td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>
								Henüz kullanıcı bulunmuyor
							</td>
						</tr>
					) : (
						users.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.age}</td>
								<td>{user.city}</td>
								<td>
									<div className={styles.actions}>
										<Button variant="primary" onClick={() => onEdit(user)}>
											✏️ Düzenle
										</Button>
										<Button
											variant="danger"
											onClick={() => handleDelete(user.id, user.name)}
										>
											🗑️ Sil
										</Button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};
