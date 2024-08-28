import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../../style';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Svg, { Circle, G } from 'react-native-svg';
import Video from 'react-native-video';  // Importa el componente de video
import styles from './style/TrainingSessionStyle';

const { width } = Dimensions.get('window'); // Obtén el ancho de la pantalla

type TrainingSessionParams = {
    couro_score: string;
    shoulder_score: string;
    elbow_score: string;
    hip_score: string;
    knee_score: string;
    pose_video_url: string;
    stride_video_url: string;
    completion: string;
};

type CircularProgressBarProps = {
    value: number;
    maxValue: number;
    color: string;
    size?: number;
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ value, maxValue, color, size = width * 0.35 }) => {
    const strokeWidth = size * 0.07; // 7% del tamaño del círculo
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / maxValue) * circumference;

    // Formatear el valor: mostrar decimales solo si no son cero
    const displayValue = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* Circulo */}
            <Svg width={size} height={size}>
                {/* Agrupar y rotar el círculo para comenzar desde la parte superior */}
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    <Circle
                        stroke="#e0e0e0"
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <Circle
                        stroke={color} // Color personalizado para cada círculo
                        fill="none"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
            <Text style={{ position: 'absolute', fontSize: size * 0.3, fontWeight: 'bold', color: color, fontStyle: 'italic', fontFamily: 'Inter' }}>
                {displayValue}
            </Text>
        </View>
    );
};

const TrainingSession = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<{ params: TrainingSessionParams }, 'params'>>(); // Usar useRoute con tipos definidos

    const { couro_score, elbow_score, knee_score, shoulder_score, hip_score, stride_video_url } = route.params; // Desestructurar valores
    const maxValue = 100;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerHeader}>
                    <View style={styles.containerText}>
                        {/* Fecha */}
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

                {/* Contenedor del círculo principal */}
                <View style={styles.containerScore}>
                    <View style={styles.containerCouroRun}>
                        <View style={styles.containerCouroScore}>
                            <CircularProgressBar value={parseFloat(couro_score)} maxValue={maxValue} color="#E10000" />
                            <Text style={{ fontFamily: 'Inter', color: '#E10000', fontSize: 16, textAlign: 'center', marginTop: 10 }}>
                                Couro Run Score
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Contenedor de los cuatro círculos adicionales */}
                <View style={styles.containerScoreAll}>
                    <View style={styles.smallCircle}>
                        <CircularProgressBar value={parseFloat(elbow_score)} maxValue={maxValue} color="#E10000" size={width * 0.20} />
                        <Text style={{ fontFamily: 'Inter', color: '#E10000', fontSize: 14, textAlign: 'center', marginTop: 10 }}>Elbow</Text>
                    </View>
                    <View style={styles.smallCircle}>
                        <CircularProgressBar value={parseFloat(knee_score)} maxValue={maxValue} color="#A72A2A" size={width * 0.20} />
                        <Text style={{ fontFamily: 'Inter', color: '#A72A2A', fontSize: 14, textAlign: 'center', marginTop: 10 }}>Knee</Text>
                    </View>
                    <View style={styles.smallCircle}>
                        <CircularProgressBar value={parseFloat(shoulder_score)} maxValue={maxValue} color="#E1B000" size={width * 0.20} />
                        <Text style={{ fontFamily: 'Inter', color: '#E1B000', fontSize: 14, textAlign: 'center', marginTop: 10 }}>Shoulder</Text>
                    </View>
                    <View style={styles.smallCircle}>
                        <CircularProgressBar value={parseFloat(hip_score)} maxValue={maxValue} color="#00CEE1" size={width * 0.20} />
                        <Text style={{ fontFamily: 'Inter', color: '#00CEE1', fontSize: 14, textAlign: 'center', marginTop: 10 }}>Hip</Text>
                    </View>
                </View>
                
                {/* Title Couro Analysis */}
                <View style={styles.containerCouroAnalysis}>
                    <Text style={styles.titleAnalysis}>
                        Couro Analysis
                    </Text>

                    <View>
                        <Text style={styles.textAnalysis}>
                            Stride Video
                        </Text>
                    </View>
                </View>

                {/* Contenedor de Video */}
                <View style={styles.containerVideo}>
                    <Video
                        source={{ uri: stride_video_url }}  // El enlace del video
                        style={{ width: '100%', height: 200 }}
                        controls={true}  // Mostrar controles de reproducción
                        resizeMode="contain"  // Ajustar el video dentro del contenedor
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default TrainingSession;
