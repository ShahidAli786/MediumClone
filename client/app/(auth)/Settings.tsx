import { View } from "react-native";
import React from "react";
import SettingsItem from "@/components/SettingsItem";
import { Feather } from "@expo/vector-icons";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();
  const { signOut, session } = useClerk();
  const handleSignOut = async () => {
    await session?.remove();
    await signOut();
    router.replace("/");
  };

  return (
    <View>
      <SettingsItem title="Coming Soon" onPress={() => {}} />
      <SettingsItem
        leftIcon={<Feather name="settings" size={24} />}
        title="Post Settings"
        onPress={() => {}}
      />

      <SettingsItem
        leftIcon={<Feather name="log-out" size={24} color="red" />}
        title="Logout"
        onPress={handleSignOut}
      />
    </View>
  );
}
