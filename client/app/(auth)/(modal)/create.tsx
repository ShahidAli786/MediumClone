import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Input from "@/components/common/Input";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/common/Button";
import { writeClient } from "@/lib/sanity";
import { useUserId } from "@/hooks/useUserId";
import { useRouter } from "expo-router";

export default function Create() {
  const { userId } = useUserId();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      postcontent: "",
      category: "",
      image: "",
    },
  });

  const createPost = async (data: any) => {
    const post = {
      title: data.title,
      postcontent: data.postcontent,
      category: data.category,
      image: data.image,
      author: { _type: "reference", _ref: userId },
    };

    const result = await writeClient.create({ _type: "post", ...post });

    if (result) {
      Alert.alert("Post created successfully");
      router.dismiss();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.title?.message}
          />
        )}
        name="title"
        rules={{ required: "Title is required" }}
      />
      <View style={{ margin: 16 }} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Post Content"
            onBlur={onBlur}
            style={{ height: 200 }}
            multiline
            onChangeText={onChange}
            value={value}
            error={errors.postcontent?.message}
            textAlignVertical="top"
          />
        )}
        name="postcontent"
        rules={{ required: "Post Content is required" }}
      />
      <View style={{ margin: 16 }} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Category"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.category?.message}
          />
        )}
        name="category"
        rules={{ required: "Category is required" }}
      />
      <View style={{ margin: 16 }} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Image"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.image?.message}
          />
        )}
        name="image"
        rules={{ required: "Image is required" }}
      />
      <View style={{ margin: 20 }} />
      <Button
        title="Create Post"
        buttonStyle={styles.button}
        buttonTextStyle={styles.buttonText}
        onPress={handleSubmit(createPost)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    rowGap: 20,
  },
  button: {
    backgroundColor: "#333",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
