import homeIcon from "../assets/home.png";
import basketIcon from "../assets/basket.png";
import historyIcon from "../assets/history.png";
import React from "react";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import History from "../pages/History";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabNavigatorStyle } from "../styles/TabNavigator.style";

const Navigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size25} source={homeIcon}/>
            }}/>
            <Tab.Screen name="Basket" component={Basket} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size30} source={basketIcon}/>
            }}/>
            <Tab.Screen name="History" component={History} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.size25} source={historyIcon}/>
            }}/>
        </Tab.Navigator>
    );
}

export default Navigator;