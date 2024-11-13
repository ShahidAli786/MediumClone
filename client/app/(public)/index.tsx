import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { screen } from "@/constants/screen";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { client, writeClient } from "@/lib/sanity";
import { AUTHOR_BY_ID_QUERY } from "@/lib/queries";
import { UserResource } from "@clerk/types";
import Login from "@/components/Login";

export default function Page() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { user } = useUser();

  const isUserExist = async (user: UserResource) => {
    const existingUser = await client.fetch(AUTHOR_BY_ID_QUERY, {
      id: user.id,
    });
    return existingUser;
  };

  useEffect(() => {
    if (user) {
      isUserExist(user).then((existingUser) => {
        if (!existingUser) {
          writeClient.create({
            _type: "author",
            id: user.id,
            name: user.fullName,
            username: user.firstName,
            email: user.emailAddresses[0].emailAddress,
            image: user.imageUrl,
            bio: "",
          });
        }
      });
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      // get user data

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };
  return <Login onGoogleLogin={handleGoogleLogin} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    width: screen.width * 0.8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
