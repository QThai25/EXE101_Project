import React from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const featuredHeroes = [
  {
    id: "1",
    name: "Trần Hưng Đạo",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Tran_Hung_Dao_statue_HCMC.jpg",
    description: "Vị tướng kiệt xuất, lãnh đạo kháng chiến chống quân Nguyên Mông.",
  },
  {
    id: "2",
    name: "Hai Bà Trưng",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Hai_Ba_Trung_statue.jpg",
    description: "Hai nữ anh hùng đầu tiên khởi nghĩa chống lại ách đô hộ phương Bắc.",
  },
  {
    id: "3",
    name: "Nguyễn Trãi",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Nguyen_Trai_statue.jpg",
    description: "Danh nhân văn hóa thế giới, mưu sĩ xuất sắc thời Lê Lợi.",
  },
];

const dailyMissions = [
  { id: "1", title: "Tìm hiểu về trận Bạch Đằng", reward: "50 EXP", icon: "⚔️" },
  { id: "2", title: "Hoàn thành quiz về Hai Bà Trưng", reward: "30 EXP", icon: "🎯" },
  { id: "3", title: "Xem video về Nguyễn Huệ", reward: "40 EXP", icon: "📽️" },
];

const news = [
  {
    id: "1",
    title: "Kỷ niệm 780 năm chiến thắng Đông Bộ Đầu",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Bach_Dang_river.jpg",
    description: "Buổi lễ diễn ra long trọng tại Hải Phòng, tái hiện chiến công lừng lẫy...",
  },
  {
    id: "2",
    title: "Triển lãm “Những vị anh hùng bất tử” tại Hà Nội",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Hanoi_museum.jpg",
    description: "Triển lãm trưng bày hơn 100 hiện vật quý về các anh hùng dân tộc.",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Featured Heroes */}
      <Text style={styles.sectionTitle}>🏅 Nhân vật nổi bật</Text>
      <FlatList
        data={featuredHeroes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.heroCard}>
            <Image source={{ uri: item.image }} style={styles.heroImage} />
            <Text style={styles.heroName}>{item.name}</Text>
            <Text style={styles.heroDesc}>{item.description}</Text>
          </View>
        )}
      />

      {/* Daily Missions */}
      <Text style={styles.sectionTitle}>🎯 Nhiệm vụ hằng ngày</Text>
      {dailyMissions.map((mission) => (
        <TouchableOpacity key={mission.id} style={styles.missionCard}>
          <Text style={styles.missionIcon}>{mission.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.missionReward}>{mission.reward}</Text>
          </View>
        </TouchableOpacity>
      ))}

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ec",
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
  missionCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
  },
  missionIcon: {
    fontSize: 26,
    marginRight: 12,
  },
  missionTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  missionReward: {
    fontSize: 13,
    color: "#888",
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
