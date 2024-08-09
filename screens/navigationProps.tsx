// navigationProps.ts
export interface Props {
    navigate: (screen: 'Login' | 'CreateAccount' | 'ForgotPassword' | 'TapYourNewPassword' | 'ConfirmPassword' | 'homeScreen') => void;
}