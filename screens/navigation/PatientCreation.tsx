import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'

import styles from './style/PatientCreationStyle';  

const PatientCreation = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

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
                        <View style={styles.circleContainer}>
                            <FontAwesomeIcon icon={faHome} size={40} color={colors.secondary} />
                        </View>
                    </View>
                </View>

        </ScrollView>

        </View>
    );
}



export default PatientCreation;