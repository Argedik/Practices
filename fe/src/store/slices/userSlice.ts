import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../types';
import { ApiService } from '../../services/api';

interface UserState {
	users: UserModel[];
	loading: boolean;
	error: string | null;
	selectedUser: UserModel | null;
}

const initialState: UserState = {
	users: [],
	loading: false,
	error: null,
	selectedUser: null,
};

// Async Thunks
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await ApiService.fetchUsers();
	return response.map((user) => ({
		...user,
		createdDate: new Date().toISOString(),
	}));
});

export const addUser = createAsyncThunk(
	'users/addUser',
	async (userData: Omit<UserModel, 'id' | 'createdDate'>) => {
		const response = await ApiService.createUser(userData);
		return response;
	}
);

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (userData: UserModel) => {
		const response = await ApiService.updateUser(userData);
		return response;
	}
);

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (id: number) => {
		await ApiService.deleteUser(id);
		return id;
	}
);

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setSelectedUser: (state, action: PayloadAction<UserModel | null>) => {
			state.selectedUser = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch Users
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || 'Kullanıcılar yüklenirken hata oluştu';
			})
			// Add User
			.addCase(addUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addUser.fulfilled, (state) => {
				state.loading = false;
				// Re-fetch users after successful add
			})
			.addCase(addUser.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || 'Kullanıcı eklenirken hata oluştu';
			})
			// Update User
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.loading = false;
				// Re-fetch users after successful update
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || 'Kullanıcı güncellenirken hata oluştu';
			})
			// Delete User
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.loading = false;
				state.users = state.users.filter((user) => user.id !== action.payload);
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || 'Kullanıcı silinirken hata oluştu';
			});
	},
});

export const { setSelectedUser, clearError } = userSlice.actions;
export default userSlice.reducer;
