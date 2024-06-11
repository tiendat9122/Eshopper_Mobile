import * as React from "react";
import { View, Text } from "react-native";

const EmptyCart = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 15 }}>Yêu cầu thực hiện đăng nhập</Text>
    </View>
  );
};

export default EmptyCart;
