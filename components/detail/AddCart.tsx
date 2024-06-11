import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";
import IconAntDesign from "@expo/vector-icons/AntDesign";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/userSlice";
import { selectLogin } from "@/redux/loginSlice";
import { selectCart } from "@/redux/cartSlice";
import { localhostAddress } from "@/config/config";
import { setCart } from "@/redux/cartSlice";

const screenWidth = Dimensions.get("window").width;

const AddCart = ({ productId }: any) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const cart = useAppSelector(selectCart);

  const [quantity, setQuantity] = React.useState(1);

  const handleDecrease = React.useCallback(() => {
    if (quantity == 1) {
      setQuantity(1);
    } else {
      setQuantity((prev) => prev - 1);
    }
  }, [quantity]);

  const handleIncrease = React.useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, [quantity]);

  const addCartHandle = React.useCallback(() => {
    fetch(
      `${localhostAddress}/user/product/addcart?userId=${user.id}&productId=${productId}&quantity=${quantity}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Alert.alert("Yêu cầu đăng nhập");
        }
      })
      .then((data) => {
        dispatch(setCart(data));
        Alert.alert("Đã thêm hàng vào giỏ");
      });
  }, [user, quantity]);

  return (
    <View style={styles.addCartWrapper}>
      <View style={styles.addCartInfo}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => handleDecrease()}
        >
          <IconF5 name="minus" size={17} style={{ color: "#a1aeb1" }} />
        </TouchableOpacity>
        <Text style={styles.addCartInfo_Quantity}>{quantity}</Text>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => handleIncrease()}
        >
          <IconF5 name="plus" size={17} style={{ color: "#a1aeb1" }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addCartBtn}
        onPress={() => addCartHandle()}
      >
        <Text style={styles.addCartBtn_Text}>Thêm vào giỏ</Text>
        <IconF5
          name="shopping-basket"
          size={17}
          style={styles.addCartBtn_Icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addCartBtn_Icon: { color: "#ffffff" },
  addCartBtn_Text: {
    color: "#ffffff",
    fontWeight: "600",
    marginRight: 10,
    fontSize: 16,
  },
  addCartBtn: {
    flexDirection: "row",
    backgroundColor: "#960019",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    elevation: 5,
  },
  addCartInfo_Quantity: { fontWeight: "600", fontSize: 18 },
  addCartInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addCartWrapper: {
    position: "absolute",
    width: screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    bottom: 0,
    zIndex: 1,
    padding: 15,
  },
});

export default AddCart;
