import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

import { Post } from "@/lib/types";
import PostItem from "@/components/PostItem";
import { useUserId } from "@/hooks/useUserId";
import { useFocusEffect } from "expo-router";
import { fetchPostApi, searchPost } from "@/app/apis/api";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/common/SearchInput";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useUserId();
  const [searchTerm, setSearchTerm] = useState("");
  const fetchPosts = async (text) => {
    try {
      const data = await searchPost(text, userId);
      setPosts(data);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeText = async (text: string) => {
    try {
      setSearchTerm(text);
      const debounceTimeout = 300;
      let debounceTimer;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        setLoading(true);
        await fetchPosts(text);
      }, debounceTimeout);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <SearchInput
        placeholder="Search for posts"
        onChangeText={handleChangeText}
        isLoading={loading}
        clearButtonMode="while-editing"
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={
              searchTerm.length > 2 ? () => fetchPosts(searchTerm) : () => {}
            }
          />
        }
        data={posts}
        ListEmptyComponent={
          searchTerm.length > 2 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No posts found for `{searchTerm}`</Text>
            </View>
          ) : null
        }
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => <PostItem {...item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  flatList: {
    padding: 16,
    backgroundColor: "#fff",
  },
});
