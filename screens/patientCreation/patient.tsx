import React, { useState } from 'react';
import { View, Text, TextInput, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSortDown, faSort, faPlus, faHome } from '@fortawesome/free-solid-svg-icons';

import  styles from './style/patientScreenStyles';


const PatientScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return(
        <View style={styles.container}>
            <ScrollView>
            {/* Header */}
            <View style={styles.containerHeader}>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>
                            Robert {"\n"}Green
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

            {/* Personal Information */}    

            <View style={styles.personalInformation}>
                {/* Text Information */}
                <Text style={styles.textInformation}>
                Male <Text style={styles.highlight}> ● </Text> 6’2’’ <Text style={styles.highlight}> ● </Text>176.9 lbs
                </Text>

                {/* Años */}
                <Text style={styles.textInformationSmall}>
                27 Years old  <Text style={styles.highlight}> ● </Text> 21/09/1987</Text>
            </View>

            {/* Score */}

            <View style={styles.scoreContainer}>
                <Image
                source={require('../../img/recursos/YourScoreImage.png')}
                resizeMode='contain'
                style={styles.scoreImage}
                >

                </Image>
            </View>

            {/* Training Entries */}
            <View style={styles.trainingEntries}>
                <Text style={styles.titleTries}>Training Tries</Text>
                {/* Filters */}
                <View style={styles.containerFilter}>
                    <View style={styles.filterItem}>
                        <Text style={styles.textFilter}>Mounth</Text>
                        <FontAwesomeIcon icon={faSortDown} size={15} color={colors.primary} />
                    </View>
                    <View style={styles.filterItem}>
                        <Text style={styles.textFilter}>Year</Text>
                        <FontAwesomeIcon icon={faSortDown} size={15} color={colors.primary} />
                    </View>
                    <View style={styles.filterItem}>
                        <Text style={styles.textFilter}>Sort By Date</Text>
                        <FontAwesomeIcon icon={faSort} size={15} color={colors.primary} />
                    </View>
                </View>

                {/* Entries */}

                <View style={styles.containerEntries}>
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
