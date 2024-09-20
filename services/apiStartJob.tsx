// ../services/apiStartJob.tsx

export const startJob = async (
    baseUrl: string,
    trainerID: string,
    sessionDate: string,
    videoUri: string
  ) => {
    try {
      // Crear un objeto FormData para enviar datos multipart/form-data
      const formData = new FormData();
  
      // Adjuntar el trainerID y sessionDate
      formData.append('trainer_id', trainerID);
      formData.append('session_date', sessionDate);
  
      // Obtener el nombre y tipo del archivo de video
      const videoName = videoUri.split('/').pop() || 'video.mp4';
      const videoType = 'video/mp4'; // Ajusta el tipo MIME si es necesario
  
      // Adjuntar el archivo de video
      formData.append('video', {
        uri: videoUri,
        type: videoType,
        name: videoName,
      });
  
      // Realizar la solicitud POST al servidor sin el token
      const response = await fetch(`${baseUrl}/sessions/start-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      // Manejo de la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Algo salió mal';
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al iniciar el trabajo:', error);
      throw error;
    }
  };
  