import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import Home from "./Home";
import DetailStack from "../detail/DetailStack";
import SearchStack from "../search/SearchStack";
import ProductStack from "../product/ProductStack";
import CartStack from "../cart/CartStack";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DetailStack" component={DetailStack} />
      <Stack.Screen name="SearchStack" component={SearchStack} />
      <Stack.Screen name="ProductStack" component={ProductStack} />
      <Stack.Screen name="CartStack" component={CartStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
