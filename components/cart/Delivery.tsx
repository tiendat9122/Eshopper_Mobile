import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { localhostAddress } from "@/config/config";

import HeaderUser from "../user/HeaderUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/userSlice";
import { selectCart, setCart } from "@/redux/cartSlice";
import { setCheckout } from "@/redux/checkoutSlice";
import { selectLogin } from "@/redux/loginSlice";
import ListOrder from "./ListOrder";
import EmptyCart from "./EmptyCart";
import FormatCurrency from "../common/FormatCurrency";
import { useDispatch } from "react-redux";

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

const Delivery = ({ navigation }: any) => {
  const login = useAppSelector(selectLogin);
  const dispatch = useDispatch();

  const user = useAppSelector(selectUser);

  const [fullName, setFullName] = React.useState(user.full_name);
  const [phoneNumber, setPhoneNumber] = React.useState(user.phone_number);
  const [email, setEmail] = React.useState(user.email);
  const [address, setAddress] = React.useState(user.address);
  const [birthday, setBirthday] = React.useState(user.birth_day);

  const cart = useAppSelector(selectCart);
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
      }
    });
  }, [user, cart]);

  const goBackCart = () => {
    navigation.navigate("Cart");
  };

  const handleCheckout = () => {
    const objCheckout = {
      id: bill.id,
      totalBill: bill.totalBill,
      full_name: fullName,
      address: address,
      phone_number: phoneNumber,
      email: email,
      birth_day: "",
    };
    const data = JSON.stringify(objCheckout);
    fetch(`${localhostAddress}/user/checkout/pay`, {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        dispatch(setCheckout(data));
        dispatch(setCart(data));
        Alert.alert("Đặt hàng thành công");
        navigation.navigate("Cart");
      });
  };

  const radioButtons: RadioButtonProps[] = React.useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Thanh toán trực tiếp",
        value: "option1",
      },
      {
        id: "2",
        label: "Thanh toán bằng VNPay",
        value: "option2",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = React.useState<string | undefined>();

  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <HeaderUser
        backButton={true}
        title="Thông tin vận chuyển"
        navigation={navigation}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.addressWrapper}>
          <Text style={styles.addressTitle}>Địa chỉ giao hàng</Text>

          <View style={styles.addressInfoWrapper}>
            <View style={styles.addressInfoGroup}>
              <Text style={styles.addressInfoTitle}>Họ và tên người nhận</Text>
              <TextInput
                value={fullName}
                style={styles.addressInfoInput}
                onChangeText={setFullName}
              ></TextInput>
            </View>
            <View style={styles.addressInfoGroup}>
              <Text style={styles.addressInfoTitle}>Số điện thoại</Text>
              <TextInput
                value={phoneNumber}
                style={styles.addressInfoInput}
                onChangeText={setPhoneNumber}
              ></TextInput>
            </View>
            <View style={styles.addressInfoGroup}>
              <Text style={styles.addressInfoTitle}>Email</Text>
              <TextInput
                value={email}
                style={styles.addressInfoInput}
                onChangeText={setEmail}
              ></TextInput>
            </View>

            <View style={styles.addressInfoGroup}>
              <Text style={styles.addressInfoTitle}>Địa chỉ</Text>
              <TextInput
                value={address}
                style={styles.addressInfoInput}
                onChangeText={setAddress}
              ></TextInput>
            </View>

            <View style={styles.addressInfoGroup}>
              <Text style={styles.addressInfoTitle}>Quốc gia</Text>
              <TextInput
                value="Việt Nam"
                style={styles.addressInfoInput}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.payMethodWrapper}>
          <Text style={styles.payMethodTitle}>Phương thức thanh toán</Text>

          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={styles.payMethodRadioBtn}
            labelStyle={{ fontSize: 15 }}
          />
        </View>

        <View style={styles.billWrapper}>
          <Text style={styles.billTitle}>Tổng hóa đơn</Text>
          <View style={styles.billInfoWrapper}>
            <View style={styles.billInfoItem}>
              <Text style={styles.billInfoTitle}>Tổng giá sản phẩm</Text>
              <Text style={styles.billInfoDetail}>
                {FormatCurrency(bill.totalPrice)}
              </Text>
            </View>
            <View style={styles.billInfoItem}>
              <Text style={styles.billInfoTitle}>Phí vận chuyển</Text>
              <Text style={styles.billInfoDetail}>
                {FormatCurrency(bill.transport)}
              </Text>
            </View>
            <View style={styles.billInfoItem}>
              <Text style={[styles.billInfoTitle, { fontWeight: "500" }]}>
                Tổng hóa đơn
              </Text>
              <Text
                style={[
                  styles.billInfoDetail,
                  { color: "black", fontWeight: "500" },
                ]}
              >
                {FormatCurrency(bill.totalBill)}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => handleCheckout()}
        >
          <Text style={styles.checkoutText}>Giao hàng</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkoutText: { fontSize: 16, fontWeight: "bold", color: "#ffffff" },
  checkoutBtn: {
    alignItems: "center",
    backgroundColor: "orange",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  billInfoDetail: { fontSize: 15, color: "#909090" },
  billInfoTitle: { flex: 1, fontSize: 15 },
  billInfoItem: { flexDirection: "row" },
  billInfoWrapper: { padding: 10, gap: 5 },
  billTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#960019",
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderColor: "#960019",
  },
  billWrapper: {},
  payMethodRadioBtn: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  payMethodTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#960019",
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderColor: "#960019",
  },
  payMethodWrapper: {},
  addressInfoInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 3,
  },
  addressInfoTitle: { fontSize: 16, fontWeight: "500" },
  addressInfoGroup: { justifyContent: "center", gap: 7 },
  addressInfoWrapper: { padding: 10, gap: 10 },
  addressTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#960019",
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderColor: "#960019",
  },
  addressWrapper: {},
  scrollViewWrapper: {
    margin: 10,
    gap: 10,
    paddingBottom: 50,
  },
});

export default Delivery;
