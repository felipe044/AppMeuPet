import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    //paddingBottom: 200,
    //paddingTop: 10, 
    top: -100,
    position: "relative"
  },
  input: {
    backgroundColor: "#e6e3e3ff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    backgroundColor: "#e6e3e3ff",
    padding: 12,
    borderRadius: 10,
    height: 100,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
    label: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10
    //marginTop: 20,
    //marginBottom: 6,
  },

});
