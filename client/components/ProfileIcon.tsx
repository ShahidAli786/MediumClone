import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

export function ProfileIcon({
  focused,
  size,
}: {
  focused?: boolean;
  size: number;
}) {
  const { user } = useUser();

  return (
    <View
      style={[
        styles.profileIcon,
        {
          height: size + 5,
          width: size + 5,
          borderWidth: focused ? 2 : 0,
        },
      ]}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={[
          styles.image,
          {
            height: size,
            width: size,
          },
        ]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  profileIcon: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
