import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

import ActivityCard from "../components/ActivityCard";
import { colors, SPORTS, formatDuration } from "../theme";

const TYPES = ["Toutes", "Course", "Marche", "Vélo", "Natation", "Fitness"];

export default function ActivitiesScreen({
  activities,
  onSelectActivity,
  onAddPress,
  onStatisticsPress,
}) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Toutes");

  const totals = useMemo(
    () => ({
      minutes: activities.reduce((t, a) => t + Number(a.duration || 0), 0),
      km: activities.reduce((t, a) => t + Number(a.distance || 0), 0),
    }),
    [activities]
  );

  const filteredActivities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...activities]
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .filter((activity) => {
        const text = `${activity.type} ${activity.notes || ""}`.toLowerCase();
        const matchesType =
          selectedType === "Toutes" || activity.type === selectedType;
        return text.includes(query) && matchesType;
      });
  }, [activities, search, selectedType]);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.heading}>SportTrack</Text>
            <Text style={styles.subtitle}>Mon historique sportif</Text>
          </View>

          <Pressable style={styles.statsPill} onPress={onStatisticsPress}>
            <Text style={styles.statsPillText}>📊 Statistiques</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Mes activités</Text>
          <Text style={styles.heroNumber}>{activities.length}</Text>

          <View style={styles.heroRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>
                {formatDuration(totals.minutes)}
              </Text>
              <Text style={styles.heroStatLabel}>de sport</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{totals.km.toFixed(1)} km</Text>
              <Text style={styles.heroStatLabel}>parcourus</Text>
            </View>
          </View>
        </View>

        <TextInput
          style={styles.search}
          placeholder="Rechercher par type ou par note"
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
        >
          {TYPES.map((type) => {
            const active = selectedType === type;
            const sport = SPORTS[type];
            return (
              <Pressable
                key={type}
                onPress={() => setSelectedType(type)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {sport ? `${sport.icon} ${type}` : type}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Historique</Text>
          <Text style={styles.count}>{filteredActivities.length}</Text>
        </View>

        {filteredActivities.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🏁</Text>
            <Text style={styles.emptyTitle}>Aucune activité trouvée</Text>
            <Text style={styles.emptyText}>
              Change de filtre ou ajoute ta prochaine séance.
            </Text>
          </View>
        ) : (
          filteredActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onPress={() => onSelectActivity(activity)}
            />
          ))
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={onAddPress}>
        <Text style={styles.fabText}>+  Ajouter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 58, paddingBottom: 120 },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: { fontSize: 32, fontWeight: "900", color: colors.ink, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: colors.muted, marginTop: 2 },
  statsPill: {
    backgroundColor: colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  statsPillText: { fontWeight: "800", color: colors.ink, fontSize: 13 },

  hero: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 22,
    marginBottom: 20,
  },
  heroLabel: { color: "rgba(255,255,255,0.75)", fontSize: 15, fontWeight: "600" },
  heroNumber: {
    color: "#FFFFFF",
    fontSize: 56,
    fontWeight: "900",
    letterSpacing: -2,
    marginTop: 2,
  },
  heroRow: {
    flexDirection: "row",
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  heroStat: { flex: 1 },
  heroStatValue: { color: "#FFFFFF", fontSize: 20, fontWeight: "800" },
  heroStatLabel: { color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 2 },

  search: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.ink,
    borderWidth: 1.5,
    borderColor: colors.line,
  },

  filters: { flexGrow: 0, marginTop: 14 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: colors.surface,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  chipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { color: colors.ink, fontWeight: "700", fontSize: 14 },
  chipTextActive: { color: "#FFFFFF" },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 22, fontWeight: "900", color: colors.ink, letterSpacing: -0.5 },
  count: { fontSize: 15, color: colors.muted, fontWeight: "700" },

  emptyBox: {
    alignItems: "center",
    padding: 28,
    borderRadius: 24,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.line,
  },
  emptyEmoji: { fontSize: 36 },
  emptyTitle: { fontSize: 17, fontWeight: "800", color: colors.ink, marginTop: 8 },
  emptyText: { color: colors.muted, textAlign: "center", marginTop: 4 },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: colors.ink,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 22,
  },
  fabText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});