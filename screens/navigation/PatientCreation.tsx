import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'

import styles from './style/PatientCreationStyle';  

const PatientCreation = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
        <ScrollView style={styles.scrollViewContainer}>
             {/* ===============Header================= */}
             <View style={styles.containerHeader}>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>
                            Your {"\n"}<Text style={styles.highlight}>settings</Text>
                        </Text>
                    </View>

                    <View style={styles.containerImage}>
                        {/* Circle Home */}
                        <TouchableOpacity 
                        style={styles.circleContainer}
                        onPress={() => navigation.navigate('Home')}
                        >
                            <FontAwesomeIcon icon={faHome} size={40} color={colors.secondary} />
                        </TouchableOpacity>
                    </View>
            </View>

            {/* Personal Information */}

            <View style={styles.personalInformation}>
                <View style={styles.containerInformation}>
                    <Text style={styles.titlePersonalInformation}>Personal Information</Text>
                </View>

                <View style={styles.containerForms}>
                    <TextInput placeholder="Name" style={styles.input} />
                    <TextInput placeholder="Password" style={styles.input} />
                </View>
            </View>

            {/* Account Actions */}

            <View style={styles.containerInformation}>
                    <Text style={styles.titlePersonalInformation}>Account Actions</Text>
            </View>

            <View
                style={styles.bottonsContainer}
            >
                <TouchableOpacity
                style={styles.buttonChange}
                >
                    <Text  style={styles.changeText}>
                        Change PassWord
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonChangeRed}
                >
                    <Text  style={styles.changeText}>
                        Delete Account
                    </Text>
                </TouchableOpacity>
            </View>
        
        </ScrollView>

        </View>
    );
}



export default PatientCreation;