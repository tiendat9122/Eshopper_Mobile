import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/userSlice";
import { selectCart } from "@/redux/cartSlice";
import { selectCheckout } from "@/redux/checkoutSlice";
import User from "../user/User";
import { localhostAddress } from "@/config/config";
import FormatCurrency from "../common/FormatCurrency";

const screenWidth = Dimensions.get("window").width;

interface User {
  id: number;
  full_name: string;
  address: string;
  phone_number: string;
  email: string;
}

interface Cart {
  id: number;
  orderDate: string;
  totalPrice: number;
  transport: number;
  totalBill: number;
  state: boolean;
  note: string;
  address: string;
  phone_number: string;
  full_name: string;
  user: User;
}

const defaultCart: Cart = {
  id: 0,
  orderDate: "",
  totalPrice: 0,
  transport: 0,
  totalBill: 0,
  state: false,
  note: "",
  address: "",
  phone_number: "",
  full_name: "",
  user: {
    id: 0,
    full_name: "",
    address: "",
    phone_number: "",
    email: "",
  },
};

const Payment = ({ navigation, order }: any) => {
  const cart = useAppSelector(selectCart);

  const checkout = useAppSelector(selectCheckout);

  const user = useAppSelector(selectUser);

  const [bill, setBill] = React.useState<Cart>(defaultCart);

  React.useEffect(() => {
    fetch(`${localhostAddress}/user/orders/cart?userId=` + user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((billData) => {
          setBill(billData);
        });
      } else {
        setBill(defaultCart);
      }
    });
  }, [user, cart, order, checkout]);

  return (
    <View style={styles.orderWrapper}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderInfo_Title}>Thành tiền</Text>
        <Text style={styles.orderInfo_Total}>
          {FormatCurrency(bill.totalPrice)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.orderBtn}
        onPress={() => navigation.navigate("Delivery")}
      >
        <Text style={styles.orderBtn_Text}>Thanh toán</Text>
        <IconF5 name="arrow-right" size={17} style={styles.orderBtn_Icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  orderBtn_Icon: { color: "#ffffff" },
  orderBtn_Text: {
    color: "#ffffff",
    fontWeight: "600",
    marginRight: 10,
    fontSize: 16,
  },
  orderBtn: {
    flexDirection: "row",
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    elevation: 5,
  },
  orderInfo_Total: { fontSize: 16, color: "#960019", fontWeight: "500" },
  orderInfo_Title: { fontWeight: "600", fontSize: 18 },
  orderInfo: {},
  orderWrapper: {
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    padding: 15,
  },
});

export default Payment;
