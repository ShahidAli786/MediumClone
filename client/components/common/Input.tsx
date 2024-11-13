import {
  View,
  Text,
  TextInputProps,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";

interface InputProps extends TextInputProps {
  error?: string;
}

export default function Input(inputProps: InputProps) {
  return (
    <View>
      <TextInput {...inputProps} style={[styles.input, inputProps.style]} />
      {inputProps.error && (
        <Text style={{ color: "red" }}>{inputProps.error}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    height: 45,
    backgroundColor: "#fff",
    borderWidth: 1,

    fontSize: 16,
    paddingHorizontal: 10,
  },
});
