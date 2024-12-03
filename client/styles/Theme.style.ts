import React from "react";
import { DefaultTheme, Theme as ThemeType } from '@react-navigation/native';

export const rootColor = {
    white: {
        primary: '#FFFFFF',
        secondary: '#F2F2F2',
        text: '#000000',
        color: '#FFFFFF',
    },
    black: {
        primary: '#202124',
        secondary: '#3c4042',
        text: '#FFFFFF',
        color: '#000000',
    },
}

export const LightTheme: ThemeType = {
    ...DefaultTheme,
    dark: false,
    colors: {
        primary: rootColor.white.primary,
        background: rootColor.white.secondary,
        card: '#fff',
        text: rootColor.white.text,
        border: rootColor.white.color,
        notification: '#000',
    },
};

export const DarkTheme: ThemeType = {
    ...DefaultTheme,
    dark: true,
    colors: {
        primary: rootColor.black.primary,
        background: rootColor.black.secondary,
        card: '#000',
        text: rootColor.black.text,
        border: rootColor.black.color,
        notification: '#fff',
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