import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PostDetailsHeader() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[styles.header, { marginTop: top }]}>
      <Pressable onPress={router.back} style={styles.leftButton}>
        <Feather name="arrow-left" size={24} color="black" />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftButton: {
    padding: 16,
  },
});
