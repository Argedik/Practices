import { useState, useCallback } from 'react';
import { User, AlertData } from '../types';
import { ApiService } from '../services/api';

export const useUsers = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [alert, setAlert] = useState<AlertData | null>(null);

	const showAlert = useCallback(
		(type: 'success' | 'error', message: string) => {
			setAlert({ type, message });
			setTimeout(() => setAlert(null), 3000);
		},
		[]
	);

	const fetchUsers = useCallback(async () => {
		try {
			setLoading(true);
			const usersData = await ApiService.fetchUsers();
			setUsers(usersData);
		} catch {
			showAlert('error', 'Backend bağlantı hatası - Backend çalışıyor mu?');
		} finally {
			setLoading(false);
		}
	}, [showAlert]);

	const createUser = useCallback(
		async (userData: Omit<User, 'id'>) => {
			try {
				const result = await ApiService.createUser(userData);
				if (result.success) {
					showAlert('success', result.message);
					await fetchUsers();
					return true;
				} else {
					showAlert('error', 'İşlem başarısız');
					return false;
				}
			} catch {
				showAlert('error', 'Bir hata oluştu');
				return false;
			}
		},
		[showAlert, fetchUsers]
	);

	const updateUser = useCallback(
		async (userData: User) => {
			try {
				const result = await ApiService.updateUser(userData);
				if (result.success) {
					showAlert('success', result.message);
					await fetchUsers();
					return true;
				} else {
					showAlert('error', 'İşlem başarısız');
					return false;
				}
			} catch {
				showAlert('error', 'Bir hata oluştu');
				return false;
			}
		},
		[showAlert, fetchUsers]
	);

	const deleteUser = useCallback(
		async (id: number) => {
			try {
				const result = await ApiService.deleteUser(id);
				if (result.success) {
					showAlert('success', result.message);
					await fetchUsers();
					return true;
				} else {
					showAlert('error', 'İşlem başarısız');
					return false;
				}
			} catch {
				showAlert('error', 'Bir hata oluştu');
				return false;
			}
		},
		[showAlert, fetchUsers]
	);

	return {
		users,
		loading,
		alert,
		showAlert,
		fetchUsers,
		createUser,
		updateUser,
		deleteUser,
	};
};
