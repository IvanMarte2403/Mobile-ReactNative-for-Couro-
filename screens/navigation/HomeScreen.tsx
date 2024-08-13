import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons/faSearch'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { ScrollView } from 'react-native-gesture-handler';



const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

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
                    <View style={styles.circleContainer}>
                        <Image
                            source={require('../../img/icons/profile.png')}
                            resizeMode='contain'
                            style={styles.imageIcon}
                        />
                    </View>
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
                <View style={styles.rowPatients}>
                    <View style={styles.patient}>
                        <Text style={styles.textPatient}>
                            Robert Green
                        </Text>
                        <Text style={styles.datePacient}>
                            Last Appointment: 16 Dec
                        </Text>
                    </View>
                    <View style={styles.patient}>
                        <Text style={styles.textPatient}>
                            Robert Green
                        </Text>
                        <Text style={styles.datePacient}>
                            Last Appointment: 16 Dec
                        </Text>
                    </View>
                </View>
                <View style={styles.rowPatients}>
                    <View style={styles.patient}>
                        <Text style={styles.textPatient}>
                            Robert Green
                        </Text>
                        <Text style={styles.datePacient}>
                            Last Appointment: 16 Dec
                        </Text>
                    </View>
                    <View style={styles.patient}>
                        <Text style={styles.textPatient}>
                            Robert Green
                        </Text>
                        <Text style={styles.datePacient}>
                            Last Appointment: 16 Dec
                        </Text>
                    </View>
                </View>
                <View style={styles.rowPatients}>
                    <View style={styles.patient}>
                        <Text style={styles.textPatient}>
                            Robert Green
                        </Text>
                        <Text style={styles.datePacient}>
                            Last Appointment: 16 Dec
                        </Text>
                    </View>
                    <View style={styles.patient}>
                        <Text style={styles.textPatient}>
                            Robert Green
                        </Text>
                        <Text style={styles.datePacient}>
                            Last Appointment: 16 Dec
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>

        {/* ===============Floating Button================= */}
        <View style={styles.floatingButtonContainer}>
            <FontAwesomeIcon icon={faPlus} size={30} color={colors.primary} />
        </View>
    </View>
    
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    containerShadow: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: spacing.medium,
    },
    title: {
        fontSize: fontSizes.xl,
        fontWeight: '400',
        fontFamily: fonts.bold,
        color: colors.primary,
        marginTop: spacing.medium,
        textAlign: 'left',
    },
    containerForms: {
        marginTop: spacing.large,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlight: {
        color: colors.secondary,
        fontWeight: '700',
    },
    input: {
        marginTop: spacing.small,
        height: 40,
        borderWidth: 1,
        borderColor: colors.textPrimary,
        marginBottom: spacing.small,
        paddingHorizontal: spacing.small,
        color: colors.primary,
        backgroundColor: colors.textPrimary,
        borderRadius: 10,
        width: '80%',
    },
    containerButton: {
        width: '80%',
        marginTop: spacing.large,
    },
    // Botones
    ButtonLogin: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '100%',
    },
    ButtonLoginText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerContainer: {
        alignItems: 'center',
        marginVertical: spacing.medium,
    },
    login: {
        fontWeight: 'bold',
        color: colors.primary,
    },
    logoImagen: {
        alignItems: 'center',
        marginVertical: spacing.medium,
        height: '10%',
        marginTop: spacing.small,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    //Header 
    containerHeader:{
        width: '100%',
        flexDirection: 'row',
    },
    containerText:{
        width: '75%',
        flexDirection: 'column',
    },
    containerImage:{
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    circleContainer: {
        width: 70, 
        height: 70,
        borderRadius: 50, 
        backgroundColor: '#fff',
    
        // iOS Shadows
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        // Android Shadows
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      imageIcon: {
        width: '50%',

      },

    //   Seach
      containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: spacing.small,
        paddingVertical: spacing.tiny,
        backgroundColor: colors.textPrimary,
        marginTop: spacing.large,
      },
      searchIcon: {
        marginRight: spacing.small,
    },
      searchInput: {
        flex: 1,
        fontSize: fontSizes.medium,
        color: colors.primary,
        paddingVertical: 0, // Para alinear el texto verticalmente con el ícono
      },

    // ============Patients==============

    containerPatients: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.theriary,
        flexDirection: 'column',
    },

    rowPatients: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.medium,
    },

    patient: {
        width: '48%',
        height: 150,
        backgroundColor: colors.textPrimary,
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
    },
    textPatient:{
        color: colors.primary,
        fontSize: fontSizes.small,
        fontWeight: '500',
        padding: spacing.small,
        paddingBottom: 0,
    },
    datePacient:{
        color: colors.primary,
        fontSize: fontSizes.tiny,
        fontWeight: '400',
        padding: spacing.small,
        paddingTop: 0,
    },
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colors.secondary,
        borderRadius: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },


});

export default HomeScreen;
