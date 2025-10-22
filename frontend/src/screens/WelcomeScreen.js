import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../auth/AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleEnterCollection = () => {
    if (user) {
      navigation.navigate("Main"); // vào tab collection
    } else {
      navigation.navigate("Login"); // chưa login -> chuyển login
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980",
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
      blurRadius={2}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 30,
          textShadowColor: "rgba(0,0,0,0.6)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        }}
      >
        Chào mừng đến với Card Collection App
      </Text>


      {!user && (
        <Button
          mode="outlined"
          textColor="#fff"
          onPress={() => navigation.navigate("Login")}
          style={{ width: 220, marginVertical: 5, borderColor: "#fff" , backgroundColor: 'rgba(0,0,0,0.3)'}}
        >
          Đăng Nhập
        </Button>
      )}
      {!user && (
        <Button
          mode="outlined"
          textColor="#fff"
          onPress={() => navigation.navigate("Register")}
          style={{ width: 220, marginVertical: 5, borderColor: "#fff", backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          Đăng ký
        </Button>
      )}
    </ImageBackground>
  );
};

export default HomeScreen;
