export const confirmEmail = async (baseUrl: string, email: string, confirmation_code: string) => {
    try {
        // Convertir el email a minúsculas
        const lowerCaseEmail = email.toLowerCase();

        const response = await fetch(`${baseUrl}/auth/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: lowerCaseEmail,
                confirmation_code: confirmation_code,
            }),
        });

        console.log('Response:', response);

        console.log('Request sent:', {
            email: lowerCaseEmail,
            confirmation_code: confirmation_code,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response received:', data);
        return data;
    } catch (error) {
        console.error('Error confirming email:', error);
        throw error;
    }
};
