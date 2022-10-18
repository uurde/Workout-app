import { View, StyleSheet, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { Modal } from '../components/styled/Modal';
import { PressableText } from "../components/styled/PressableText";
import React, { useEffect, useState } from "react";
import { formatSeconds } from "../utils/time";
import { FontAwesome } from '@expo/vector-icons';
import WorkoutItem from "../components/WorkoutItem";
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

type DetailParams = {
    route: {
        params: {
            slug: string
        }
    }
}

type Navigation = NativeStackHeaderProps & DetailParams;

export default function WorkoutDetailScreen({ route }: Navigation) {
    const [sequence, setSequence] = useState<SequenceItem[]>([]);
    const [trackerId, setTrackerId] = useState(-1);
    const workout = useWorkoutBySlug(route.params.slug);
    const { countDown, isRunning, stop, start } = useCountDown(trackerId);
    const startupSequence = ["3", "2", "1", "Go!"].reverse();

    useEffect(() => {
        if (!workout) return;
        if (trackerId === workout.sequence.length - 1) return;
        if (countDown === 0) {
            addItemToSequence(trackerId + 1);
        }
    }, [countDown]);

    const addItemToSequence = (id: number) => {
        let newSequence = [];

        if (id > 0) {
            newSequence = [...sequence, workout!.sequence[id]];
        } else {
            newSequence = [workout!.sequence[id]];
        }

        setSequence(newSequence);
        setTrackerId(id);
        start(newSequence[id].duration + startupSequence.length);
    }

    if (!workout) return null;

    const hasReachedEnd = sequence.length === workout.sequence.length && countDown === 0;

    return (
        <View style={styles.container}>
            <WorkoutItem
                item={workout}
                childStyles={{ marginTop: 10 }}
            >
                <Modal
                    activator={({ handleOpen }) =>
                        <PressableText
                            onPress={handleOpen}
                            text="Check Sequence"
                        />
                    }
                >
                    <View>
                        {
                            workout.sequence.map((seq, i) =>
                                <View key={seq.slug} style={styles.sequenceItem}>
                                    <Text>
                                        {seq.name} | {seq.type} | {formatSeconds(seq.duration)}
                                    </Text>
                                    {i !== workout.sequence.length - 1 &&
                                        <FontAwesome
                                            name="arrow-down"
                                            size={20}
                                        />
                                    }
                                </View>
                            )
                        }
                    </View>
                </Modal>
            </WorkoutItem>
            <View style={styles.wrapper}>
                <View style={styles.counterUI}>
                    <View style={styles.counterItem}>
                        {sequence.length === 0 ?
                            <FontAwesome
                                name="play-circle-o"
                                size={100}
                                onPress={() => addItemToSequence(0)}
                            /> :
                            isRunning ?
                                <FontAwesome
                                    name="stop-circle-o"
                                    size={100}
                                    onPress={() => stop()}
                                /> :
                                <FontAwesome
                                    name="play-circle-o"
                                    size={100}
                                    onPress={() => {
                                        if (hasReachedEnd) {
                                            addItemToSequence(0);
                                        } else {
                                            start(countDown);
                                        }
                                    }
                                    }
                                />
                        }
                    </View>
                    {sequence.length > 0 && countDown >= 0 &&
                        <View style={styles.counterItem}>
                            <Text style={{ fontSize: 55 }}>
                                {countDown > sequence[trackerId].duration ?
                                    startupSequence[countDown - sequence[trackerId].duration - 1] :
                                    countDown
                                }
                            </Text>
                        </View>
                    }
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 60, fontWeight: "bold" }}>
                        {
                            sequence.length === 0 ? "Prepare" : hasReachedEnd ? "Great Job!" : sequence[trackerId].name
                        }
                    </Text>
                </View>
            </View>
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
    },
    sequenceItem: {
        alignItems: "center"
    },
    counterUI: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20
    },
    counterItem: {
        flex: 1,
        alignItems: "center"
    },
    wrapper: {
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        borderWidth: 1,
        padding: 10
    }
});