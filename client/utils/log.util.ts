import { ToastAndroid } from "react-native";

/** Display a toast message.
 * 
 * @param text - The text to display.
 * @param duration - The duration of the toast message.
 * @warning Toast for android.
 */
export function toast(text: any, duration: number = ToastAndroid.SHORT) {
    ToastAndroid.show(text.toString(), duration);
}