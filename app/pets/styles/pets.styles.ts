import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#F3F4F6", // fundo igual ao Figma
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#1C1C1C",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,

    // sombra compatível Android + iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  petIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FDEBD2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  petIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  petInfo: {
    flex: 1,
  },

  petName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1C",
  },

  petBreed: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2F80ED",
    justifyContent: "center",
    alignItems: "center",

    // sombra do Figma
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  fabText: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "600",
    marginTop: -2,
  },
});
