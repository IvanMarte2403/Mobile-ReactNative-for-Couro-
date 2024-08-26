import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../style';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import styles from './style/patientScreenStyles';
import { fetchPatientSessions } from '../../services/apiPatientSessions';

const PatientScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Patient'>>();

    const [sessionData, setSessionData] = useState<any>(null);
    const baseUrl = 'http://10.0.2.2:8000';

    useEffect(() => {
        const loadPatientSessions = async () => {
            try {
                const patientId = route.params?.patientId;
                console.log('Patient ID:', patientId);
                if (patientId) {
                    const data = await fetchPatientSessions(baseUrl, patientId);
                    console.log('Session data:', JSON.stringify(data, null, 2)); // Imprimir con formato
                    setSessionData(data);
                }
            } catch (error) {
                console.error('Error fetching session data:', error);
            }
        };
    
        loadPatientSessions();
    }, [route.params?.patientId]);

    return(
        <View style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.containerHeader}>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>
                            {route.params?.patientName || "Patient"} {"\n"}
                        </Text>
                    </View>

                    <View style={styles.containerImage}>
                        <TouchableOpacity 
                        style={styles.circleContainer}
                        onPress={() => navigation.navigate('Home')}
                        >
                            <FontAwesomeIcon icon={faHome} size={30} color={colors.secondary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Personal Information */}    
                <View style={styles.personalInformation}>
                    {sessionData ? (
                        <>
                            <Text style={styles.textInformation}>
                                {sessionData.data.gender} <Text style={styles.highlight}> ● </Text> 
                                {sessionData.data.height} <Text style={styles.highlight}> ● </Text>
                                {sessionData.data.weight} lbs
                            </Text>
                            <Text style={styles.textInformationSmall}>
                                {sessionData.data.age} Years old  <Text style={styles.highlight}> ● </Text> 
                                {sessionData.data.birthdate}
                            </Text>
                        </>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>

                {/* Mostrar más información aquí según los datos de `sessionData` */}
            </ScrollView>

            {/* ===============Floating Button================= */}
            <TouchableOpacity
                style={styles.floatingButtonContainer}
                onPress={() => navigation.navigate('NewTraining')}
            >
                <FontAwesomeIcon icon={faPlus} size={30} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
}

export default PatientScreen;
