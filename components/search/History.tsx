import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IconF5 from "@expo/vector-icons/FontAwesome5";

const History = () => {
  const history = [
    {
      id: 1,
      name: "Đắc nhân tâm",
    },
    {
      id: 2,
      name: "Muôn kiếp nhân sinh",
    },
    {
      id: 3,
      name: "Đời ngắn lắm đừng ngủ dài",
    },
    {
      id: 4,
      name: "Đứng dậy lần nữa",
    },
    {
      id: 5,
      name: "Ba người thầy vĩ đại",
    },
  ];

  return (
    <View style={styles.historyWrapper}>
      <View style={styles.titleWrapper}>
        <View style={styles.titleGroup}>
          <IconF5 name="history" size={17} />
          <Text style={styles.titleText}>Lịch sử tìm kiếm</Text>
        </View>
        <Text style={styles.clearAllText}>Xóa</Text>
      </View>
      <View style={styles.listWrapper}>
        {history.map((item) => (
          <View key={item.id} style={styles.itemGroup}>
            <TouchableOpacity style={styles.itemBtn}>
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconF5 name="times" size={16} style={styles.itemIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={{ alignSelf: "center" }}>
        <Text style={{ fontSize: 15, fontWeight: "500", color: "#ccc" }}>
          Xem tất cả
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBtn: { flex: 1 },
  itemIcon: { paddingTop: 4, color: "#ccc" },
  itemText: { fontSize: 16 },
  itemGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listWrapper: { padding: 10, gap: 20 },
  clearAllText: { color: "#c21807", fontWeight: "500", fontSize: 15 },
  titleText: { fontSize: 17, fontWeight: "bold" },
  titleGroup: { flexDirection: "row", gap: 5, alignItems: "center" },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyWrapper: {
    gap: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default History;
