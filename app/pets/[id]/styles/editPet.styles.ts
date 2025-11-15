import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F6FA",
        paddingTop: 100

    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },

    imageArea: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: "#DDD",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: 20,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    label: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: 16,
    },

    input: {
        backgroundColor: "#EAEAEA",
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
    },

    saveButton: {
        marginTop: 25,
        backgroundColor: "#3A7BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    saveButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
});
