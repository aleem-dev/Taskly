import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {theme} from '../../theme'
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync'
import * as Notifications from "expo-notifications"
import {useState, useEffect} from "react"
import {intervalToDuration, isBefore} from "date-fns"
import {TimeSegment} from '@/components'
import { getFromStorage, saveToStorage } from '@/utils/storage'

//10 seconds from now
const oneDay = 24 * 60 * 60 * 1000;
const oneHour = 60 * 60 * 1000;
const oneMinute = 60 * 1000;
const oneSecond = 1000;
// const timestamp = Date.now() + 20 * 1000;
const frequency = 10 * 1000; // 10 seconds in miliseconds

const countdownStorageKey = "taskly-countdown"

type PersistedCountdownState = {
    currentNotificationID: string | undefined;
    completedAtTimestamps: number[];
};

type CountdownStatus = {
    isOverdue: boolean,
    distance: ReturnType<typeof intervalToDuration>
}

// this type is defined here becouse we need  to use it in notification trigger
export enum SchedulableTriggerInputTypes {
    CALENDAR = 'calendar',
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
    DATE = 'date',
    TIME_INTERVAL = 'timeInterval',
  }

  //setting an adaptor for push notification
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, // This ensures notifications pop up as an alert
      shouldPlaySound: true, // Enables sound when the notification arrives
      shouldSetBadge: false, // Prevents setting a badge on the app icon (you can change this)
    }),
  });
  
export default function CounterScreen() {
    //Timer function
    const[countdownState, setCountdownState] = useState<PersistedCountdownState>();
    const [secondElapsed, setSecondElapsed] = useState(0);
    const [status, setStatus] = useState<CountdownStatus>({
        isOverdue:false,
        distance:{},
    })
    useEffect(()=>{
        const init = async() => {
            const value = await getFromStorage(countdownStorageKey);
            setCountdownState(value);
        };
        init();
    },[]);

    const lastComptedAt = countdownState?.completedAtTimestamps[0];

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            const timestamp = lastComptedAt
            ? lastComptedAt + frequency
            : Date.now();

            const isOverdue = isBefore(timestamp, Date.now())
    
            const distance = intervalToDuration(
                isOverdue
                ?{end: Date.now(), start:timestamp}
                :{end:timestamp, start:Date.now()}
            )
            setStatus({isOverdue, distance})
        }, 1000)
    },[lastComptedAt])

    //notification function
    const scheduleNotification = async () => {
        let pushNotificationID;
        console.log("Attempting to register for push notifications...");
        const result = await registerForPushNotificationsAsync();
        console.log("Notification permission result:", result);
        if (result === "granted") {
            console.log("Scheduling notification...");
                  pushNotificationID = await Notifications.scheduleNotificationAsync({
                    content: {
                      title: "The thing is due",
                    },
                    // content: { title: "Hi Kaleem", body: "Hi Kaleem taDaDa!!" },
                    trigger: {
                        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
                        seconds: frequency / 1000,
                      },
                  });
                  console.log("Notification scheduled successfully.");
                } else {
                    console.log("Notification permission not granted.");
                  Alert.alert(
                    "Unable to schedule notification",
                    "Enable the notifications permission for Expo Go in settings",
                  );
                }

                if(countdownState?.currentNotificationID){
                    await Notifications.cancelScheduledNotificationAsync(
                        countdownState.currentNotificationID,
                    );
                }

                const newCountdownState: PersistedCountdownState = {
                    currentNotificationID: pushNotificationID,
                    completedAtTimestamps: countdownState
                        ? [Date.now(), ...countdownState.completedAtTimestamps]
                        : [Date.now()],
                }
                setCountdownState(newCountdownState);

                await saveToStorage(countdownStorageKey, newCountdownState)
    };
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Counter Screen</Text>
            <Text>{secondElapsed}</Text>
            <View style={[
                styles.container,
                status.isOverdue? styles.containerLate : undefined,
            ]}
            >
            {
             !status.isOverdue?(
                <Text style={styles.heading}>Thing due in</Text>
             ) : (
                <Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
             )
            }
            <View style={styles.row}>
                <TimeSegment 
                    unit='Days'
                    number={status.distance?.days ?? 0}
                    textStyle={status.isOverdue? styles.whiteText: undefined}
                />
                <TimeSegment 
                    unit='Hours'
                    number={status.distance?.hours ?? 0}
                    textStyle={status.isOverdue? styles.whiteText: undefined}
                />
                <TimeSegment 
                    unit='Minutes'
                    number={status.distance?.minutes ?? 0}
                    textStyle={status.isOverdue? styles.whiteText: undefined}
                />
                <TimeSegment 
                    unit='Seconds'
                    number={status.distance?.seconds ?? 0}
                    textStyle={status.isOverdue? styles.whiteText: undefined}
                />
            </View>

            </View>
            <TouchableOpacity
                onPress={scheduleNotification}
                // onPress={testButton}
                style={styles.button}
                activeOpacity={0.8}
            >
            {/* <Text style={styles.buttonText}>Schedule notification</Text> */}
            <Text style={styles.buttonText}>I've done the thing!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.colorWhite,
    },
    text:{
        fontSize: 24,
    },
    linksStyle:{
        textAlign:'center',
        marginBottom: 18,
        fontSize: 24,
        color:theme.colorBlue,
    },
    button:{
        backgroundColor:theme.colorBlack,
        padding:12,
        borderRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontWeight:"bold",
        textTransform:"uppercase",
        letterSpacing:1,
    },
    row:{
        flexDirection:'row',
        marginBottom:24,
    },
    heading:{
        fontSize:24,
        fontWeight:"600",
        marginBottom:24,
        color:theme.colorBlack,
    },
    containerLate:{
        backgroundColor:theme.colorRed,
    },
    whiteText:{
        color:theme.colorWhite,
    }
})