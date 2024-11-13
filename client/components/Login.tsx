import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

type LoginProps = {
  onGoogleLogin: () => void;
};

export default function Login({ onGoogleLogin }: LoginProps) {
  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={[styles.banner, { paddingTop: top + 40 }]}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.description}>
          This is a social publishing platform that is open to all and home for
          a diverse array of stories, blogs and perspectives. Just like Facebook
          but with a more serious and concise focus on blogging on different
          topics, and I would say it is mainly built for writer
        </Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={onGoogleLogin} style={styles.googleButton}>
          <Image
            source={require("../assets/images/google.png")}
            style={{
              width: 24,
              height: 24,
              marginRight: 10,
            }}
          />
          <Text style={styles.buttonTitle}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  buttonTitle: {
    fontSize: 16,
  },
  banner: {
    padding: 16,
    backgroundColor: Colors.dark.highlight,
    justifyContent: "center",
    paddingVertical: 40,
  },
  buttonView: {
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  description: {
    fontSize: 14,
    // textAlign: "center",
    color: "white",
    lineHeight: 24,
  },
});
