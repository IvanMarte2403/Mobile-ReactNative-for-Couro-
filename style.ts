// styles.ts

import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


export const colors = {
    primary: '#000',
    secondary: '#FFBE2C', //Yellow
    theriary: '#FFFF',
    textPrimary: '#D9D9D9', //Gray 
    textSecondary: '#EA635C', //Red 
  };
  
 // Function to calculate responsive numbers
const responsiveValue = (value: number) => {
    const baseWidth = 375; // Ancho base (puedes ajustar esto según tus necesidades)
    return (value / baseWidth) * width;
  };
  
  export const spacing = {
    tiny: responsiveValue(5),
    small: responsiveValue(10),
    medium: responsiveValue(20),
    large: responsiveValue(50),
  };
  
  export const fontSizes = {
    xs: responsiveValue(5),
    tiny: responsiveValue(10),
    small: responsiveValue(14),
    medium: responsiveValue(24),
    large: responsiveValue(32),
    xl: responsiveValue(40),
  };
  
  export const fonts = {
    bold: 'Inter-Bold',
  };