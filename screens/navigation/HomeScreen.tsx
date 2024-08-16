import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import styles from './style/HomeScreenStyles';

const HomeScreen = () => {
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

                    {/* Row Patients */}
                    <View style={styles.rowPatients}>
                        {/* Patient */}
                        <TouchableOpacity 
                        style={styles.patient}
                        onPress={() => navigation.navigate('Patient')}
                        >
                            <Text style={styles.textPatient}>
                                Robert Green
                            </Text>
                            <Text style={styles.datePacient}>
                                Last Appointment: 16 Dec
                            </Text>
                        </TouchableOpacity>
                        
                        {/* Patient */}
                        <TouchableOpacity style={styles.patient}>
                            <Text style={styles.textPatient}>
                                Robert Green
                            </Text>
                            <Text style={styles.datePacient}>
                                Last Appointment: 16 Dec
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* Row Patients */}
                    <View style={styles.rowPatients}>
                        <TouchableOpacity style={styles.patient}>
                            <Text style={styles.textPatient}>
                                Robert Green
                            </Text>
                            <Text style={styles.datePacient}>
                                Last Appointment: 16 Dec
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.patient}>
                            <Text style={styles.textPatient}>
                                Robert Green
                            </Text>
                            <Text style={styles.datePacient}>
                                Last Appointment: 16 Dec
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Row Patients */}
                    <View style={styles.rowPatients}>
                        <TouchableOpacity style={styles.patient}>
                            <Text style={styles.textPatient}>
                                Robert Green
                            </Text>
                            <Text style={styles.datePacient}>
                                Last Appointment: 16 Dec
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.patient}>
                            <Text style={styles.textPatient}>
                                Robert Green
                            </Text>
                            <Text style={styles.datePacient}>
                                Last Appointment: 16 Dec
                            </Text>
                        </TouchableOpacity>
                    </View>
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
                            >
                            </TextInput>

                            <TextInput
                            placeholder='Max Heart Rate'     
                            style={styles.inputMidForms}
                            >
                            </TextInput>

                            

                        </View>

                        <View style={styles.rowForms}>
                            <TextInput
                            placeholder='Weight (lb)'
                            style={styles.inputMidForms}
                            >
                            </TextInput>

                            <TextInput
                            placeholder='Height (ft)'    
                            style={styles.inputMidForms}
                            >
                            </TextInput>
                        </View>

                        <TextInput
                            placeholder='Notes'
                            style={styles.noteForms}
                            >
                        </TextInput>
                   

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