import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Post } from "@/lib/types";
import { useUserId } from "@/hooks/useUserId";
import { useFocusEffect } from "expo-router";
import { fetchUserPost } from "@/app/apis/api";
import PostItem from "@/components/PostItem";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function Page() {
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
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
      const data = await fetchUserPost(userId);
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

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <View
      style={{
        backgroundColor: Colors.light.background,
        paddingTop: top,
      }}
    >
      <Animated.FlatList
        onScroll={onScroll}
        ListHeaderComponent={<ProfileHeader scrollY={scrollY} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
        }
        data={posts}
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => <PostItem {...item} />}
        ListFooterComponent={<View style={{ height: 400 }} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  flatList: {
    padding: 16,
    backgroundColor: "#fff",
  },
  myPost: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
