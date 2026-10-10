import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import { colors, SPORTS, SPORT_TYPES, formatDuration } from "../theme";

export default function StatisticsScreen({ activities, onBack }) {
  const statistics = useMemo(() => {
    const totalDuration = activities.reduce(
      (total, activity) => total + Number(activity.duration || 0),
      0
    );

    const totalDistance = activities.reduce(
      (total, activity) => total + Number(activity.distance || 0),
      0
    );

    const byType = SPORT_TYPES.map((type) => ({
      type,
      count: activities.filter((activity) => activity.type === type).length,
    }));

    return {
      totalActivities: activities.length,
      totalDuration,
      totalDistance,
      byType,
    };
  }, [activities]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={onBack} style={styles.back}>
        <Text style={styles.backText}>‹ Accueil</Text>
      </Pressable>

      <Text style={styles.title}>Statistiques</Text>
      <Text style={styles.subtitle}>Le résumé de toutes tes séances</Text>

      <View style={styles.bigCard}>
        <Text style={styles.bigLabel}>Temps total de sport</Text>
        <Text style={styles.bigValue}>{formatDuration(statistics.totalDuration)}</Text>
        <Text style={styles.bigHint}>sur {statistics.totalActivities} activités</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.tile}>
          <Text style={styles.tileValue}>{statistics.totalActivities}</Text>
          <Text style={styles.tileLabel}>activités</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileValue}>{statistics.totalDistance.toFixed(1)}</Text>
          <Text style={styles.tileLabel}>km parcourus</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Activités par type</Text>

      {statistics.byType.map((item) => {
        const sport = SPORTS[item.type];
        const percentage =
          statistics.totalActivities === 0
            ? 0
            : (item.count / statistics.totalActivities) * 100;

        return (
          <View key={item.type} style={styles.typeCard}>
            <View style={styles.typeHeader}>
              <Text style={styles.typeName}>
                {sport.icon} {item.type}
              </Text>
              <Text style={styles.typeCount}>{item.count}</Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${percentage}%`, backgroundColor: sport.color },
                ]}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingTop: 58, paddingBottom: 40 },
  back: { marginBottom: 18 },
  backText: { color: colors.primary, fontSize: 17, fontWeight: "700" },
  title: { fontSize: 32, fontWeight: "900", color: colors.ink, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: colors.muted, marginTop: 2, marginBottom: 20 },

  bigCard: { backgroundColor: colors.ink, borderRadius: 28, padding: 24 },
  bigLabel: { color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: "600" },
  bigValue: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: -1.5,
    marginTop: 4,
  },
  bigHint: { color: "rgba(255,255,255,0.7)", marginTop: 2 },

  row: { flexDirection: "row", gap: 10, marginTop: 10 },
  tile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.line,
  },
  tileValue: { fontSize: 28, fontWeight: "900", color: colors.ink },
  tileLabel: { fontSize: 13, color: colors.muted, marginTop: 2 },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -0.5,
    marginTop: 28,
    marginBottom: 12,
  },
  typeCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  typeHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  typeName: { fontSize: 16, fontWeight: "700", color: colors.ink },
  typeCount: { fontSize: 16, fontWeight: "900", color: colors.ink },
  progressBackground: {
    height: 8,
    backgroundColor: colors.line,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: { height: 8, borderRadius: 10 },
});