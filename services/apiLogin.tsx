export const loginUser = async (baseUrl: string, email: string, password: string) => {
    try {
        const loginData = { email, password };
        console.log('POST data:', JSON.stringify(loginData, null, 2));
        console.log("baseUrl", baseUrl);

        const response = await fetch(`${baseUrl}/auth/login`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(loginData),
        });

        console.log("response", response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        console.log('Login successful:', data);
        return data; // Retorna los datos si es necesario manejarlos en el componente
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Re-lanzamos el error para manejarlo en el componente
    }
};

