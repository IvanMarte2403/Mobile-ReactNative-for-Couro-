
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../../style'; 


export const styles = StyleSheet.create({
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
    containerButton: {
        width: '80%',
        marginTop: spacing.large,
    },
    highlight: {
        color: colors.secondary,
        fontWeight: '700',
    },
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

    // Icons

    icon:{
        marginRight: spacing.small,
    }
});

export default styles;
