import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from "./Search";
import Filtered from "./Filtered";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={Search} />

      <Stack.Screen name="Filtered" component={Filtered} />
    </Stack.Navigator>
  );
};

export default SearchStack;
