// services/ApiForgotPassword.tsx

export const sendForgotPasswordRequest = async (baseUrl: string, email: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.toLowerCase(),
            }),
        });

        console.log('Request sent to:', `${baseUrl}/auth/forgot-password`);
        console.log('Request body:', {
            email: email.toLowerCase(),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response received:', data);
        return data;
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        throw error;
    }
};
