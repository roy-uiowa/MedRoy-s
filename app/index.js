//meditation bowl: https://www.youtube.com/watch?v=eNmjWjpxUOM
import React, { useState, useRef, useEffect } from 'react';
import {Audio} from 'expo-av'
import SwitchSelector from "react-native-switch-selector";
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import { 
    View, 
    Text, 
    StyleSheet, 
    StatusBar, 
    TouchableOpacity,
    Image, 
    ActivityIndicator,
    Button} from 'react-native';
import icons from '../constants/icons';
import { meditationTracks } from '../constants/tracks';


const options = [
  { label: "03:00", value: 3, imageIcon:icons.stopWatch},
  { label: "05:00", value: 5, imageIcon:icons.stopWatch},
  { label: "10:00", value: 10, imageIcon:icons.stopWatch}
];
const App = () => {
    const [meditationTime, setMeditationTime] = useState(3)
    const [meditationEnv, setMeditationEnv] = useState('rain')
    const [sound, setSound] = useState()
    const progressRef = useRef();

    async function playTrack(){
        console.log('Loading sound');
        const {sound} = await Audio.Sound.createAsync(meditationTracks[meditationEnv])
        setSound(sound)
        console.log('playing sound');
        await sound.playAsync();
    }
    useEffect(() => {
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
        });
        return sound
            ? () => {
                console.log('unloading sound');
                sound.unloadAsync();
            }
            : undefined;
        }, [sound]);
    return(
        <View>
            <View>
                
                {/* progressRef.current.play();
                progressRef.current.reAnimate(); */}
                <CircularProgress
                    ref={progressRef}
                    value={0}
                    radius={120}
                    maxValue={10}
                    initialValue={10}
                    progressValueColor={'#cdc'}
                    activeStrokeWidth={15}
                    inActiveStrokeWidth={15}
                    duration={1000*meditationTime*60}
                    onAnimationComplete={() => alert('time out')}
                    />
                    <Button onPress={()=>progressRef.current.play()} title="Play" />
                    <Button onPress={()=>progressRef.current.pause()} title="Pause" color="#C2B280" />
                    <Button onPress={()=>progressRef.current.reAnimate()} title="Replay" color="#CD7F32" />
            </View>
            <View >
                <Text>
                    Select Meditaiton Abmient: {meditationEnv}
                </Text>
                <View style={styles.btnContainer}>
                <Button onPress={()=>setMeditationEnv('rain')} title="Rain" />
                <Button onPress={()=>setMeditationEnv('beach')} title="Beach" color="#C2B280" />
                <Button onPress={()=>setMeditationEnv('bowl')} title="Bowl" color="#CD7F32" />
                </View>
                {/* <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={()=>setMeditationEnv('rain')}>
                        <Image 
                            source={icons.rain} 
                            resizeMode='cover' 
                            // style={styles.btnImg(dimension)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setMeditationEnv('beach')}>
                        <Image 
                            source={icons.beach} 
                            resizeMode='cover' 
                            // style={styles.btnImg(dimension)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setMeditationEnv('bowl')}>
                        <Image 
                            source={icons.bowl} 
                            resizeMode='cover' 
                            // style={styles.btnImg(dimension)}
                        />
                    </TouchableOpacity>
                </View> */}
            <View>
                <Text>
                    Select Meditation Time:
                </Text>
                <SwitchSelector style={styles.switchContainer}
                    options={options}
                    initial={0}
                    hasPadding
                    // buttonMargin={5}
                    onPress={value => setMeditationTime(value)}
                />
            </View>
            </View>
        </View>

        
    )
}

export default App;

const styles = StyleSheet.create({
    switchContainer:{
        margin: 10,
    },
    btnContainer: {
        margin: 10,
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    btnImg: (dimension) => ({
      width: dimension,
      height: dimension,
    //   borderRadius: SIZES.small / 1.25,
    }),
  });