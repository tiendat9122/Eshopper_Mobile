import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";

import HeaderUser from "../user/HeaderUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/userSlice";
import { selectLogin } from "@/redux/loginSlice";
import ListOrder from "./ListOrder";
import EmptyCart from "./EmptyCart";

const Cart = ({ navigation }: any) => {
  const login = useAppSelector(selectLogin);

  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <HeaderUser title="Giỏ hàng" />

      {login ? <ListOrder navigation={navigation} /> : <EmptyCart />}
    </View>
  );
};

export default Cart;
