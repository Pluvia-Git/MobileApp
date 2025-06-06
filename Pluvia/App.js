import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./screens/Homepage"
import LoginPage from "./screens/Loginpage"
import SignUpPage from "./screens/Signuppage"
import TabRouter from "./screens/(tabs)/_layout";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Mainpage"
            component={TabRouter}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
