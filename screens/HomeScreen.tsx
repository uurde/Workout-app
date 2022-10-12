import { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";
import { getWorkouts } from "../storage/workout";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        async function getData() {
            const _workouts = await getWorkouts();
            setWorkouts(_workouts);
        }
        getData();
    }, []);

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

// const PressableItem = ({ item }: { item: Workout }) => {
//     return (
//         <Pressable onPress={() => alert(`i am pressed - ${item.name}`)}>
//             <WorkoutItem item={item} />
//         </Pressable>
//     )
// }

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