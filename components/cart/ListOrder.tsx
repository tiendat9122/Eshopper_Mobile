import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";
import IconAntDesign from "@expo/vector-icons/AntDesign";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/userSlice";
import { selectCart } from "@/redux/cartSlice";
import { selectCheckout } from "@/redux/checkoutSlice";
import { localhostAddress } from "@/config/config";
import { selectLogin } from "@/redux/loginSlice";
import FormatCurrency from "../common/FormatCurrency";
import Payment from "./Payment";

const ListOrder = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const login = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const cart = useAppSelector(selectCart);
  const checkout = useAppSelector(selectCheckout);

  const [order, setOrder] = React.useState([]);

  const orderFetcher = React.useCallback(() => {
    fetch(`${localhostAddress}/user/orders/get?userId=` + user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      } else {
        setOrder([]);
      }
    });
  }, [user, cart, checkout]);

  React.useEffect(() => {
    orderFetcher();
  }, [orderFetcher]);

  const changeQuantity = React.useCallback(
    ({ orderDetailId, productId }: any, apiPart: string) => {
      fetch(
        `${localhostAddress}/user/orders/${apiPart}?orderDetailId=${orderDetailId}&productId=${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      ).then((res) => {
        if (res.ok) {
          orderFetcher();
        }
      });
    },
    [user]
  );

  const handleSubtract = React.useCallback(
    ({ orderDetailId, productId }: any) => {
      changeQuantity({ orderDetailId, productId }, "subtractquantity");
    },
    [user]
  );

  const handleAdd = React.useCallback(
    ({ orderDetailId, productId }: any) => {
      changeQuantity({ orderDetailId, productId }, "addquantity");
    },
    [user]
  );

  const handleRemove = React.useCallback(
    (id: any) => {
      fetch(`${localhostAddress}/user/orders/delete?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          orderFetcher();
        }
      });
    },
    [user]
  );

  return (
    <>
      <Payment navigation={navigation} order={order} />

      <ScrollView
        contentContainerStyle={styles.scrollViewWrapper}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          scrollEnabled={false}
          data={order}
          contentContainerStyle={styles.flatListWrapper}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
          horizontal={false}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: any) => (
            <View key={item.id} style={styles.itemWrapper}>
              <TouchableOpacity style={styles.itemImageBtn}>
                <Image
                  source={{
                    uri:
                      `${localhostAddress}/user/product/download/` +
                      item.product.picture,
                  }}
                  style={styles.itemImageBtn_Picture}
                />
              </TouchableOpacity>

              <View style={styles.itemInfoWrapper}>
                <View style={styles.itemTitle}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.itemTitle_Text}
                  >
                    {item.product.name}
                  </Text>
                </View>
                <Text style={styles.itemPrice}>
                  {FormatCurrency(item.price)}
                </Text>
                <View style={styles.handleQuantityWrapper}>
                  <View style={styles.quantityWrapper}>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={() =>
                        handleSubtract({
                          orderDetailId: item.id,
                          productId: item.product.id,
                        })
                      }
                    >
                      <IconAntDesign name="minus" size={17} />
                    </TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={() =>
                        handleAdd({
                          orderDetailId: item.id,
                          productId: item.product.id,
                        })
                      }
                    >
                      <IconAntDesign name="plus" size={17} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => handleRemove(item.id)}
                  >
                    <IconF5
                      name="trash-alt"
                      size={20}
                      style={styles.removeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  removeIcon: { color: "#960019" },
  removeBtn: {},
  quantityBtn: { backgroundColor: "rgba(0,0,0,0.1)", padding: 3 },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    width: 80,
    justifyContent: "space-between",
  },
  handleQuantityWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemPrice: { fontWeight: "500", color: "#960019", fontSize: 15 },
  itemTitle_Text: { fontSize: 15 },
  itemTitle: {},
  itemInfoWrapper: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  itemImageBtn_Picture: { width: 100, height: 120 },
  itemImageBtn: {},
  itemWrapper: {
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  flatListWrapper: {},
  scrollViewWrapper: {
    backgroundColor: "#ffffff",
    margin: 10,
    paddingBottom: 90,
  },
});

export default ListOrder;
