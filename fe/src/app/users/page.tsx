'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchUsers } from '../../store/slices/userSlice';
import { UserManagementContainer } from '../../components/containers/UserManagementContainer';

export default function UsersPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<div>
			<div style={{ marginBottom: '2rem' }}>
				<h1>👥 Kullanıcı Yönetimi</h1>
				<p>Kullanıcı ekleme, düzenleme ve silme işlemleri</p>
			</div>
			<UserManagementContainer />
		</div>
	);
}
