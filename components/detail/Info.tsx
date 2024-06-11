import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

import { localhostAddress } from "@/config/config";
import FormatCurrency from "../common/FormatCurrency";

const Info = ({ navigation, product }: any) => {
  return (
    <>
      <View style={styles.titleWrapper}>
        <Image
          style={styles.titleImage}
          source={{
            uri: `${localhostAddress}/user/product/download/` + product.picture,
          }}
        />
        <View style={styles.titleGroup}>
          <Text style={styles.titleName}>{product.name}</Text>
          <View style={styles.titlePriceGroup}>
            <Text style={styles.titlePriceText}>
              {FormatCurrency(product.retail)}
            </Text>
            <View style={styles.titleDiscountGroup}>
              <Text style={styles.titleDiscountText}>
                -25 <IconF5 name="percent" size={12} style={{}} />
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Information Detail */}
      <View style={styles.infoWrapper}>
        <Text style={styles.infoTitle}>Thông tin sản phẩm</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoGroup}>
            <Text style={styles.infoItemTitle}>Mã hàng</Text>
            <Text style={styles.infoItemDetail}>{product.id}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoItemTitle}>Tác giả</Text>
            <Text style={styles.infoItemDetail}>{product.author.name}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoItemTitle}>Nhà Xuất Bản</Text>
            <Text style={styles.infoItemDetail}>NXB Hồ Chí Minh</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoItemTitle}>Năm xuất bản</Text>
            <Text style={styles.infoItemDetail}>2024</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.infoItemTitle}>Thể loại</Text>
            <Text style={styles.infoItemDetail}>
              {product.categories
                .map((categoryItem: any) => categoryItem.name)
                .join(" / ")}
            </Text>
          </View>

          <Text
            style={styles.infoSummaryText}
            numberOfLines={7}
            ellipsizeMode="tail"
          >
            {product.summary}
          </Text>
          <TouchableOpacity
            style={styles.infoSeeMoreBtn}
            onPress={() => navigation.navigate("SeeMoreInfo", { product })}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "orange",
              }}
            >
              Xem thêm
            </Text>
            <IconF5
              name="angle-right"
              size={16}
              style={{ color: "orange", paddingTop: 3 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoSeeMoreBtn: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  infoSummaryText: { lineHeight: 23, textAlign: "justify", fontSize: 15 },
  infoItemDetail: { flex: 1.5, fontSize: 15 },
  infoItemTitle: { flex: 1, fontSize: 15 },
  infoGroup: { flexDirection: "row" },
  infoContainer: { gap: 10 },
  infoTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    fontSize: 15,
  },
  infoWrapper: { gap: 5 },
  titleDiscountText: {
    backgroundColor: "#c21807",
    width: 60,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 3,
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleDiscountGroup: {
    flex: 2,
  },
  titlePriceText: {
    color: "#960019",
    fontWeight: "bold",
    fontSize: 21,
    flex: 1,
  },
  titlePriceGroup: {
    flexDirection: "row",
    borderColor: "black",
    flex: 1,
    gap: 30,
    alignItems: "center",
  },
  titleName: {
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 25,
    paddingVertical: 10,
    textAlign: "justify",
  },
  titleGroup: {},
  titleImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    backgroundColor: "#ccc",
  },
  titleWrapper: {},
});

export default Info;
