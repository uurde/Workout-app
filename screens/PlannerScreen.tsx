import { useState } from "react";
import slugify from "slugify";
import { View, StyleSheet, FlatList } from "react-native"
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import ExerciseForm, { ExerciseFormData } from "../components/ExerciseForm";
import { SequenceItem, SequenceType } from "../types/data";
import ExerciseItem from "../components/ExerciseItem";
import { PressableText } from "../components/styled/PressableText";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {

    const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([]);

    const handleFormSubmit = (form: ExerciseFormData) => {
        const sequenceItem: SequenceItem = {
            slug: slugify(form.name + " " + Date.now(), { lower: true }),
            name: form.name,
            type: form.type as SequenceType,
            duration: Number(form.duration)
        };

        if (form.reps) {
            sequenceItem.reps = Number(form.reps);
        }

        setSequenceItems([...sequenceItems, sequenceItem]);
    }

    return (
        <View style={styles.container}>
            <ExerciseForm
                onSubmit={handleFormSubmit}
            />
            <FlatList
                data={sequenceItems}
                keyExtractor={item => item.slug}
                renderItem={({ item, index }) =>
                    <ExerciseItem item={item}>
                        <PressableText
                            text="Remove"
                            onPressIn={() => {
                                const items = [...sequenceItems];
                                items.splice(index, 1);
                                setSequenceItems(items);
                            }}
                        />
                    </ExerciseItem>
                }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        felx: 1,
        padding: 20
    }
});