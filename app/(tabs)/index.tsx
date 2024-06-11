import * as React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import IconF5 from "@expo/vector-icons/FontAwesome5";
import IconAntDesign from "@expo/vector-icons/AntDesign";

import HomeStack from "@/components/home/HomeStack";
import User from "@/components/user/User";
import CategoryStack from "@/components/category/CategoryStack";
import CartStack from "@/components/cart/CartStack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#960019", // Màu chữ khi được chọn
            tabBarInactiveTintColor: "#960019", // Màu chữ khi không được chọn
            tabBarItemStyle: {
              paddingVertical: 1, // Khoảng cách dọc giữa các icon
            },
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontSize: 12 }}>Trang chủ</Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <IconF5 name="home" size={23} color={"#960019"} />
              ),
            }}
          />
          <Tab.Screen
            name="CategoryStack"
            component={CategoryStack}
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontSize: 12 }}>Danh mục</Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <IconF5 name="boxes" size={23} color={"#960019"} />
              ),
            }}
          />
          <Tab.Screen
            name="Giỏ hàng"
            component={CartStack}
            options={{
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontSize: 12 }}>Giỏ hàng</Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <IconF5 name="shopping-cart" size={23} color={"#960019"} />
              ),
            }}
          />
          <Tab.Screen
            name="User"
            component={User}
            options={{
              headerShown: false,
              tabBarLabel: ({ color }) => (
                <Text style={{ color, fontSize: 12 }}>Cá nhân</Text>
              ),
              tabBarIcon: ({ color, size }) => (
                <IconF5 name="user-alt" size={23} color={"#960019"} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
