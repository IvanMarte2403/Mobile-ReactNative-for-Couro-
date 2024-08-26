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

                        <Text style={styles.textInformation}>
                        {`Height: ${route.params?.height} ● Weight: ${route.params?.weight} lbs`}
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
                   

                    <Text style={styles.textInformationSmall}>
                        {`: ${route.params?.birthdate}`}
                    </Text>
                  
                    {sessionData ? (
                        <>
                       
                        </>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </View>

                <View style={styles.scoreContainer}>
                <Image
                source={require('../../img/recursos/YourScoreImage.png')}
                resizeMode='contain'
                style={styles.scoreImage}
                >

                </Image>
                </View>
                
                <View style={styles.containerEntries}>

                        <Text style={styles.trainingTitle}>
                            Training  Entries
                        </Text>     
                    {/* Row Entries */}
                    <View style={styles.rowEntries}>
                        {/* Entry */}
                        <View style={styles.containerEntry}>
                            <Text style={styles.titleEnty}>
                                Running Score: 20
                            </Text>

                            <Text style={styles.textEnty}>
                                Dec 20.2023
                            </Text>
                        </View>
                        {/* Entry */}
                        <View style={styles.containerEntry}>
                            <Text style={styles.titleEnty}>
                                Running Score: 20
                            </Text>

                            <Text style={styles.textEnty}>
                                Dec 20.2023
                            </Text>
                        </View>
                        
                    </View>

                    {/* Row Entries */}
                    <View style={styles.rowEntries}>
                        {/* Title Entry */}
                                       
                        {/* Entry */}
                        <View style={styles.containerEntry}>
                            <Text style={styles.titleEnty}>
                                Running Score: 20
                            </Text>

                            <Text style={styles.textEnty}>
                                Dec 20.2023
                            </Text>
                        </View>
                        {/* Entry */}
                        <View style={styles.containerEntry}>
                            <Text style={styles.titleEnty}>
                                Running Score: 20
                            </Text>

                            <Text style={styles.textEnty}>
                                Dec 20.2023
                            </Text>
                        </View>
                        
                    </View>
                </View>
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
