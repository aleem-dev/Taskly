// import {View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions} from 'react-native'
// import {theme} from '../../theme'
// import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync'
// import * as Notifications from "expo-notifications"
// import {useState, useEffect, useRef} from "react"
// import {intervalToDuration, isBefore} from "date-fns"
// import {TimeSegment} from '@/components'
// import { getFromStorage, saveToStorage } from '@/utils/storage'
// import * as Haptics from "expo-haptics"
// import ConfettiCannon from "react-native-confetti-cannon"
// import { differenceInSeconds } from 'date-fns'

// //10 seconds from now
// const oneDay = 24 * 60 * 60 * 1000;
// const oneHour = 60 * 60 * 1000;
// const oneMinute = 60 * 1000;
// const oneSecond = 1000;
// // const timestamp = Date.now() + 20 * 1000;
// // 2 weeks in
// // const frequency = 10 * 1000; // 10 seconds in miliseconds
// const frequency = 14 * 24 * 60 * 60 * 1000; // 2 weeks in miliseconds

// export const countdownStorageKey = "taskly-countdown"

// export type PersistedCountdownState = {
//     currentNotificationId: string | undefined;
//     completedAtTimestamps: number[];
// };

// type CountdownStatus = {
//     isOverdue: boolean,
//     distance: ReturnType<typeof intervalToDuration>
// }

// // this type is defined here becouse we need  to use it in notification trigger
// export enum SchedulableTriggerInputTypes {
//     CALENDAR = 'calendar',
//     DAILY = 'daily',
//     WEEKLY = 'weekly',
//     MONTHLY = 'monthly',
//     YEARLY = 'yearly',
//     DATE = 'date',
//     TIME_INTERVAL = 'timeInterval',
//   }

//   //setting an adaptor for push notification
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true, // This ensures notifications pop up as an alert
//       shouldPlaySound: true, // Enables sound when the notification arrives
//       shouldSetBadge: false, // Prevents setting a badge on the app icon (you can change this)
//     }),
//   });
  
// export default function CounterScreen() {
//     const confettiRef = useRef<any>();
//     //Timer function
//     const[countdownState, setCountdownState] = useState<PersistedCountdownState>();
//     const [status, setStatus] = useState<CountdownStatus>({
//         isOverdue:false,
//         distance:{},
//     })
//     useEffect(()=>{
//         const init = async() => {
//             const value = await getFromStorage(countdownStorageKey);
//             setCountdownState(value);
//         };
//         init();
//     },[]);

//     const lastCompletedAt = countdownState?.completedAtTimestamps[0];

//     useEffect(()=>{
//         //     if(lastCompletedAt === undefined) return;
//         //     const intervalId = setInterval(()=>{
//         //         const timestamp = lastCompletedAt
//         //         ? lastCompletedAt + frequency
//         //         : Date.now();

//         //         const isOverdue = isBefore(timestamp, Date.now());

//         //     const distance = intervalToDuration(
//         //         isOverdue
//         //             ? { start: timestamp, end: Date.now() }
//         //             : { start: Date.now(), end: timestamp },
//         //     );
//         //     const safeDistance = {
//         //         days: distance.days ?? 0,
//         //         hours: distance.hours ?? 0,
//         //         minutes: distance.minutes ?? 0,
//         //         seconds: distance.seconds ?? 0,
//         //     };
//         //     setStatus({ isOverdue, distance: safeDistance });
//         // }, 1000)
//         // return () => clearInterval(intervalId)
//         if (lastCompletedAt === undefined) return;

//     const intervalId = setInterval(() => {
//         const timestamp = lastCompletedAt + frequency;
//         const isOverdue = isBefore(timestamp, Date.now());

//         const totalSecondsRemaining = isOverdue
//             ? differenceInSeconds(Date.now(), timestamp)
//             : differenceInSeconds(timestamp, Date.now());

//         const safeDistance = {
//             days: Math.floor(totalSecondsRemaining / (24 * 60 * 60)),
//             hours: Math.floor((totalSecondsRemaining % (24 * 60 * 60)) / (60 * 60)),
//             minutes: Math.floor((totalSecondsRemaining % (60 * 60)) / 60),
//             seconds: totalSecondsRemaining % 60,
//         };

//         setStatus({ isOverdue, distance: safeDistance });
//     }, 1000);

//     return () => clearInterval(intervalId);
//     },[])

//     //notification function
//     const scheduleNotification = async () => {
//         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
//         let pushNotificationId;
//         console.log("Attempting to register for push notifications...");
//         const result = await registerForPushNotificationsAsync();
//         console.log("Notification permission result:", result);
//         if (result === "granted") {
//             console.log("Scheduling notification...");
//             pushNotificationId = await Notifications.scheduleNotificationAsync({
//                 content: {
//                     title: "Car wash is overdue!",
//                 },
//                 // content: { title: "Hi Kaleem", body: "Hi Kaleem taDaDa!!" },
//                 trigger: {
//                     type: SchedulableTriggerInputTypes.TIME_INTERVAL,
//                     seconds: frequency / 1000,
//                     },
//                 });
//             console.log("Notification scheduled successfully.");
//             } else {
//                 console.log("Notification permission not granted.");
//                 Alert.alert(
//                 "Unable to schedule notification",
//                 "Enable the notifications permission for Expo Go in settings",
//                 );
//         }

//         if (countdownState?.currentNotificationId) {
//                     await Notifications.cancelScheduledNotificationAsync(
//                     countdownState.currentNotificationId,
//                     );
//                 }
            
//         // const newCountdownState: PersistedCountdownState = {
//         //     currentNotificationId: pushNotificationId,
//         //     completedAtTimestamps: countdownState
//         //     ? [Date.now(), ...countdownState.completedAtTimestamps]
//         //     : [Date.now()],
//         // };
                    
//         // setCountdownState(newCountdownState);
//         //suspecting issue here
//         const newTimestamps = countdownState
//         ? [Date.now(), ...countdownState.completedAtTimestamps]
//         : [Date.now()];

//         // Only update state if timestamps have changed
//         if (JSON.stringify(newTimestamps) !== JSON.stringify(countdownState?.completedAtTimestamps)) {
//         setCountdownState({
//             currentNotificationId: pushNotificationId,
//             completedAtTimestamps: newTimestamps,
//         });
//         }
//         await saveToStorage(countdownStorageKey, newCountdownState);
//     };
//     const handleWashCar = () => {
//         console.log("inside handle car wash function")
//         scheduleNotification(); // Schedule the notification as usual
        
//         // Fire confetti effect after pressing the button
//         if (confettiRef.current) {
//             console.log("confetti fired")
//             confettiRef.current.start();
//         }
//     };
    
//     return(
//         <View style={styles.container}>
//             <View
//                 style={[
//                     styles.container,
//                     status.isOverdue ? styles.containerLate : undefined,
//                 ]}
//                 >
//                 {!status.isOverdue ? (
//                     <Text style={[styles.heading]}>Next car wash due in</Text>
//                 ) : (
//                     <Text style={[styles.heading, styles.whiteText]}>Car wash overdue by</Text>
//                 )}
//                 <View style={styles.row}>
//                     <TimeSegment
//                     unit="Days"
//                     number={status.distance?.days ?? 0}
//                     textStyle={status.isOverdue ? styles.whiteText : undefined}
//                     />
//                     <TimeSegment
//                     unit="Hours"
//                     number={status.distance?.hours ?? 0}
//                     textStyle={status.isOverdue ? styles.whiteText : undefined}
//                     />
//                     <TimeSegment
//                     unit="Minutes"
//                     number={status.distance?.minutes ?? 0}
//                     textStyle={status.isOverdue ? styles.whiteText : undefined}
//                     />
//                     <TimeSegment
//                     unit="Seconds"
//                     number={status.distance?.seconds ?? 0}
//                     textStyle={status.isOverdue ? styles.whiteText : undefined}
//                     />
//                 </View>
//             </View>    
//             {/* <TouchableOpacity
//                 onPress={scheduleNotification}
//                 // onPress={testButton}
//                 style={styles.button}
//                 activeOpacity={0.8}
//             >
//                 <Text style={styles.buttonText}>I've washed the car!</Text> 
//            </TouchableOpacity>  */}
//             {/* <ConfettiCannon
//                 ref={confettiRef}
//                 count={50}
//                 origin={{x:Dimensions.get("window").width /2, y: -30}}
//                 autoStart={false}
//                 fadeOut={true}
//             /> */}
//             <TouchableOpacity
//                 onPress={handleWashCar}
//                 style={styles.button}
//                 activeOpacity={0.8}
//             >
//                 <Text style={styles.buttonText}>I've washed the car again!</Text>
//             </TouchableOpacity>

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor:theme.colorWhite,
//     },
//     text:{
//         fontSize: 24,
//     },
//     linksStyle:{
//         textAlign:'center',
//         marginBottom: 18,
//         fontSize: 24,
//         color:theme.colorBlue,
//     },
//     button:{
//         backgroundColor:theme.colorBlack,
//         padding:12,
//         borderRadius: 6,
//     },
//     buttonText: {
//         color: "#fff",
//         fontWeight:"bold",
//         textTransform:"uppercase",
//         letterSpacing:1,
//     },
//     row:{
//         flexDirection:'row',
//         marginBottom:24,
//     },
//     heading:{
//         fontSize:24,
//         fontWeight:"600",
//         marginBottom:24,
//         color:theme.colorBlack,
//     },
//     containerLate:{
//         backgroundColor:theme.colorRed,
//     },
//     whiteText:{
//         color:theme.colorWhite,
//     }
// })


// refectored the whole code


import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { theme } from '../../theme';
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from 'react';
import { differenceInSeconds, isBefore } from 'date-fns';
import { TimeSegment } from '@/components';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import * as Haptics from 'expo-haptics';
import ConfettiCannon from 'react-native-confetti-cannon';

// Constants for countdown duration
// const frequency = 14 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
const frequency = 1 * 1 * 1 * 60 * 1000; // 1 minute in milliseconds
export const countdownStorageKey = "taskly-countdown";

// Countdown state type
export type PersistedCountdownState = {
    currentNotificationId: string | undefined;
    completedAtTimestamps: number[];
};

// Countdown status type
type CountdownStatus = {
    isOverdue: boolean;
    distance: { days: number, hours: number, minutes: number, seconds: number };
};

// Push notification settings
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function CounterScreen() {
    const confettiRef = useRef<any>();

    // State for countdown and display status
    const [countdownState, setCountdownState] = useState<PersistedCountdownState | null>(null);
    const [status, setStatus] = useState<CountdownStatus>({
        isOverdue: false,
        distance: { days: 0, hours: 0, minutes: 0, seconds: 0 }
    });

    // Load stored countdown data
    useEffect(() => {
        const init = async () => {
            const value = await getFromStorage(countdownStorageKey);
            if (value) setCountdownState(value);
        };
        init();
    }, []);

    const lastCompletedAt = countdownState?.completedAtTimestamps[0];

    // Countdown timer logic
    useEffect(() => {
        if (!lastCompletedAt) return;

        const intervalId = setInterval(() => {
            const timestamp = lastCompletedAt + frequency;
            const isOverdue = isBefore(timestamp, Date.now());

            // Calculate remaining time in seconds
            const totalSecondsRemaining = isOverdue
                ? Math.max(0, (Date.now() - timestamp) / 1000)
                : Math.max(0, (timestamp - Date.now()) / 1000);

            // Convert total seconds into days, hours, minutes, seconds
            const safeDistance = {
                days: Math.floor(totalSecondsRemaining / (24 * 60 * 60)),
                hours: Math.floor((totalSecondsRemaining % (24 * 60 * 60)) / (60 * 60)),
                minutes: Math.floor((totalSecondsRemaining % (60 * 60)) / 60),
                seconds: Math.floor(totalSecondsRemaining % 60),
            };

            // Update state only when values actually change
            setStatus(prev => (
                JSON.stringify(prev.distance) !== JSON.stringify(safeDistance)
                    ? { isOverdue, distance: safeDistance }
                    : prev
            ));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [lastCompletedAt]);

    // Schedule push notification
    const scheduleNotification = async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        let pushNotificationId;

        const result = await registerForPushNotificationsAsync();
        if (result === "granted") {
            pushNotificationId = await Notifications.scheduleNotificationAsync({
                content: { title: "Reminder: Your car wash is due soon!" },
                trigger: { seconds: frequency / 1000 },
            });

            // Cancel previous notification if one exists
            if (countdownState?.currentNotificationId) {
                await Notifications.cancelScheduledNotificationAsync(countdownState.currentNotificationId);
            }

            // Store updated countdown state only if timestamps changed
            const newTimestamps = [Date.now(), ...(countdownState?.completedAtTimestamps || [])];
            if (JSON.stringify(newTimestamps) !== JSON.stringify(countdownState?.completedAtTimestamps)) {
                const newState = {
                    currentNotificationId: pushNotificationId,
                    completedAtTimestamps: newTimestamps,
                };
                setCountdownState(newState);
                await saveToStorage(countdownStorageKey, newState);
            }
        } else {
            Alert.alert("Enable notifications permission for Expo Go in settings.");
        }
    };

    // Handle car wash button press (fires confetti)
    const [showConfetti, setShowConfetti] = useState(false);

    const handleWashCar = () => {
        scheduleNotification();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000); // Auto-hide confetti after 2 seconds
    };

    // UI rendering
    return (
        <View style={styles.container}>
            <View style={[styles.container, status.isOverdue ? styles.containerLate : undefined]}>
                <Text style={[styles.heading, status.isOverdue ? styles.whiteText : undefined]}>
                    {status.isOverdue ? "Your car wash is overdue!" : "Next car wash due in"}
                </Text>

                <View style={styles.row}>
                    <TimeSegment unit="Days" number={status.distance.days} textStyle={status.isOverdue ? styles.whiteText : undefined} />
                    <TimeSegment unit="Hours" number={status.distance.hours} textStyle={status.isOverdue ? styles.whiteText : undefined} />
                    <TimeSegment unit="Minutes" number={status.distance.minutes} textStyle={status.isOverdue ? styles.whiteText : undefined} />
                    <TimeSegment unit="Seconds" number={status.distance.seconds} textStyle={status.isOverdue ? styles.whiteText : undefined} />
                </View>
            </View>

            {/* Button to schedule a push notification */}
            <TouchableOpacity onPress={scheduleNotification} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Remind Me Later</Text>
            </TouchableOpacity>

            {/* Button to confirm task completion */}
            <TouchableOpacity onPress={handleWashCar} style={styles.buttonComplete} activeOpacity={0.8}>
                <Text style={styles.buttonText}>I've Just Washed My Car!</Text>
            </TouchableOpacity>

            {showConfetti && (
                <ConfettiCannon count={50} origin={{ x: Dimensions.get("window").width / 2, y: -30 }} fadeOut={true} />
            )}
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colorWhite, gap:10 },
    text: { fontSize: 24 },
    button: { backgroundColor: theme.colorBlack, padding: 12, borderRadius: 6 },
    buttonComplete: { backgroundColor: theme.colorGreen, padding: 12, borderRadius: 6 },
    buttonText: { color: "#fff", fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 },
    row: { flexDirection: 'row', marginBottom: 24 },
    heading: { fontSize: 24, fontWeight: "600", marginBottom: 24, color: theme.colorBlack },
    containerLate: { backgroundColor: theme.colorRed },
    whiteText: { color: theme.colorWhite },
});
