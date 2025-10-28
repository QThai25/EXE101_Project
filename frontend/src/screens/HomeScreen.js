import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const featuredHeroes = [
  {
    id: "1",
    name: "Trần Hưng Đạo",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Tran_Hung_Dao_statue_HCMC.jpg",
    description:
      "Vị tướng kiệt xuất, lãnh đạo kháng chiến chống quân Nguyên Mông.",
  },
  {
    id: "2",
    name: "Hai Bà Trưng",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Hai_Ba_Trung_statue.jpg",
    description:
      "Hai nữ anh hùng đầu tiên khởi nghĩa chống lại ách đô hộ phương Bắc.",
  },
  {
    id: "3",
    name: "Nguyễn Trãi",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Nguyen_Trai_statue.jpg",
    description: "Danh nhân văn hóa thế giới, mưu sĩ xuất sắc thời Lê Lợi.",
  },
];

const news = [
  {
    id: "1",
    title: "Kỷ niệm 780 năm chiến thắng Đông Bộ Đầu",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Bach_Dang_river.jpg",
    description:
      "Buổi lễ diễn ra long trọng tại Hải Phòng, tái hiện chiến công lừng lẫy...",
  },
  {
    id: "2",
    title: "Triển lãm “Những vị anh hùng bất tử” tại Hà Nội",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/38/Hanoi_museum.jpg",
    description:
      "Triển lãm trưng bày hơn 100 hiện vật quý về các anh hùng dân tộc.",
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safe, { paddingTop: insets.top || 0 }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ImageBackground
            source={{
              uri: "https://res.cloudinary.com/dwonhfsfj/image/upload/v1761622132/BG_web_jljyeh.png",
            }}
            style={styles.bg}
            resizeMode="cover"
          >
            <ScrollView contentContainerStyle={styles.container}>
              {/* Featured Heroes */}
              <Text style={styles.sectionTitle}>🏅 Nhân vật nổi bật</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 16 }}
              >
                {featuredHeroes.map((hero) => (
                  <View key={hero.id} style={styles.heroCard}>
                    <Image source={{ uri: hero.image }} style={styles.heroImage} />
                    <Text style={styles.heroName}>{hero.name}</Text>
                    <Text style={styles.heroDesc}>{hero.description}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* News */}
              <Text style={styles.sectionTitle}>📰 Tin tức lịch sử</Text>
              {news.map((item) => (
                <TouchableOpacity key={item.id} style={styles.newsCard}>
                  <Image source={{ uri: item.image }} style={styles.newsImage} />
                  <View style={styles.newsContent}>
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <Text style={styles.newsDesc}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f4ec",
  },
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B0000",
    marginVertical: 10,
  },
  heroCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    width: 180,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  heroName: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
    color: "#2e2e2e",
  },
  heroDesc: {
    fontSize: 13,
    color: "#555",
  },
  newsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  newsContent: {
    flex: 1,
    padding: 10,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  newsDesc: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});
