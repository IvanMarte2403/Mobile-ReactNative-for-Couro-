// styles.ts

import { faMediumM } from '@fortawesome/free-brands-svg-icons';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import Svg, {  Defs, LinearGradient, Stop } from 'react-native-svg';

export const colors = {
    primary: '#000',
    secondary: '#FFBE2C', //Yellow
    theriary: '#FFFF',
    textPrimary: '#D9D9D9', //Gray 
    textSecondary: '#EA635C', //Red 
    gradientPrimary: ['#FF4242', '#992727'], // Gradiente Rojo

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
    smedium: responsiveValue(20),
    medium: responsiveValue(24),
    large: responsiveValue(32),
    xl: responsiveValue(40),
  };
  
  export const fonts = {
    bold: 'Inter-Bold',
  };

  export const GradientText = ({ text }) => {
    return (
      <View style={styles.container}>
        <Svg height="60" width="300">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <Stop offset="0%" stopColor="#f12711" stopOpacity="1" />
              <Stop offset="100%" stopColor="#f5af19" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Text
            fill="url(#grad)"
            fontSize="40"
            fontWeight="bold"
            x="0"
            y="40"
          >
            {text}
          </Text>
        </Svg>
      </View>
    );
  };