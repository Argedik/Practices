import React, { useState, useEffect } from 'react';
import { User, FormData } from '../../types';
import { useUsers } from '../../hooks/useUsers';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Loading } from '../ui/Loading';
import { UserTable } from './UserTable';
import { UserForm } from '../forms/UserForm';
import styles from './UserManagement.module.scss';

export const UserManagement: React.FC = () => {
	const {
		users,
		loading,
		alert,
		fetchUsers,
		createUser,
		updateUser,
		deleteUser,
	} = useUsers();

	const [showModal, setShowModal] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleEdit = (user: User) => {
		setEditingUser(user);
		setShowModal(true);
	};

	const handleDelete = async (id: number) => {
		await deleteUser(id);
	};

	const handleFormSubmit = async (
		userData: FormData,
		isEdit: boolean
	): Promise<boolean> => {
		if (isEdit && editingUser) {
			const userToUpdate: User = {
				id: editingUser.id,
				name: userData.name,
				email: userData.email,
				age: parseInt(userData.age),
				city: userData.city,
			};
			return await updateUser(userToUpdate);
		} else {
			const newUser = {
				name: userData.name,
				email: userData.email,
				age: parseInt(userData.age),
				city: userData.city,
			};
			return await createUser(newUser);
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setEditingUser(null);
	};

	return (
		<div className={styles.container}>
			{alert && <Alert alert={alert} />}

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
					editingUser={editingUser}
					onSubmit={handleFormSubmit}
					onClose={closeModal}
				/>
			)}
		</div>
	);
};
