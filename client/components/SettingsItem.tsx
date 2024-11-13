import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SettingsItemProps {
  title: string;
  leftIcon?: React.ReactNode;
  onPress: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  leftIcon,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>{leftIcon}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chevronContainer}>
        <Feather name="chevron-right" size={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
  },
  iconContainer: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 14,
  },
  chevronContainer: {
    marginLeft: 16,
  },
});

export default SettingsItem;
