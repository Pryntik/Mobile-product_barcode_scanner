import homeIcon from "../assets/img/home.png";
import basketIcon from "../assets/img/basket.png";
import historyIcon from "../assets/img/history.png";
import homeDarkIcon from "../assets/img/home_dark.png";
import basketDarkIcon from "../assets/img/basket_dark.png";
import historyDarkIcon from "../assets/img/history_dark.png";
import lightThemeIcon from "../assets/img/light_theme.png";
import darkThemeIcon from "../assets/img/dark_theme.png";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import History from "../pages/History";
import ImageButton from "./ImageButton";
import React, { useContext } from "react";
import { Text, Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabNavigatorStyle } from "../styles/TabNavigator.style";
import { AppContext } from "../styles/Theme.style";
import { useTheme } from "@react-navigation/native";

const Navigator = () => {
    const {isDark, setIsDark} = useContext(AppContext);
    const theme = useTheme();
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size25} source={isDark ? homeDarkIcon : homeIcon}/>
            }}/>
            <Tab.Screen name="Basket" component={Basket} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size30} source={isDark ? basketDarkIcon : basketIcon}/>
            }}/>
            <Tab.Screen name="History" component={History} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size25} source={isDark ? historyDarkIcon : historyIcon}/>
            }}/>
            <Tab.Screen name="Theme" component={() => null} options={{
                tabBarButton: () => 
                    <View style={tabNavigatorStyle.theme}>
                        <ImageButton
                            src={isDark ? darkThemeIcon : lightThemeIcon}
                            onClick={() => setIsDark(!isDark)}
                            style={{image: tabNavigatorStyle.size25}}
                            colorButton={{backgroundColor: 'transparent'}}
                            disableDefaultStyle/>
                        <Text style={[tabNavigatorStyle.themeText, {color: theme.colors.text}]}>Theme</Text>
                    </View>
            }}/>
        </Tab.Navigator>
    );
}

export default Navigator;