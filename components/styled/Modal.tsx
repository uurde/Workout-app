import { FunctionComponent, useState } from "react";
import { View, StyleSheet, Text, Modal as DefaultModal } from "react-native";
import { PressableText } from "./PressableText";

type ModalProps = {
    activator?: FunctionComponent<
        {
            handleOpen: () => void
        }
    >,
    children: React.ReactNode
}

export function Modal({ activator: Activator, children }: ModalProps) {

    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <DefaultModal
                visible={isModalVisible}
                transparent={false}
                animationType="slide">
                <View style={styles.centerView}>
                    <View style={styles.contentView}>
                        {children}
                    </View>
                    <PressableText
                        onPress={() => setModalVisible(false)}
                        text="Close" />
                </View>
            </DefaultModal>
            {Activator ?
                <Activator handleOpen={() => setModalVisible(true)} /> :
                <PressableText
                    onPress={() => setModalVisible(true)}
                    text="Open" />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentView: {
        marginBottom: 20
    }
});