import FloatingButton from "@/components/common/FloatingButton";
import { ProfileIcon } from "@/components/ProfileIcon";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Posts",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            title: "Bookmarks",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "bookmark" : "bookmark-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ size, focused }) => (
              <ProfileIcon size={size} focused={focused} />
            ),

            headerShown: false,
          }}
        />
      </Tabs>
      <FloatingButton />
    </>
  );
}
