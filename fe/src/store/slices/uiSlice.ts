import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
	sidebarOpen: boolean;
	currentPage: string;
	theme: 'light' | 'dark';
	notifications: Array<{
		id: string;
		message: string;
		type: 'success' | 'error' | 'warning' | 'info';
	}>;
}

const initialState: UiState = {
	sidebarOpen: true,
	currentPage: 'dashboard',
	theme: 'light',
	notifications: [],
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.sidebarOpen = !state.sidebarOpen;
		},
		setCurrentPage: (state, action: PayloadAction<string>) => {
			state.currentPage = action.payload;
		},
		setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
			state.theme = action.payload;
		},
		addNotification: (
			state,
			action: PayloadAction<{
				message: string;
				type: 'success' | 'error' | 'warning' | 'info';
			}>
		) => {
			const notification = {
				id: Date.now().toString(),
				...action.payload,
			};
			state.notifications.push(notification);
		},
		removeNotification: (state, action: PayloadAction<string>) => {
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== action.payload
			);
		},
	},
});

export const {
	toggleSidebar,
	setCurrentPage,
	setTheme,
	addNotification,
	removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
