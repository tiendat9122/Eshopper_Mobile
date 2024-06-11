import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Register from "./Register";
import TopTabUnauthorize from "./TopTabUnauthorize";
import Header from "./HeaderUser";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Unauthorize = ({ navigation }: any) => {
  const [swap, setSwap] = React.useState(true);

  return (
    <>
      <Header title="Đăng nhập"/>

      <TopTabUnauthorize setSwap={setSwap} swap={swap} />

      {swap ? <Login navigation={navigation} /> : <Register />}
    </>
  );
};

export default Unauthorize;
