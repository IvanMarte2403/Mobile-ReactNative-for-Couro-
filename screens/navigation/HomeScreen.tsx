import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import styles from './style/HomeScreenStyles';

// Api
import { fetchTrainerPatients } from '../../services/apiServicePatient';

import {fetchPatientDetails} from '../../services/apiPatient';

interface Patient {
    patient_id: string;
    fullname: string;
    birthdate: string;
    height: string;
    weight: string;
    trainer_id: string;
}

const HomeScreen = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const baseUrl = 'http://10.0.2.2:8000';
    const trainerId = 'trainerid';  

    useEffect(() => {
        const getPatients = async () => {
            try {
                const data = await fetchTrainerPatients(baseUrl, trainerId);
                console.log('Received data:', data);

                // Obtener detalles de cada paciente
                const patientsWithDetails: Patient[] = await Promise.all(
                    data.data.map(async (patient: Patient) => {
                        const patientDetails = await fetchPatientDetails(baseUrl, patient.patient_id);
                        return patientDetails.data[0]; // Suponiendo que los detalles están en la primera posición del array
                    })
                );

                setPatients(patientsWithDetails);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        getPatients();
    }, []);

    // Navigation
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // Modal
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* ===============Header================= */}
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
                            <Image
                                source={require('../../img/icons/profile.png')}
                                resizeMode='contain'
                                style={styles.imageIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ===============Search================= */}
                <View style={styles.containerSearch}>
                    <FontAwesomeIcon icon={faSearch} size={20} color={colors.primary} style={styles.searchIcon} />
                    <TextInput
                        placeholder=""
                        placeholderTextColor={colors.theriary}
                        style={styles.searchInput}
                    />
                </View>

                {/* =================Patients============= */}
                <View style={styles.containerPatients}>
                    {patients.map((patient, index) => {
                        if (index % 2 === 0) {
                            return (
                                <View style={styles.rowPatients} key={index}>
                                    {/* Primer paciente en la fila */}
                                    <TouchableOpacity 
                                        style={styles.patient}
                                        onPress={() => navigation.navigate('Patient')}
                                    >
                                        <Text style={styles.textPatient}>
                                            {patient.fullname}
                                        </Text>
                                        <Text style={styles.datePacient}>
                                            {patient.birthdate}
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Segundo paciente en la fila, si existe */}
                                    {patients[index + 1] && (
                                        <TouchableOpacity 
                                            style={styles.patient}
                                            onPress={() => navigation.navigate('Patient')}
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

            {/* ===============Floating Button================= */}
            <TouchableOpacity
                style={styles.floatingButtonContainer}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesomeIcon icon={faPlus} size={30} color={colors.primary} />
            </TouchableOpacity>

            {/* ===============Modal================= */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {/* Modal Container */}
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Titulo Modal */}
                        <Text style={styles.modalText}>New patient</Text>
                        {/* Input Photo */}
                        <TouchableOpacity style={styles.uploadCircle}>
                            <Text style={styles.uploadText}>Photo</Text>
                        </TouchableOpacity>

                        {/* Forms */}
                        <View style={styles.containerForms}>
                            <TextInput placeholder="Full Name" style={styles.input} />
                            <TextInput placeholder="Birthdate" style={styles.input} />

                            <View style={styles.rowForms}>
                                <TextInput
                                placeholder='Gender'
                                style={styles.inputMidForms}
                                />
                                <TextInput
                                placeholder='Max Heart Rate'     
                                style={styles.inputMidForms}
                                />
                            </View>

                            <View style={styles.rowForms}>
                                <TextInput
                                placeholder='Weight (lb)'
                                style={styles.inputMidForms}
                                />
                                <TextInput
                                placeholder='Height (ft)'    
                                style={styles.inputMidForms}
                                />
                            </View>

                            <TextInput
                                placeholder='Notes'
                                style={styles.noteForms}
                            />
                            
                            {/* Forms Button */}
                            <View style={styles.containerButton}>
                                <TouchableOpacity 
                                style={styles.ButtonLogin} 
                                onPress={() => setModalVisible(false)}
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
