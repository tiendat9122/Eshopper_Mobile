import * as React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

import { localhostAddress } from "@/config/config";

const Advertise = ({ navigation }: any) => {
  const [listAdvertise, setListAdvertise] = React.useState([]);

  React.useEffect(() => {
    fetch(`${localhostAddress}/user/home/advertise`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((AdvertiseData) => {
          setListAdvertise(AdvertiseData);
        });
      }
    });
  }, []);

  return (
    <View style={styles.advertiseWrapper}>
      <View style={styles.titleWrapper}>
        <IconF5 name="check" size={24} style={styles.titleIcon} />
        <Text style={styles.titleText}>Nhà đồng hành</Text>
      </View>

      <FlatList
        scrollEnabled={true}
        data={listAdvertise}
        contentContainerStyle={styles.flatListWrapper}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        horizontal={true}
        keyExtractor={(item: any) => JSON.stringify(item.id)}
        renderItem={({ item }: any) => (
          <View style={styles.itemWrapper}>
            <Image
              source={{
                uri:
                  `${localhostAddress}/user/home/advertise/download/` +
                  item.picture,
              }}
              style={styles.itemImage}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemImage: { width: 120, height: 120, marginRight: 10 },
  itemWrapper: {},
  flatListWrapper: {},
  titleIcon: { color: "#960019" },
  titleText: { marginLeft: 10, fontWeight: "500" },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
  },
  advertiseWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    paddingBottom: 40,
  },
});

export default Advertise;
