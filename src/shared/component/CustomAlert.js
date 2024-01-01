import React from 'react';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = ({ message, messageType }) => {
	const getVariant = () => {
		switch (messageType) {
			case 'SECONDARY':
				return 'secondary';
			case 'WARNING':
				return 'warning';
			case 'SUCCESS':
				return 'success';
			default:
				return 'primary';
		}
	};

	return (
		<Alert show={!!message} key={getVariant()} variant={getVariant()} style={{ width: 'fit-content' }}>
			{message}
		</Alert>
	);
};

export default CustomAlert;
