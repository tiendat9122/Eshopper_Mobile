import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Detail from "./Detail";
import SeeMoreInfo from "./SeeMoreInfo";
import SearchStack from "../search/SearchStack";

const Stack = createNativeStackNavigator();

const DetailStack = ({ navigation, route }: any) => {
  const { productId } = route.params;
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Detail"
    >
      <Stack.Screen
        name="Detail"
        component={Detail}
        initialParams={{ productId }}
      />
      <Stack.Screen name="SeeMoreInfo" component={SeeMoreInfo} />
      <Stack.Screen name="SearchStack" component={SearchStack} />
    </Stack.Navigator>
  );
};

export default DetailStack;
