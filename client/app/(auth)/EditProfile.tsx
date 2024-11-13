import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { useUserId } from "@/hooks/useUserId";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Ionicons } from "@expo/vector-icons";
import { editProfileApi, uploadAuthorImage } from "../apis/api";
export default function EditProfile() {
  const { userData, userId, invalidate } = useUserId();
  const [image, setImage] = useState(userData?.image);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      bio: userData?.bio,
    },
  });
  useEffect(() => {
    setValue("name", userData?.name);
    setValue("email", userData?.email);
    setValue("bio", userData?.bio);
    setImage(userData?.image);
  }, [userData]);

  const pickImageAsync = async () => {
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
      const imageUrl = await uploadAuthorImage(userId || "", bytes);
      setImage(imageUrl);
      invalidate();
    } else {
      alert("You did not select any image.");
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const updatedData = {
        name: data.name,
        bio: data.bio,
      };
      const result = await editProfileApi(userId || "", updatedData);
      if (result) {
        Alert.alert("Profile updated successfully");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: image }} style={styles.image}>
        <Pressable onPress={pickImageAsync}>
          <Ionicons name="camera" size={24} color="grey" />
        </Pressable>
      </ImageBackground>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.name?.message?.toString()}
          />
        )}
        name="name"
        rules={{ required: "Name is required" }}
      />
      <View style={styles.spacer} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            editable={false}
            error={errors?.email?.message?.toString()}
          />
        )}
        name="email"
        rules={{ required: "Email is required" }}
      />
      <View style={styles.spacer} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Bio"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            style={{ height: 200 }}
            error={errors?.bio?.message?.toString()}
          />
        )}
        name="bio"
        rules={{ required: "Bio is required" }}
      />
      <View style={styles.spacer} />
      <Button
        buttonTextStyle={styles.buttonText}
        buttonStyle={styles.button}
        title="Save"
        onPress={handleSubmit(updateProfile)}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    height: 16,
  },
  button: {
    backgroundColor: "#333",
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
