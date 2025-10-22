import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../auth/AuthContext";

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <Text style={styles.info}>Username: {user?.username}</Text>
      {user?.email && <Text style={styles.info}>Email: {user.email}</Text>}

      <Button mode="contained" onPress={logout} style={styles.logoutBtn}>
        Đăng xuất
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutBtn: {
    marginTop: 30,
    width: 150,
  },
});

export default ProfileScreen;
