import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../style';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './style/HomeScreenStyles';

// Api
import { fetchTrainerPatients } from '../../services/apiServicePatient';
import { fetchPatientDetails } from '../../services/apiPatient';
import { createPatient } from '../../services/createPatientApi';

interface Patient {
    patient_id: string;
    fullname: string;
    birthdate: string;
    height: string;
    weight: string;
    trainer_id: string;
}

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
    const route = useRoute<HomeScreenRouteProp>();
    const { accessToken, userId } = route.params;

    const [patients, setPatients] = useState<Patient[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPatientFullName, setNewPatientFullName] = useState('');
    const [newPatientBirthdate, setNewPatientBirthdate] = useState('');
    const [newPatientHeight, setNewPatientHeight] = useState('');
    const [newPatientWeight, setNewPatientWeight] = useState('');

    const baseUrl = 'http://10.0.2.2:8000';
    const trainerId = userId; // Usando el userId recibido como trainerId
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const getPatients = async () => {
            try {
                console.log('Access Token:', accessToken);
                const data = await fetchTrainerPatients(baseUrl, trainerId);
                const patientsWithDetails: Patient[] = await Promise.all(
                    data.data.map(async (patient: Patient) => {
                        const patientDetails = await fetchPatientDetails(baseUrl, patient.patient_id);
                        return patientDetails.data[0]; 
                    })
                );
                setPatients(patientsWithDetails);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        getPatients();
    }, []);

    const handleCreatePatient = async () => {
        try {
            await createPatient(baseUrl, trainerId, newPatientFullName, newPatientBirthdate, parseFloat(newPatientHeight), parseFloat(newPatientWeight));
            setModalVisible(false);

            const data = await fetchTrainerPatients(baseUrl, trainerId);
            const patientsWithDetails: Patient[] = await Promise.all(
                data.data.map(async (patient: Patient) => {
                    const patientDetails = await fetchPatientDetails(baseUrl, patient.patient_id);
                    return patientDetails.data[0];
                })
            );
            setPatients(patientsWithDetails);
        } catch (error) {
            console.error('Error creating patient:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.containerHeader}>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>
                            Your {"\n"}<Text style={styles.highlight}>patients</Text>
                        </Text>
                    </View>
                    <View style={styles.containerImage}>
                        <TouchableOpacity 
                            style={styles.circleContainer}
                            onPress={() => navigation.navigate('PatientCreation')}
                        >
                            <FontAwesomeIcon icon={faPlus} size={30} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search */}
                <View style={styles.containerSearch}>
                    <FontAwesomeIcon icon={faSearch} size={20} color={colors.primary} style={styles.searchIcon} />
                    <TextInput
                        placeholder=""
                        placeholderTextColor={colors.theriary}
                        style={styles.searchInput}
                    />
                </View>

                {/* Patients */}
                <View style={styles.containerPatients}>
                    {patients.map((patient, index) => {
                        if (index % 2 === 0) {
                            return (
                                <View style={styles.rowPatients} key={index}>
                                    <TouchableOpacity 
                                        style={styles.patient}
                                        onPress={() => navigation.navigate('Patient', { 
                                            patientId: patient.patient_id,
                                            patientName: patient.fullname,
                                            height: patient.height,
                                            weight: patient.weight,
                                            birthdate: patient.birthdate
                                        })}
                                    >
                                        <Text style={styles.textPatient}>
                                            {patient.fullname}
                                        </Text>
                                        <Text style={styles.datePacient}>
                                            {patient.birthdate}
                                        </Text>
                                    </TouchableOpacity>

                                    {patients[index + 1] && (
                                       <TouchableOpacity 
                                       style={styles.patient}
                                       onPress={() => navigation.navigate('Patient', { 
                                           patientId: patients[index + 1].patient_id,
                                           patientName: patients[index + 1].fullname,
                                           height: patients[index + 1].height,
                                           weight: patients[index + 1].weight,
                                           birthdate: patients[index + 1].birthdate
                                       })}
                                   >
                                   <Text style={styles.textPatient}>
                                       {patients[index + 1].fullname}
                                   </Text>
                                   <Text style={styles.datePacient}>
                                       {patients[index + 1].birthdate}
                                   </Text>
                               </TouchableOpacity>
                                    )}
                                </View>
                            );
                        }
                        return null;
                    })}
                </View>
            </ScrollView>

            {/* Floating Button */}
            <TouchableOpacity
                style={styles.floatingButtonContainer}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesomeIcon icon={faPlus} size={30} color={colors.primary} />
            </TouchableOpacity>

            {/* Modal for New Patient */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.containerX}>
                             <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <FontAwesomeIcon icon={faXmark} size={24} color={colors.primary} />
                               </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>New patient</Text>
                        <View style={styles.containerForms}>
                            <TextInput 
                                placeholder="Full Name" 
                                style={styles.input} 
                                value={newPatientFullName} 
                                onChangeText={setNewPatientFullName} 
                            />
                            <TextInput 
                                placeholder="Birthdate" 
                                style={styles.input} 
                                value={newPatientBirthdate} 
                                onChangeText={setNewPatientBirthdate} 
                            />
                            <View style={styles.rowForms}>
                                <TextInput
                                    placeholder='Height (ft)'
                                    style={styles.inputMidForms}
                                    value={newPatientHeight}
                                    onChangeText={setNewPatientHeight}
                                />
                                <TextInput
                                    placeholder='Weight (lb)'
                                    style={styles.inputMidForms}
                                    value={newPatientWeight}
                                    onChangeText={setNewPatientWeight}
                                /> 
                            </View>
                            <View style={styles.containerButton}>
                                <TouchableOpacity 
                                    style={styles.ButtonLogin} 
                                    onPress={handleCreatePatient}
                                >
                                    <Text style={styles.ButtonLoginText}>Create Patient</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );  
};

export default HomeScreen;
