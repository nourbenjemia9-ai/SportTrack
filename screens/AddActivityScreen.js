import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import { colors, SPORTS, SPORT_TYPES, isValidDate } from "../theme";

export default function AddActivityScreen({ onBack, onAdd }) {
  const [type, setType] = useState("Course");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdd = () => {
    const durationNumber = Number(duration);
    const distanceNumber = Number(distance || 0);

    if (!isValidDate(date.trim())) {
      Alert.alert(
        "Date invalide",
        "Utilise le format AAAA-MM-JJ, par exemple 2026-10-10."
      );
      return;
    }

    if (!duration.trim() || !Number.isFinite(durationNumber) || durationNumber <= 0) {
      Alert.alert("Erreur", "La durée doit être supérieure à 0.");
      return;
    }

    if (!Number.isFinite(distanceNumber) || distanceNumber < 0) {
      Alert.alert("Erreur", "La distance ne peut pas être négative.");
      return;
    }

    onAdd({
      id: Date.now().toString(),
      type,
      date: date.trim(),
      duration: durationNumber,
      distance: distanceNumber,
      notes: notes.trim(),
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable onPress={onBack} style={styles.back}>
        <Text style={styles.backText}>‹ Annuler</Text>
      </Pressable>

      <Text style={styles.title}>Nouvelle activité</Text>

      <Text style={styles.label}>Type d'activité</Text>
      <View style={styles.types}>
        {SPORT_TYPES.map((item) => {
          const sport = SPORTS[item];
          const active = type === item;
          return (
            <Pressable
              key={item}
              onPress={() => setType(item)}
              style={[
                styles.typeButton,
                active && { borderColor: sport.color, backgroundColor: sport.color + "1A" },
              ]}
            >
              <Text style={styles.typeEmoji}>{sport.icon}</Text>
              <Text style={[styles.typeText, active && styles.activeTypeText]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Date (AAAA-MM-JJ)</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="2026-10-10"
        placeholderTextColor={colors.muted}
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Durée (min)</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            keyboardType="decimal-pad"
            placeholder="30"
            placeholderTextColor={colors.muted}
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Distance (km)</Text>
          <TextInput
            style={styles.input}
            value={distance}
            onChangeText={setDistance}
            keyboardType="decimal-pad"
            placeholder="5"
            placeholderTextColor={colors.muted}
          />
        </View>
      </View>

      <Text style={styles.label}>Nom ou notes (facultatif)</Text>
      <TextInput
        style={[styles.input, styles.notes]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Ex : Footing du matin au bord de la mer"
        placeholderTextColor={colors.muted}
        multiline
      />

      <Pressable style={styles.saveButton} onPress={handleAdd}>
        <Text style={styles.saveText}>Enregistrer l'activité</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingTop: 58, paddingBottom: 40 },
  back: { marginBottom: 18 },
  backText: { color: colors.primary, fontSize: 17, fontWeight: "700" },
  title: { fontSize: 30, fontWeight: "900", color: colors.ink, letterSpacing: -1 },
  label: { fontSize: 14, fontWeight: "700", color: colors.ink, marginBottom: 8, marginTop: 18 },

  types: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  typeButton: {
    width: "31.5%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  typeEmoji: { fontSize: 24, marginBottom: 4 },
  typeText: { fontSize: 13, color: colors.muted, fontWeight: "600" },
  activeTypeText: { color: colors.ink, fontWeight: "800" },

  row: { flexDirection: "row", gap: 12 },
  half: { flex: 1 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.ink,
  },
  notes: { minHeight: 96, textAlignVertical: "top" },

  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 28,
  },
  saveText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
});