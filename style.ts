// styles.ts

import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


export const colors = {
    primary: '#000',
    secondary: '#FFBE2C',
    textPrimary: '#D9D9D9',
    textSecondary: 'blue',
  };
  
 // Función para calcular valores responsivos
const responsiveValue = (value: number) => {
    const baseWidth = 375; // Ancho base (puedes ajustar esto según tus necesidades)
    return (value / baseWidth) * width;
  };
  
  export const spacing = {
    small: responsiveValue(10),
    medium: responsiveValue(20),
    large: responsiveValue(50),
  };
  
  export const fontSizes = {
    small: responsiveValue(14),
    medium: responsiveValue(24),
    large: responsiveValue(32),
  };
  
  export const fonts = {
    bold: 'Inter-Bold',
  };