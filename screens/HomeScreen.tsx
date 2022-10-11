import React from "react";
import { View, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export default function HomeScreen({navigation}: NativeStackHeaderProps) {
    return (
        <View>
            <Text>I am home screen</Text>
        </View>
    )
};