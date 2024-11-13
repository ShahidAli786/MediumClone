import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TextInputProps,
} from "react-native";

interface SearchInputProps extends TextInputProps {
  isLoading?: boolean;
}

function SearchInput(props: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="gray"
        {...props}
      />
      {props.isLoading && <ActivityIndicator size="small" color="gray" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    height: 50,
    margin: 16,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchInput;
