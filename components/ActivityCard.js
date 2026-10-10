import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import SportIcon from "./SportIcon";
import {
  colors,
  sportOf,
  displayName,
  formatDate,
  formatDuration,
} from "../theme";

export default function ActivityCard({ activity, onPress }) {
  const name = displayName(activity);
  const sport = sportOf(activity.type);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <SportIcon type={activity.type} />

      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.date}>{formatDate(activity.date)}</Text>
        </View>

        {name !== activity.type ? (
          <Text style={[styles.type, { color: sport.color }]}>{activity.type}</Text>
        ) : null}

        <View style={styles.stats}>
          <Text style={styles.stat}>{formatDuration(activity.duration)}</Text>
          {activity.distance > 0 ? (
            <Text style={styles.stat}>{activity.distance} km</Text>
          ) : null}
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 14,
    marginBottom: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  body: { flex: 1, marginLeft: 14 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  name: { flex: 1, fontSize: 18, fontWeight: "800", color: colors.ink, marginRight: 8 },
  date: { fontSize: 13, color: colors.muted, fontWeight: "600" },
  type: { fontSize: 12, fontWeight: "700", marginTop: 2 },
  stats: { flexDirection: "row", gap: 16, marginTop: 6 },
  stat: { fontSize: 14, color: colors.ink, fontWeight: "700" },
  chevron: { fontSize: 26, color: colors.muted, marginLeft: 8 },
});