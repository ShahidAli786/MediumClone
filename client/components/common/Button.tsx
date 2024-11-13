import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";

type ButtonProps = {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
};

export default function Button({
  title,
  onPress,
  buttonStyle,
  buttonTextStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonTitle, buttonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  buttonTitle: {
    fontSize: 14,
    color: "#000",

    fontWeight: "600",
  },
});
