import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: 8,
    position: "absolute",
    left: 0,
  },
  editButton: {
    padding: 8,
    position: "absolute",
    right: 0,
  },
  petImageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  petName: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 12,
  },
  petBreed: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  vaccineCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2F80ED",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: {
    fontSize: 28,
    color: "#fff",
  },
});
