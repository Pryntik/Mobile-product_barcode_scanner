import React from "react";
import { ColorValue } from "react-native";
import { DefaultTheme, Theme as ThemeNavigationType } from '@react-navigation/native';

export const rootColor = {
    white: {
        primary: 'white',
        secondary: '#F2F2F2',
        text: 'white',
        smoke: '#f0f0f0',
        color: 'white',
    },
    gray: {
        color: '#dfdfdf',
    },
    black: {
        primary: '#202124',
        secondary: '#3c4042',
        text: 'black',
        smoke: '#232526',
        color: 'black',
    },
}

export type ThemeType = ThemeNavigationType & {
    colors: ThemeNavigationType['colors'] & {
        reverse: ColorValue,
        click: ColorValue,
        low: ColorValue,
    };
};

export const LightTheme: ThemeType = {
    ...DefaultTheme,
    dark: false,
    colors: {
        primary: rootColor.white.primary,
        background: rootColor.white.primary,
        card: rootColor.white.secondary,
        text: rootColor.black.text,
        border: rootColor.white.smoke,
        notification: rootColor.white.secondary,
        reverse: rootColor.black.primary,
        click: rootColor.white.smoke,
        low: rootColor.white.smoke,
    },
};

export const DarkTheme: ThemeType = {
    ...DefaultTheme,
    dark: true,
    colors: {
        primary: rootColor.black.primary,
        background: rootColor.black.primary,
        card: rootColor.black.smoke,
        text: rootColor.white.text,
        border: rootColor.white.smoke,
        notification: rootColor.black.secondary,
        reverse: rootColor.white.primary,
        click: rootColor.black.secondary,
        low: rootColor.white.smoke,
    },
};

type ThemeContextType = {
    isDark: boolean,
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContextDefault: ThemeContextType = {
   isDark: false,
   setIsDark: () => {}
}

export const AppContext = React.createContext<ThemeContextType>(ThemeContextDefault);