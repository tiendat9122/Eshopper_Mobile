import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import HeaderDetail from "./HeaderDetail";

const SeeMoreInfo = ({ navigation, route }: any) => {
  const { product } = route.params;

  return (
    <>
      <HeaderDetail navigation={navigation} />

      <ScrollView
        contentContainerStyle={{ margin: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 5 }}>
          <Text
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderColor: "#ccc",
              paddingVertical: 5,
              fontSize: 15,
            }}
          >
            Thông tin sản phẩm
          </Text>
          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1, fontSize: 15 }}>Mã hàng</Text>
              <Text style={{ flex: 1.5, fontSize: 15 }}>{product.id}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1, fontSize: 15 }}>Tác giả</Text>
              <Text style={{ flex: 1.5, fontSize: 15 }}>
                {product.author.name}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1, fontSize: 15 }}>Nhà xuất bản</Text>
              <Text style={{ flex: 1.5, fontSize: 15 }}>NXB Hồ Chí Minh</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1, fontSize: 15 }}>Năm xuất bản</Text>
              <Text style={{ flex: 1.5, fontSize: 15 }}>2024</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1, fontSize: 15 }}>Thể loại</Text>
              <Text style={{ flex: 1.5, fontSize: 15 }}>
                {product.categories
                  .map((categoryItem: any) => categoryItem.name)
                  .join(" / ")}
              </Text>
            </View>

            <Text
              style={{ lineHeight: 23, textAlign: "justify", fontSize: 15 }}
            >
              {product.summary}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SeeMoreInfo;
