import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostDetailsHeader from "@/components/PostDetailsHeader";
import { formatDate } from "@/utils/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useUserId } from "@/hooks/useUserId";
import { bookmarksOrUnbookmarkPost, likeOrUnlikePost } from "../apis/api";

export default function Page() {
  const params: any = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { userId } = useUserId();
  const author = JSON.parse(params?.author);
  console.log(author);

  const [isBookmarked, setIsBookmarked] = useState(
    JSON.parse(params.isBookmarked)
  );
  const [isLiked, setIsLiked] = useState(JSON.parse(params.isLiked));

  const handleLike = async () => {
    await likeOrUnlikePost(params._id, isLiked, userId); // Call the function with the current like status
    setIsLiked(!isLiked);
  };

  const handleBookmark = async () => {
    await bookmarksOrUnbookmarkPost(params._id, isBookmarked, userId); // Call the function with the current bookmark status
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View style={{ flex: 1 }}>
      <PostDetailsHeader />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.postTitle}>{params.title} </Text>
        <Text style={styles.date}>
          Created At{" "}
          {formatDate(
            new Date(
              Array.isArray(params._createdAt)
                ? params._createdAt[0]
                : params._createdAt
            )
          )}
        </Text>
        <Image
          source={{
            uri: Array.isArray(params.image) ? params.image[0] : params.image,
          }}
          style={styles.image}
        />

        <Text style={styles.desription}>{params.postcontent}</Text>
        <View style={styles.authorInfo}>
          <View style={styles.authorRow}>
            <Image source={{ uri: author.image }} style={styles.avatar} />
            <View>
              <Text style={styles.authorName}>{author.name}</Text>
            </View>
          </View>
          <Text style={styles.bio}>{author.bio}</Text>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <View style={[styles.bottomView, { paddingBottom: insets.bottom || 0 }]}>
        <View style={styles.badgeView}>
          <Text style={styles.badge}>{params.category}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: 60,
          }}
        >
          <Pressable onPress={handleBookmark}>
            <MaterialCommunityIcons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color="blue"
            />
          </Pressable>
          <Pressable onPress={handleLike}>
            <MaterialCommunityIcons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color="blue"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: { width: "100%", height: 250, marginVertical: 16, borderRadius: 5 },
  desription: {
    fontSize: 16,
    lineHeight: 24,
  },
  bottomView: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    bottom: 0,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 16,
  },
  authorInfo: {
    borderColor: "#ccc",
    marginTop: 40,
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  authorName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  bio: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    lineHeight: 24,
  },
  badge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
    paddingTop: 16,
  },
  badgeView: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
});
