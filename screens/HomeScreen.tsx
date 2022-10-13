import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkouts } from "../hooks/useWorkouts";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
    const workouts = useWorkouts();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>New Workouts</Text>
            <FlatList
                data={workouts}
                keyExtractor={item => item.slug}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("WorkoutDetail", { slug: item.slug })
                            }
                        >
                            <WorkoutItem item={item} />
                        </Pressable>
                    )
                }}
            />
        </View>
    )
};

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