import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Product from "./Product";
import DetailStack from "../detail/DetailStack";
import SearchStack from "../search/SearchStack";

const Stack = createNativeStackNavigator();

const ProductStack = ({ navigation, route }: any) => {
  const { categoryId } = route.params;

  return (
    <Stack.Navigator
      initialRouteName="Product"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Product"
        component={Product}
        initialParams={{ categoryId }}
      />
      <Stack.Screen name="DetailStack" component={DetailStack} />
      <Stack.Screen name="SearchStack" component={SearchStack} />
    </Stack.Navigator>
  );
};

export default ProductStack;
