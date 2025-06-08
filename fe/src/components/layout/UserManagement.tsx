import React, { useState } from 'react';
import { UserModel, FormData, UserManagementProps } from '../../types';
import { Button } from '../ui/Button';
import { Loading } from '../ui/Loading';
import { UserTable } from './UserTable';
import { UserForm } from '../forms/UserForm';
import styles from './UserManagement.module.scss';

/**
 * Pure Component - SOLID Prensipleri:
 * - Single Responsibility: Sadece UI rendering
 * - Open/Closed: Props interface ile genişletilebilir
 * - Dependency Inversion: Container'dan props alır
 */
export const UserManagement: React.FC<UserManagementProps> = ({
	users,
	loading,
	selectedUser,
	onAddUser,
	onUpdateUser,
	onDeleteUser,
	onEditUser,
	onCancelEdit,
}) => {
	const [showModal, setShowModal] = useState(false);

	const handleEdit = (user: UserModel) => {
		onEditUser(user);
		setShowModal(true);
	};

	const handleDelete = async (id: number) => {
		await onDeleteUser(id);
	};

	const handleFormSubmit = async (
		userData: FormData,
		isEdit: boolean
	): Promise<boolean> => {
		try {
			if (isEdit && selectedUser) {
				const userToUpdate: UserModel = {
					...selectedUser,
					name: userData.name,
					email: userData.email,
					age: parseInt(userData.age),
					city: userData.city,
				};
				await onUpdateUser(userToUpdate);
			} else {
				const newUser = {
					name: userData.name,
					email: userData.email,
					age: parseInt(userData.age),
					city: userData.city,
				};
				await onAddUser(newUser);
			}
			closeModal();
			return true;
		} catch {
			return false;
		}
	};

	const closeModal = () => {
		setShowModal(false);
		onCancelEdit();
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Kullanıcı Yönetimi</h1>
				<Button variant="primary" onClick={() => setShowModal(true)}>
					➕ Yeni Kullanıcı Ekle
				</Button>
			</div>

			{loading ? (
				<Loading />
			) : (
				<UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
			)}

			{showModal && (
				<UserForm
					editingUser={selectedUser}
					onSubmit={handleFormSubmit}
					onClose={closeModal}
				/>
			)}
		</div>
	);
};
