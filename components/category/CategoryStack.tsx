import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Category from "./Category";
import SearchStack from "../search/SearchStack";
import ProductStack from "../product/ProductStack";

const Stack = createNativeStackNavigator();

const CategoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Category"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Category" component={Category} />

      <Stack.Screen name="SearchStack" component={SearchStack} />

      <Stack.Screen name="ProductStack" component={ProductStack} />
    </Stack.Navigator>
  );
};

export default CategoryStack;
