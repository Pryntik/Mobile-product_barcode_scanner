import { ToastAndroid } from "react-native";
import { MaybeType, NullableType } from "../types/TItem";

type ToastOptionType = {
    duration?: number;
    stringify?: boolean;
}
const DefaultToastOption: ToastOptionType = {
    duration: ToastAndroid.SHORT,
    stringify: false,
}
/** Display a toast message.
 * 
 * @param text - The text to display.
 * @param duration - The duration of the toast message.
 * @warning Toast for android.
 */
export function toast(text: MaybeType<any>, option?: ToastOptionType) {
    const textString = text ?? '';

    const duration = option?.duration ?? DefaultToastOption.duration!;
    const stringify = option?.stringify ?? DefaultToastOption.stringify!;

    const textToast = stringify ? JSON.stringify(textString) : textString.toString();
    
    ToastAndroid.show(textToast, duration);
}

export function parseNull<T>(value: NullableType<T>, defaultValue?: string): string {
    return value === null ? defaultValue ? defaultValue : 'null' : 'null';
}

export function parseBoolean(value: boolean): string {
    return value ? 'true' : 'false';
}

export function parseDate(date: NullableType<string>): string {
    if (date === null) return '0/0/0';
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? '0/0/0' : parsedDate.toISOString().split('T')[0];
}