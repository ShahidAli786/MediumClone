import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import Button from "./common/Button";
import { useUserId } from "@/hooks/useUserId";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Link, useFocusEffect, useRouter } from "expo-router";

type ProfileHeaderProps = {
  scrollY: SharedValue<number>;
};

export default function ProfileHeader({ scrollY }: ProfileHeaderProps) {
  const { user } = useUser();
  const { userData, invalidate } = useUserId();
  const router = useRouter();

  useFocusEffect(() => {
    invalidate();
  });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 100], [0, -100]),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.container, stylez]}>
      <Link href="/(auth)/Settings" style={styles.settingIcon}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </Link>
      <View style={styles.userView}>
        <Image source={{ uri: userData?.image }} style={styles.profileImage} />
        <View>
          <Text style={styles.title}>{userData?.name}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
        </View>
      </View>
      <View style={styles.bio}>
        <Text style={styles.bioText}>{userData?.bio}</Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          buttonStyle={[styles.button, styles.primary]}
          buttonTextStyle={{ color: "#fff" }}
          title="View Stats"
          onPress={() => {}}
        />
        <Button
          buttonStyle={styles.button}
          title="Edit Profile"
          onPress={() => router.push("/(auth)/EditProfile")}
        />
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  settingIcon: {
    paddingHorizontal: 16,
    alignSelf: "flex-end",
  },
  userView: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",

    textTransform: "capitalize",
  },
  email: {
    fontSize: 16,

    color: "gray",
  },
  buttonView: {
    flexDirection: "row",
    paddingHorizontal: 16,
    columnGap: 20,
    marginBottom: 16,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  primary: {
    backgroundColor: "grey",

    borderWidth: 0,
  },
  bio: {
    padding: 16,
  },
  bioText: {
    fontSize: 16,
  },
});
