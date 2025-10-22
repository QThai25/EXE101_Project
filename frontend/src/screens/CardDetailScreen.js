import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axiosInstance";
import Toast from "react-native-toast-message";
import * as Speech from "expo-speech";

const CardDetailScreen = ({ route }) => {
  const { card } = route.params;
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch quiz theo cardId
  useEffect(() => {
    api
      .get(`/quizzes/${card._id}`)
      .then((res) => setQuiz(res.data))
      .catch(() => console.log("No quiz found"))
      .finally(() => setLoading(false));
  }, [card]);

  // ➕ Thêm card vào bộ sưu tập
  const handleAdd = () => {
    if (!user)
      return Toast.show({
        type: "error",
        text1: "Vui lòng đăng nhập để thêm thẻ",
      });

    api
      .post(`/users/${user._id}/cards`, { cardId: card._id })
      .then(() =>
        Toast.show({
          type: "success",
          text1: "Đã thêm vào bộ sưu tập của bạn!",
        })
      )
      .catch(() =>
        Toast.show({ type: "error", text1: "Có lỗi xảy ra, vui lòng thử lại" })
      );
  };

  // 🔊 Đọc văn bản bằng giọng nói
  const speak = (text) => {
    Speech.speak(text, {
      language: "vi-VN",
      rate: 1.0,
      pitch: 1.0,
    });
  };

  const imageSource =
    card?.imageUrl ||
    card?.image ||
    "https://via.placeholder.com/300x400?text=No+Image";

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fafafa" }}
      contentContainerStyle={{ alignItems: "center", padding: 20 }}
    >
      {/* 🖼️ Card Image */}
      <View
        style={{
          width: 280,
          height: 400,
          borderRadius: 12,
          overflow: "hidden",
          elevation: 6,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 3 },
          backgroundColor: "#fff",
        }}
      >
        <Image
          source={{ uri: imageSource }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>

      {/* 🏷️ Title & Description */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginTop: 20,
          textAlign: "center",
        }}
      >
        {card.title || "Không có tiêu đề"}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#555",
          marginTop: 10,
          textAlign: "center",
          paddingHorizontal: 10,
        }}
      >
        {card.description || "Không có mô tả cho thẻ này."}
      </Text>

      {/* 🔹 Extra Info */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 15,
          width: "90%",
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Rarity:{" "}
          <Text style={{ color: "#007AFF" }}>{card.rarity || "N/A"}</Text>
        </Text>
        {card.category && (
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 5 }}>
            Category: <Text style={{ color: "#007AFF" }}>{card.category}</Text>
          </Text>
        )}
      </View>

      {/* 🧠 Quiz Section */}
      <View style={{ marginTop: 40, width: "90%" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          🧠 Câu hỏi thử thách
        </Text>

        {!quiz ? (
          <Text style={{ color: "#999" }}>Không có câu hỏi cho thẻ này.</Text>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowAnswer(!showAnswer)}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
              ❓ {quiz.question}
            </Text>

            {showAnswer && (
              <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 16, color: "#555", lineHeight: 22 }}>
                  💡 {quiz.correctAnswer}
                </Text>
                {quiz.explanation && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#666",
                      marginTop: 5,
                      fontStyle: "italic",
                    }}
                  >
                    Giải thích: {quiz.explanation}
                  </Text>
                )}
                <View style={{ marginTop: 10 }}>
                  <Button
                    title="🔊 Nghe toàn bộ"
                    onPress={() => {
                      let textToSpeak = `Đáp án đúng là: ${
                        quiz.correctAnswer
                      }. ${
                        quiz.explanation
                          ? "Giải thích: " + quiz.explanation
                          : ""
                      }`;
                      Speech.speak(textToSpeak, {
                        language: "vi-VN",
                        rate: 1.0,
                        pitch: 1.0,
                      });
                    }}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default CardDetailScreen;
