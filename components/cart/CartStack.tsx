import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cart from "./Cart";
import Delivery from "./Delivery";

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Cart"
    >
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Delivery" component={Delivery} />
    </Stack.Navigator>
  );
};

export default CartStack;
