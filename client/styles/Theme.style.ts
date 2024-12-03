import React, { useState } from "react";
import { DefaultTheme, Theme as ThemeType } from '@react-navigation/native';

export const rootColor = {
    light: {
        primary: '#FFFFFF',
        secondary: '#F2F2F2',
        text: '#000000',
    },
    dark: {
        primary: '#202124',
        secondary: '#3c4042',
        text: '#FFFFFF',
    },
}

const LightTheme: ThemeType = {
    ...DefaultTheme,
    dark: false,
    colors: {
        primary: '#000',
        card: '#fff',
        background: '#fff',
        text: '#000',
        border: '#000',
        notification: '#000',
    },
};

const DarkTheme: ThemeType = {
    ...DefaultTheme,
    dark: true,
    colors: {
        primary: '#fff',
        card: '#000',
        background: '#000',
        text: '#fff',
        border: '#fff',
        notification: '#fff',
    },
};

type ThemeContextType = {
    context: boolean,
    setContext: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContextDefault: ThemeContextType = {
   context: true,
   setContext: () => {}
}

export const AppContext = React.createContext<ThemeContextType>(ThemeContextDefault);

export const Theme = {
    light: LightTheme,
    dark: DarkTheme,
};