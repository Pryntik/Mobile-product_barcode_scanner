import homeIcon from "../assets/home.png";
import basketIcon from "../assets/basket.png";
import historyIcon from "../assets/history.png";
import React from "react";
import Accueil from "../pages/Accueil";
import Panier from "../pages/Panier";
import Historique from "../pages/Historique";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabNavigatorStyle } from "../styles/TabNavigator";

const Navigator = () => {
    const Tab = createBottomTabNavigator();
    
    return (
        <Tab.Navigator initialRouteName='Accueil'>
            <Tab.Screen name="Accueil" component={Accueil} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.mediumSize} source={homeIcon}/>
            }}/>
            <Tab.Screen name="Panier" component={Panier} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.bigSize} source={basketIcon}/>
            }}/>
            <Tab.Screen name="HistoriqueAchat" component={Historique} options={{
                tabBarIcon: () => <Image style={tabNavigatorStyle.mediumSize} source={historyIcon}/>
            }}/>
        </Tab.Navigator>
    );
}

export default Navigator;