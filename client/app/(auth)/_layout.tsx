import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="PostDetails"
          initialParams={{
            postId: 1,
          }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          options={{
            title: "Settings",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          options={{
            title: "Edit Profile",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="(modal)/create"
          options={{
            presentation: "modal",
            title: "Create Post",
            headerRight: () => (
              <TouchableOpacity>
                <Text>Preview</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </>
  );
}
