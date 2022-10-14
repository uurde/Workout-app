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
    const [trackerId, setTrackerIdx] = useState(-1);

    const workout = useWorkoutBySlug(route.params.slug);
    const countDown = useCountDown(trackerId, trackerId >= 0 ? sequence[trackerId].duration : -1);

    const addItemToSequnce = (id: number) => {
        setSequence([...sequence, workout!.sequence[id]]);
        setTrackerIdx(id);
    }

    if (!workout) return null;

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
            <View>
                {sequence.length === 0 &&
                    <FontAwesome
                        name="play-circle-o"
                        size={100}
                        onPress={() => addItemToSequnce(0)}
                    />
                }
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
    }
});