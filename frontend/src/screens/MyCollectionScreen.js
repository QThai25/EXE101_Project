import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import api from "../api/axiosInstance";
import CardItem from "../components/CardItem";
import { useAuth } from "../auth/AuthContext";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const MyCollectionScreen = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    api
      .get(`/users/${user.id}/cards`)
      .then((res) => {
        const normalizedCards = res.data.map((uc) => uc.cardId);
        setCards(normalizedCards);
        setLoading(false);
      })
      .catch(() => {
        Toast.show({ type: "error", text1: "Lỗi tải bộ sưu tập" });
        setLoading(false);
      });
  }, [user]);

  if (loading)
    return (
      <ActivityIndicator size="large" color="#8B0000" style={{ flex: 1 }} />
    );

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loginPrompt}>
          Bạn cần đăng nhập để xem bộ sưu tập của mình
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Đến trang Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ImageBackground
    // source={require("../../assets/paper-bg.jpg")} // nền giấy cổ xưa
    // style={{ flex: 1, padding: 10 }}
    // imageStyle={{ opacity: 0.15 }}
    >
      {cards.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
          Bạn chưa sở hữu thẻ nào.
        </Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CardItem
              card={item}
              onPress={() => navigation.navigate("CardDetail", { card: item })}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Nút thêm thẻ */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddCard")}
        style={styles.addButton}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = {
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loginPrompt: {
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#8B0000",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
};

export default MyCollectionScreen;
