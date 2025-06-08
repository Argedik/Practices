'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	addUser,
	updateUser,
	deleteUser,
	setSelectedUser,
	clearError,
} from '../../store/slices/userSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { UserManagement } from '../layout/UserManagement';
import { UserModel } from '../../types';

/**
 * Container Component - SOLID Prensipleri:
 * - Single Responsibility: Sadece state management ve business logic
 * - Dependency Inversion: UI component'ine data ve callbacks inject eder
 */
export const UserManagementContainer = () => {
	const dispatch = useAppDispatch();
	const { users, loading, error, selectedUser } = useAppSelector(
		(state) => state.users
	);

	useEffect(() => {
		if (error) {
			dispatch(
				addNotification({
					message: error,
					type: 'error',
				})
			);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	const handleAddUser = async (
		userData: Omit<UserModel, 'id' | 'createdDate'>
	) => {
		try {
			await dispatch(addUser(userData)).unwrap();
			dispatch(
				addNotification({
					message: 'Kullanıcı başarıyla eklendi',
					type: 'success',
				})
			);
		} catch {
			dispatch(
				addNotification({
					message: 'Kullanıcı eklenirken hata oluştu',
					type: 'error',
				})
			);
		}
	};

	const handleUpdateUser = async (userData: UserModel) => {
		try {
			await dispatch(updateUser(userData)).unwrap();
			dispatch(setSelectedUser(null));
			dispatch(
				addNotification({
					message: 'Kullanıcı başarıyla güncellendi',
					type: 'success',
				})
			);
		} catch {
			dispatch(
				addNotification({
					message: 'Kullanıcı güncellenirken hata oluştu',
					type: 'error',
				})
			);
		}
	};

	const handleDeleteUser = async (id: number) => {
		if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
			try {
				await dispatch(deleteUser(id)).unwrap();
				dispatch(
					addNotification({
						message: 'Kullanıcı başarıyla silindi',
						type: 'success',
					})
				);
			} catch {
				dispatch(
					addNotification({
						message: 'Kullanıcı silinirken hata oluştu',
						type: 'error',
					})
				);
			}
		}
	};

	const handleEditUser = (user: UserModel) => {
		dispatch(setSelectedUser(user));
	};

	const handleCancelEdit = () => {
		dispatch(setSelectedUser(null));
	};

	return (
		<UserManagement
			users={users}
			loading={loading}
			selectedUser={selectedUser}
			onAddUser={handleAddUser}
			onUpdateUser={handleUpdateUser}
			onDeleteUser={handleDeleteUser}
			onEditUser={handleEditUser}
			onCancelEdit={handleCancelEdit}
		/>
	);
};
