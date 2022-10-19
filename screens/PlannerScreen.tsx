
import { View, StyleSheet } from "react-native"
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import WorkoutForm, { ExerciseForm } from "../components/WorkoutForm";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {

    const handleFormSubmit = (form: ExerciseForm) => {
        alert(`${form.name} - ${form.duration} - ${form.type} - ${form.reps}`);
    }

    return (
        <View style={styles.container}>
            <WorkoutForm
                onSubmit={handleFormSubmit}
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