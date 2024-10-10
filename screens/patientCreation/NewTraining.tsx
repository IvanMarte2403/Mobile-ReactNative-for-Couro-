    import React, { useState, useContext} from 'react';
    import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
    import { colors, spacing, fontSizes, fonts } from '../../style';
    import { NavigationProp, useNavigation } from '@react-navigation/native';
    import { RootStackParamList } from '../../App'; 
    import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
    import { faHome } from '@fortawesome/free-solid-svg-icons';
    import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
    import { startJob } from '../../services/apiStartJob';
    import { testJob } from '../../services/apiTestJob';  

    import { TrainerContext } from '../TrainerContext';

    import styles from './style/newTrainingStyles';

    //Android Permissions
    import { PermissionsAndroid, Platform } from 'react-native';
    import { check, request, PERMISSIONS, RESULTS, Permission } from 'react-native-permissions';

    
   

    
    const NewTraining = () => {
        const navigation = useNavigation<NavigationProp<RootStackParamList>>();
        const [videoUri, setVideoUri] = useState<string | null>(null);
        const [videoSelected, setVideoSelected] = useState(false);

        const selectVideo = () => {
            const options: ImageLibraryOptions = {
              mediaType: 'video',
              quality: 1,
            };
          
            launchImageLibrary(options, (response) => {
              if (response.didCancel) {
                console.log('Usuario canceló la selección de video');
              } else if (response.errorCode) {
                console.log('Error:', response.errorMessage);
              } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                  setVideoUri(uri);
                  setVideoSelected(true); // Actualiza el estado aquí
                  console.log('Video seleccionado:', uri);
                }
              }
            });
          };
          

        // Permissions
       
        const requestPermissions = async () => {
            let permission: Permission | undefined;
        
            if (Platform.OS === 'ios') {
              permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
            } else if (Platform.OS === 'android') {
              const sdkInt = Number(Platform.Version);
              if (sdkInt >= 33) {
                // Android 13 o superior
                permission = PERMISSIONS.ANDROID.READ_MEDIA_VIDEO;
              } else {
                // Android 12 y versiones anteriores
                permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
              }
            }
        
            if (permission) {
              const result = await request(permission);
        
              if (result === RESULTS.GRANTED) {
                console.log('Permiso concedido');
                selectVideo();
              } else if (result === RESULTS.DENIED) {
                console.log('Permiso denegado pero se puede solicitar nuevamente');
                // Puedes decidir si vuelves a solicitar el permiso o informas al usuario
              } else if (result === RESULTS.BLOCKED) {
                console.log('Permiso denegado y no se puede solicitar nuevamente');
                // Informa al usuario que debe habilitar el permiso manualmente desde la configuración
              } else {
                console.log('Resultado desconocido:', result);
              }
            } else {
              console.log('No se pudo determinar el permiso para la plataforma actual.');
              // Maneja el caso en que la plataforma no es ni iOS ni Android
            }
          };
        
        // Api Video
          
        const { trainerID } = useContext(TrainerContext);

        const handleSubmitVideo = async () => {
            if (!videoUri) {
              console.log('Por favor, selecciona un video primero.');
              return;
            }
            const baseUrl = 'http://ec2-18-205-159-164.compute-1.amazonaws.com';
            const sessionDate = getCurrentDate();
          
            try {
              let data;
              let test = 1;
              // Verifica si `test` es 1 o 0
              if (test === 1) {
                  console.log('Haciendo la consulta a testJob');
                  data = await testJob(baseUrl);
              } else {
                  console.log('Haciendo la consulta a startJob');
                  data = await startJob(baseUrl, trainerID, sessionDate, videoUri);
              }
  
              console.log('¡Video enviado exitosamente!', data);
              setVideoSelected(false);
              setVideoUri(null);
          } catch (error) {
              console.error('Error al enviar el video:', error);
          }
          };
          
          

          const getCurrentDate = () => {
            const date = new Date();
            const yyyy = date.getFullYear();
            const mm = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses empiezan en 0
            const dd = ('0' + date.getDate()).slice(-2);
            return `${yyyy}-${mm}-${dd}`;
          };

        return(
            <View style={styles.container}>

                <View style={styles.containerHeader}>

                        <View style={styles.containerText}>
                            <Text style={styles.subtitle}>
                            December 20 2023
                            </Text>

                            {/* Title */}
                            <Text style={styles.title}>
                                Training Session
                            </Text>
                        </View>

                        <View style={styles.containerImage}>
                            {/* Circle Home */}
                            <TouchableOpacity 
                            style={styles.circleContainer}
                            onPress={() => navigation.navigate('Home')}
                            >
                                <FontAwesomeIcon icon={faHome} size={30} color={colors.secondary} />
                            </TouchableOpacity>
                        </View>
                </View>

                <View style={styles.containerScore}>
                    
                    <View  style={styles.containerCouroRun}>
                        <Text style={styles.trainingTextSession}>
                            Couro Analysis
                        </Text>
                        <Text style={styles.couroRun}>
                            Unlock the power of Couro: Upload your training session for in-depth analysis and insights
                        </Text>
                    </View>

                    <View style={styles.containerUpdload}>
                        <TouchableOpacity
                            style={[
                            styles.updloadVideo,
                            videoSelected && styles.updloadVideoSelected,
                            ]}
                            onPress={videoSelected ? handleSubmitVideo : requestPermissions} 
                        >
                            <Text style={styles.textUpload}>
                            {videoSelected ? 'GetAnalysis' : 'Upload Video'} 
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );

    };

    export default NewTraining;