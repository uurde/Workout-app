import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import data from "../data.json";
import { Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>New Workouts</Text>
            <FlatList
                data={data as Workout[]}
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