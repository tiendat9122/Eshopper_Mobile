import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

import { localhostAddress } from "@/config/config";
import FormatCurrency from "../common/FormatCurrency";

const BestSeller = ({ navigation, user }: any) => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(`${localhostAddress}/user/home/bestseller`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((productBestSeller) => {
          setProducts(productBestSeller);
        });
      }
    });
  }, []);

  const handleAddToCart = () => {
    return;
  };

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleHero}>Bán chạy hàng đầu</Text>
        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={styles.viewAllTitle}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bannerWrapper}>
        <View style={styles.bannerItem}>
          <IconF5 name="check" size={24} style={styles.bannerItem_Icon} />
          <Text style={styles.bannerItem_Text}>Chất lượng</Text>
        </View>
        <View style={styles.bannerItem}>
          <IconF5
            name="shipping-fast"
            size={24}
            style={styles.bannerItem_Icon}
          />
          <Text style={styles.bannerItem_Text}>Miễn phí ship</Text>
        </View>
      </View>

      <FlatList
        scrollEnabled={true}
        data={products}
        contentContainerStyle={styles.flatListWrapper}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        horizontal={true}
        keyExtractor={(item: any) => JSON.stringify(item.product.id)}
        renderItem={({ item }: any) => (
          <View style={styles.productWrapper}>
            <TouchableOpacity
              style={styles.productBtn}
              onPress={() =>
                navigation.navigate("DetailStack", {
                  productId: item.product.id,
                })
              }
            >
              <Image
                source={{
                  uri:
                    `${localhostAddress}/user/product/download/` +
                    item.product.picture,
                }}
                style={styles.productBtn_Image}
              />
              <View style={styles.productBtn_SubAd}>
                <Text style={styles.productBtn_SubAd_Text}>Bán chạy</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.productInfo}>
              <View style={styles.productTitle}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.productTitle_Text}
                >
                  {item.product.name}
                </Text>
              </View>

              <Text style={styles.productSoldNumber}>
                {item.totalQuantity}00+
              </Text>

              <View style={styles.productPrice}>
                <Text style={styles.productPrice_Text}>
                  {FormatCurrency(item.product.retail)}
                </Text>
                {/* <TouchableOpacity
                  style={styles.cartBtn}
                  onPress={() => handleAddToCart()}
                >
                  <IconF5
                    name="shopping-basket"
                    size={17}
                    style={styles.cartBtn_Icon}
                  />
                </TouchableOpacity> */}
                <Text
                  style={{
                    backgroundColor: "#c21807",
                    color: "#ffffff",
                    paddingHorizontal: 3,
                    borderRadius: 4,
                    marginRight: 9,
                    fontSize: 13,
                  }}
                >
                  -25%
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productInfo: {
    marginTop: 10,
  },
  cartBtn_Icon: { color: "#960019" },
  cartBtn: { marginRight: 10 },
  productPrice_Text: { fontWeight: "500", color: "#960019", fontSize: 15 },
  productPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productSoldNumber: { color: "#aaa7ad", fontSize: 13 },
  productTitle_Text: { fontSize: 15 },
  productTitle: { minHeight: 40 },
  productBtn_SubAd_Text: { color: "#ffffff", fontSize: 10 },
  productBtn_SubAd: {
    position: "absolute",
    minWidth: 50,
    maxWidth: 50,
    justifyContent: "center",
    alignItems: "center",
    top: 3,
    left: 3,
    borderRadius: 5,
    backgroundColor: "#c21807",
    padding: 3,
  },
  productBtn_Image: { width: 120, height: 150 },
  productBtn: {
    borderRadius: 10,
    overflow: "hidden",
  },
  productWrapper: { minWidth: 125, maxWidth: 125, marginRight: 15 },
  flatListWrapper: { marginTop: 15 },
  bannerItem_Text: { marginLeft: 10, fontWeight: "500" },
  bannerItem_Icon: { color: "#960019" },
  bannerItem: {
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    flexDirection: "row",
  },
  bannerWrapper: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: 55,
    elevation: 10,
  },
  sectionWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleHero: {
    fontWeight: "bold",
    fontSize: 17,
    textTransform: "uppercase",
  },
  viewAllBtn: {},
  viewAllTitle: {
    color: "#960019",
    fontWeight: "500",
    fontSize: 15,
  },
  flatList: {
    backgroundColor: "#ccc",
    paddingTop: 10,
    paddingBottom: 10,
  },

  categoryItem: {
    marginRight: 10,
  },
  categoryItemWrap: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryItemImage: {
    width: 120,
    height: 140,
  },
  categoryItemName: {
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BestSeller;
