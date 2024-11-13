import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function FloatingButton() {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/(modal)/create")}
      style={[styles.floatingButton, { bottom: bottom + 60 }]}
    >
      <MaterialIcons name="edit-document" size={24} color="white" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 80,
    right: 16,
    backgroundColor: "blue",
    borderRadius: 40,
    padding: 16,
  },
});
