import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { sportOf } from "../theme";

export default function SportIcon({ type, size = 52 }) {
  const sport = sportOf(type);
  return (
    <View
      style={[
        styles.box,
        {
          width: size,
          height: size,
          borderRadius: size * 0.34,
          backgroundColor: sport.color + "22",
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.48 }}>{sport.icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: "center", justifyContent: "center" },
});