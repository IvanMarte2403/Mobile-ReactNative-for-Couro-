    import React, { useState } from 'react';
    import { View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
    import { colors, spacing, fontSizes, fonts } from '../../style';
    import { NavigationProp, useNavigation } from '@react-navigation/native';
    import { RootStackParamList } from '../../App'; 
    import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
    import { faSortDown, faSort, faPlus, faHome } from '@fortawesome/free-solid-svg-icons';


    import styles from './style/newTrainingStyles';


    const NewTraining = () => {
        const navigation = useNavigation<NavigationProp<RootStackParamList>>();

        return(
            <View style={styles.container}>
        
                <View style={styles.containerHeader}>

                        <View style={styles.containerText}>
                            <Text style={styles.subtitle}>
                            December 20 2023
                            </Text>

                            {/* Title */}
                            <Text style={styles.title}>
                                Training Session
                            </Text>
                        </View>

                        <View style={styles.containerImage}>
                            {/* Circle Home */}
                            <TouchableOpacity 
                            style={styles.circleContainer}
                            onPress={() => navigation.navigate('Home')}
                            >
                                <FontAwesomeIcon icon={faHome} size={30} color={colors.secondary} />
                            </TouchableOpacity>
                        </View>
                </View>

                <View style={styles.containerScore}>
                    
                    <View  style={styles.containerCouroRun}>
                        <Text style={styles.gradientStyle}>
                            38.1 
                        </Text>
                    </View>

                </View>
            </View>
        );

    };

    export default NewTraining;