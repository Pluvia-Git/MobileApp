import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Mainpage from "./index";
import Config from "./config";
import Alagamento from "./alagamento";
import Profile from "./profile";
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

const Tab = createBottomTabNavigator();

export default function TabRouter() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          height: 60 + insets.bottom,
          paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#87ceeb",
        tabBarInactiveTintColor: "#410445",
      }}
    >
      <Tab.Screen name="Início" component={Mainpage} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={26} color={'#87ceeb'}/>
            ),          
        }}
      />
      <Tab.Screen name="Alagamentos" component={Alagamento} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="water" size={23} color={'#87ceeb'}/>
            ),          
        }}
      />
      <Tab.Screen name="Perfil" component={Profile} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={25} color={'#87ceeb'}/>
            ),          
        }}
      />
      <Tab.Screen name="Configurações" component={Config}
        options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" size={25} color={'#87ceeb'}/>
            ),          
        }}
      />
    </Tab.Navigator>
  );
}
