import { View, StyleSheet, TextInput } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";

export type WorkoutFormData = {
    name: string
}

type WorkoutProps = {
    onSubmit: (form: WorkoutFormData) => void
}

export default function WorkoutForm({ onSubmit }: WorkoutProps) {

    const { control, handleSubmit } = useForm();

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                rules={{ required: true }}
                name="name"
                render={({ field: { onChange, value } }) =>
                    <TextInput
                        onChangeText={onChange}
                        style={styles.input}
                        value={value}
                        placeholderTextColor={"rbag(0,0,0,0.4)"}
                        placeholder="Workout Name"
                    />
                }
            />
            <PressableText
                style={{ marginTop: 15 }}
                text="Confirm"
                onPress={handleSubmit((data) => {
                    onSubmit(data as WorkoutFormData);
                })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    },
    input: {
        width: 200,
        margin: 2,
        borderWidth: 1,
        height: 30,
        padding: 5,
        borderRadius: 5,
        borderColor: "rgba(0,0,0,0.4)"
    }
});