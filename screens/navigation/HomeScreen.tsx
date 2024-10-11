import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { View, Text, TextInput, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../style';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faPlus, faXmark, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './style/HomeScreenStyles';
import DatePicker from 'react-native-date-picker'; // Importa el selector de fecha

// Api
import { fetchTrainerPatients } from '../../services/apiServicePatient';
import { fetchPatientDetails } from '../../services/apiPatient';
import { createPatient } from '../../services/createPatientApi';


import { TrainerContext } from '../TrainerContext';
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

    const { prueba, userID } = route.params || {};
    const { trainerID, token } = useContext(TrainerContext);

    const [patients, setPatients] = useState<Patient[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPatientFullName, setNewPatientFullName] = useState('');
    const [newPatientBirthdate, setNewPatientBirthdate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar la visibilidad del DatePicker
    const [date, setDate] = useState(new Date()); // Estado para almacenar la fecha seleccionada


    const [newPatientHeight, setNewPatientHeight] = useState('');
    const [newPatientWeight, setNewPatientWeight] = useState('');

    const baseUrl = 'http://ec2-18-205-159-164.compute-1.amazonaws.com';
    const trainerId = userID; 
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    //Checking TrainerContext retriever values in HomeScreen
    console.log('Recovered values of the TrainerCotnext in HomeScreen');
    console.log('trainerID:', trainerID);


    useFocusEffect(
        React.useCallback(() => {
            const getPatients = async () => {
                try {
                    console.log('Sending GET request with the following parameters:');
                    console.log('Base URL:', baseUrl);
                    console.log("Primer FetchTrainer: ")
                    const data = await fetchTrainerPatients(baseUrl, trainerID, prueba);
    
                    console.log('Response from fetchTrainerPatients:', data);
    
                    const patientsWithDetails: Patient[] = await Promise.all(
                        data.data.map(async (patient: Patient) => {
                            console.log('Fetching details for patient ID:', patient.patient_id);
                            const patientDetails = await fetchPatientDetails(baseUrl, patient.patient_id);
                            console.log('Response from fetchPatientDetails:', patientDetails);
                            return patientDetails.data[0]; 
                        })
                    );
    
                    setPatients(patientsWithDetails);
                    console.log('Final list of patients with details:', patientsWithDetails);
                } catch (error) {
                    console.error('Error fetching patients:', error);
                }
            };
    
            // Llamar a la función getPatients cuando la vista esté enfocada
            getPatients();
        }, [trainerID])
    );
    

    const handleCreatePatient = async () => {

        
        try {
            console.log('Creating patient with the following details:');
            console.log('Full Name:', newPatientFullName);
            console.log('Birthdate:', newPatientBirthdate);
            console.log('Height:', newPatientHeight);
            console.log('Weight:', newPatientWeight);

            await createPatient(baseUrl, trainerID, newPatientFullName, newPatientBirthdate, parseFloat(newPatientHeight), parseFloat(newPatientWeight));
            setModalVisible(false);

            console.log('Fetching patients after creating new one.');
            console.log('Segundo fetchTrainerPatients')
            const data = await fetchTrainerPatients(baseUrl, trainerID, prueba);
            console.log('Response from fetchTrainerPatients after creation:', data);

            const patientsWithDetails: Patient[] = await Promise.all(
                data.data.map(async (patient: Patient) => {
                    console.log('Fetching details for patient ID:', patient.patient_id);
                    const patientDetails = await fetchPatientDetails(baseUrl, patient.patient_id);
                    console.log('Response from fetchPatientDetails:', patientDetails);
                    return patientDetails.data[0];
                })
            );

            setPatients(patientsWithDetails);
            console.log('Updated list of patients with details:', patientsWithDetails);
        } catch (error) {
            console.error('Error creating patient:', error);
        }
    };

    const formatDate = (date: Date) => {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses en JavaScript empiezan desde 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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
                            <FontAwesomeIcon icon={faUser} size={30} color={colors.primary} />
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
                                            birthdate: patient.birthdate,
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
                                onPress={() => setShowDatePicker(true)} style={styles.input}
                                placeholder="Birthdate" 
                                value={newPatientBirthdate} 
                                onChangeText={setNewPatientBirthdate} 
                            />

                                {/* Date Picker */}
                            <DatePicker
                                modal
                                open={showDatePicker}
                                date={date} // Este es el estado local del componente
                                mode="date" // Modo selector de fecha
                                onConfirm={(selectedDate) => {
                                    setShowDatePicker(false);
                                    const formattedDate = formatDate(selectedDate);
                                    setNewPatientBirthdate(formattedDate); // Actualiza la fecha formateada
                                }}
                                onCancel={() => setShowDatePicker(false)}
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
