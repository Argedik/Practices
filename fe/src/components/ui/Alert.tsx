import React from 'react';
import { AlertData } from '../../types';

interface AlertProps {
	alert: AlertData;
}

export const Alert: React.FC<AlertProps> = ({ alert }) => {
	return <div className={`alert ${alert.type}`}>{alert.message}</div>;
};
