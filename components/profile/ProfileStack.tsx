import * as React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChangeInfo from "./ChangeInfo";
import ChangePassword from "./ChangePassword";
import OptionChange from "./OptionChange";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OptionChange"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OptionChange" component={OptionChange} />

      <Stack.Screen name="ChangeInfo" component={ChangeInfo} />

      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
