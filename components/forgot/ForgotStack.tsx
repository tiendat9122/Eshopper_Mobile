import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CheckEmail from "./CheckEmail";
import ConfirmCode from "./ConfirmCode";
import ClaimPassword from "./ClaimPassword";

const Stack = createNativeStackNavigator();

const ForgotStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CheckEmail"
    >
      <Stack.Screen name="CheckEmail" component={CheckEmail} />
      <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
      <Stack.Screen name="ClaimPassword" component={ClaimPassword} />
    </Stack.Navigator>
  );
};

export default ForgotStack;
