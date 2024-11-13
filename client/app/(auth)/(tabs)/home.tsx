import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

import { Post } from "@/lib/types";
import PostItem from "@/components/PostItem";
import { useUserId } from "@/hooks/useUserId";
import { useFocusEffect } from "expo-router";
import { fetchPostApi } from "@/app/apis/api";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useUserId();
  useFocusEffect(() => {
    if (userId) {
      fetchPosts();
    }
  });

  const fetchPosts = async () => {
    try {
      const data = await fetchPostApi(userId);
      setPosts(data);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
      }
      data={posts}
      style={styles.flatList}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      keyExtractor={(item) => item?._id}
      renderItem={({ item }) => <PostItem {...item} />}
    />
  );
}
const styles = StyleSheet.create({
  flatList: {
    padding: 16,
    backgroundColor: "#fff",
  },
});
