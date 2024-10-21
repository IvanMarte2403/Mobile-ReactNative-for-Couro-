import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { supabase } from '../../lib/supabaseClient';

import styles from './style/PatientCreationStyle';  
import { TrainerContext } from '../TrainerContext';

const PatientCreation = () => {
    const [user, setUser] = useState(null)

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const {trainerEmail} = useContext(TrainerContext);

    async function signOut() {
        const {error} = await supabase.auth.signOut();
    }

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
                    <TextInput placeholder="email" style={styles.input} value={trainerEmail} editable={false} />
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
                        Billing Account
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.buttonChangeRed}
                onPress={signOut}
                >
                    <Text  style={styles.changeText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        
        </ScrollView>

        </View>
    );
}



export default PatientCreation;