import { Alert } from 'react-native';

export const loginUser = async (baseUrl: string, email: string, password: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        console.log('Login successful:', data);
        return data; // Retorna los datos si es necesario manejarlos en el componente
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error logging in:', error.message);
            Alert.alert('Login Error', error.message || 'Failed to log in. Please try again.');
        } else {
            console.error('Unknown error:', error);
            Alert.alert('Login Error', 'An unknown error occurred. Please try again.');
        }
        throw error; // Re-lanzamos el error para manejarlo en el componente si es necesario
    }
};

