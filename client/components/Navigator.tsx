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
import { AppContext, rootColor } from "../styles/Theme.style";

const Navigator = () => {
    const {context: theme, setContext: setTheme} = useContext(AppContext);
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size25} source={theme ? homeIcon : homeDarkIcon}/>
            }}/>
            <Tab.Screen name="Basket" component={Basket} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size30} source={theme ? basketIcon : basketDarkIcon}/>
            }}/>
            <Tab.Screen name="History" component={History} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size25} source={theme ? historyIcon : historyDarkIcon}/>
            }}/>
            <Tab.Screen name="Theme" component={() => null} options={{
                tabBarButton: () => 
                    <View style={tabNavigatorStyle.theme}>
                        <ImageButton
                            src={theme ? lightThemeIcon : darkThemeIcon}
                            onClick={() => setTheme(!theme)}
                            style={{image: tabNavigatorStyle.size25}}
                            colorButton={{backgroundColor: 'transparent'}}
                            disableDefaultStyle/>
                        <Text style={[tabNavigatorStyle.themeText, {color: theme ? rootColor.dark.secondary : rootColor.light.secondary}]}>Theme</Text>
                    </View>
            }}/>
        </Tab.Navigator>
    );
}

export default Navigator;