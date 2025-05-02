import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {theme} from '../../theme'
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync'
import * as Notifications from "expo-notifications"
// import { SchedulableTriggerInputTypes } from 'expo-notifications';
export enum SchedulableTriggerInputTypes {
    CALENDAR = 'calendar',
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
    DATE = 'date',
    TIME_INTERVAL = 'timeInterval',
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, // This ensures notifications pop up as an alert
      shouldPlaySound: true, // Enables sound when the notification arrives
      shouldSetBadge: false, // Prevents setting a badge on the app icon (you can change this)
    }),
  });
  
export default function CounterScreen() {
    const testButton = () => {
        console.log("checking if the button and events are working?")
        Alert.alert("checking if the button and events are working?")
    }
    const scheduleNotification = async () => {
        console.log("Attempting to register for push notifications...");
        const result = await registerForPushNotificationsAsync();
        console.log("Notification permission result:", result);
        if (result === "granted") {
            console.log("Scheduling notification...");
                  await Notifications.scheduleNotificationAsync({
                    content: {
                      title: "I'm a notification from your app! 📨",
                    },
                    // content: { title: "Hi Kaleem", body: "Hi Kaleem taDaDa!!" },
                    trigger: {
                        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
                        seconds: 5,
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
    };
    return(
        <View style={Styles.container}>
            <Text style={Styles.text}>Counter Screen</Text>
            <TouchableOpacity
                onPress={scheduleNotification}
                // onPress={testButton}
                style={Styles.button}
                activeOpacity={0.8}
            >
                <Text style={Styles.buttonText}>Schedule notification</Text>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
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
    }
})