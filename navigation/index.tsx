import { ColorSchemeName } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Entypo } from '@expo/vector-icons';

import HomeScreen from "../screens/HomeScreen";
import PlannerScreen from "../screens/PlannerScreen";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";

export default function Navgation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            theme={colorScheme === "light" ? DefaultTheme : DarkTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="WorkoutDetail"
                component={WorkoutDetailScreen}
                options={{ title: "Workout Info" }}
            />
        </Stack.Navigator>
    )
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="Home">
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ size, color }) =>
                        <FontAwesome name="home" size={size} color={color} />
                    //tabBarIcon:({size, color}) şeklinde verirsek dark/light mode değişkeni yapabiliriz.
                }}
            />
            <BottomTab.Screen
                name="Planner"
                component={PlannerScreen}
                options={{
                    tabBarIcon: ({ size, color }) =>
                        <Entypo name="add-to-list" size={size} color={color} />
                }}
            />
        </BottomTab.Navigator>
    )
}