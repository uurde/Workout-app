import { View, StyleSheet, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export default function WorkoutDetailScreen({ route }: Navigation) {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Slug - {route.params.slug}</Text>
        </View>
    )
};

type DetailParams ={
    route:{
        params:{
            slug: string
        }
    }
}

type Navigation = NativeStackHeaderProps & DetailParams;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold",
        fontFamily: "montserrat-bold"
    }
});