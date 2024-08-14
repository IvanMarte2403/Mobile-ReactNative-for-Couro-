import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons/faSearch'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { ScrollView } from 'react-native-gesture-handler';


const PatientCreation = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    return (
        <View></View>
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

});

export default PatientCreation;