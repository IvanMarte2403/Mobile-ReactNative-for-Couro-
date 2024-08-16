import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'

import { ScrollView } from 'react-native-gesture-handler';
import styles from './style/PatientCreationStyle';  

const PatientCreation = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    return (
        <ScrollView>
             {/* ===============Header================= */}
             <View style={styles.containerHeader}>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>
                            Your {"\n"}<Text style={styles.highlight}>patients</Text>
                        </Text>
                    </View>
                    <View style={styles.containerImage}>
                        <View style={styles.circleContainer}>
                            <FontAwesomeIcon icon={faHome} size={20} color={colors.primary} style={styles.icon} />
                      
                        </View>
                    </View>
                </View>

        </ScrollView>
    );
}



export default PatientCreation;