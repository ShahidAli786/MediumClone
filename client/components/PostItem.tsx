import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Post } from "@/lib/types";
import { formatDate } from "@/utils/utils";
import { Link } from "expo-router";
import { screen } from "@/constants/screen";

interface PostItemProps extends Post {}

export default function PostItem(props: PostItemProps) {
  return (
    <Link
      href={{
        pathname: "/PostDetails",
        params: {
          ...props,
          author: JSON.stringify(props.author),
          likes: JSON.stringify(props.likes),
          bookmarks: JSON.stringify(props.bookmarks),
          isLiked: props.isLiked.toString(),
          isBookmarked: props.isBookmarked.toString(),
        },
      }}
    >
      <View style={styles.card}>
        <Image source={{ uri: props.image }} style={styles.image} />
        <View style={styles.postDetails}>
          <Text style={styles.title}>{props.title}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {props.postcontent}
          </Text>
        </View>
        <View style={styles.postInfo}>
          <View style={styles.userRow}>
            <Image source={{ uri: props.author.image }} style={styles.avatar} />
            <Text>{props.author.name}</Text>
          </View>
          <Text>{formatDate(new Date(props._createdAt))}</Text>
        </View>
      </View>
    </Link>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: screen.width - 32,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  postDetails: {
    padding: 16,
    rowGap: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
});
