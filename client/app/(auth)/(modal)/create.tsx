import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Input from "@/components/common/Input";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/common/Button";
import { writeClient } from "@/lib/sanity";
import { useUserId } from "@/hooks/useUserId";
import { useRouter } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { uploadAuthorImage, uploadPostImage } from "@/app/apis/api";

export default function Create() {
  const { userId } = useUserId();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      postcontent: "",
      category: "",
    },
  });

  const createPost = async (data: any) => {
    const post = {
      title: data.title,
      postcontent: data.postcontent,
      category: data.category,
      image: image,
      author: { _type: "reference", _ref: userId },
    };

    const result = await writeClient.create({ _type: "post", ...post });

    if (result) {
      Alert.alert("Post created successfully");
      router.dismiss();
    }
  };

  const uploadImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        //   console.log(result.assets[0]);
        setImage(result.assets[0].uri);
        const img = await fetch(result.assets[0].uri);
        const bytes = await img.blob();
        const imageUrl = await uploadPostImage(bytes);
        setImage(imageUrl);
      } else {
        alert("You did not select any image.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(image);

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
      <Pressable onPress={uploadImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.uploadImageView}>
            <EvilIcons name="image" size={100} color="black" />
            <Text>Upload Image</Text>
          </View>
        )}
      </Pressable>
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
  uploadImageView: {
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
});
