import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#F5F6FA", // Igual ao fundo do Figma
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Título centralizado
    position: "relative",
    marginBottom: 10,
    paddingTop: 60,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  backButton: {
    position: "absolute",
    left: 0,
    padding: 8,
  },

  editButton: {
    position: "absolute",
    right: 0,
    padding: 8,
  },

  petImageWrapper: {
    alignItems: "center",
    marginTop: 10,
  },

petImage: {
  width: 140,
  height: 140,
  borderRadius: 70,
  backgroundColor: "#F5F5F5",
  borderWidth: 1,
  borderColor: "#e5e5e5",
  overflow: "hidden",
},

  petName: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 15,
  },

  petBreed: {
    textAlign: "center",
    fontSize: 14,
    color: "#7A7A7A",
    marginBottom: 20,
  },

  vaccineCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  fab: {
    position: "absolute",
    bottom: 35,
    right: 30,
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#2F80ED",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  fabText: {
    fontSize: 30,
    color: "#fff",
    marginTop: -2,
  },
  emptyVaccines: {
    padding: 50
  },
  textEmptyVaccines: {
    textAlign: "center",
    fontSize: 15
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
