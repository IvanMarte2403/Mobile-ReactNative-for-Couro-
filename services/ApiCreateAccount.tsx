// services/ApiCreateAccount.tsx

export const createAccount = async (
    baseUrl: string, 
    email: string, 
    password: string, 
    birthdate: string, 
    given_name: string, 
    family_name: string
  ) => {
    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          birthdate,
          given_name,
          family_name,
        }),
      });
  
      console.log('Request sent to /auth/signup with the following data:', {
        email,
        password,
        birthdate,
        given_name,
        family_name,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Response received from /auth/signup:', data);
  
      return data;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error; // Re-lanza el error para manejarlo en el componente
    }
  };
  