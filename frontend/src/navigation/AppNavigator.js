import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../auth/AuthContext";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MyCollectionScreen from "../screens/MyCollectionScreen";
import CardDetailScreen from "../screens/CardDetailScreen";
import AdminScreen from "../screens/AdminScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { user } = useAuth();

  const tabs = [
    { name: "Home", component: HomeScreen },
    { name: "My Collection", component: MyCollectionScreen },
    { name: "Profile", component: ProfileScreen },
    { name: "Admin", component: AdminScreen, adminOnly: true },
  ];

  return (
    <Tab.Navigator>
      {tabs.map(
        (tab) =>
          (!tab.adminOnly || user?.role === "admin") && (
            <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
          )
      )}
    </Tab.Navigator>
  );
};


const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            {/* Khi đã đăng nhập → chỉ vào MainTabs */}
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </>
        )}

        {/* CardDetail có thể mở từ bất kỳ tab nào */}
        <Stack.Screen
          name="CardDetail"
          component={CardDetailScreen}
          options={{ headerShown: true, title: "Chi tiết thẻ" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;