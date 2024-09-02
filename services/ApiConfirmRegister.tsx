export const confirmEmail = async (baseUrl: string, email: string, code: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                code: code,
            }),
        });

        console.log('Request sent:', {
            email: email,
            code: code,
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
