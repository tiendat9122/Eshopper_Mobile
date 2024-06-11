import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Authenticate from "./Authenticate";
import ForgotStack from "../forgot/ForgotStack";
import ProfileStack from "../profile/ProfileStack";

const Stack = createNativeStackNavigator();

const User = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Authenticate" component={Authenticate} />
      <Stack.Screen
        name="ForgotStack"
        component={ForgotStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default User;
