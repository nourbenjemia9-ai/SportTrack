import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import SportIcon from "../components/SportIcon";
import {
  colors,
  SPORTS,
  SPORT_TYPES,
  formatDuration,
  isValidDate,
  displayName,
} from "../theme";

// Field est défini en dehors de l'écran : sinon le clavier se ferme
// à chaque lettre tapée (le composant est recréé à chaque rendu).
function Field({ label, value, onChangeText, keyboardType, multiline }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
        multiline={multiline}
      />
    </View>
  );
}

function Tile({ label, value }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

export default function ActivityDetailScreen({
  activity,
  onBack,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [type, setType] = useState(activity.type);
  const [date, setDate] = useState(activity.date);
  const [duration, setDuration] = useState(String(activity.duration));
  const [distance, setDistance] = useState(String(activity.distance));
  const [notes, setNotes] = useState(activity.notes || "");

  function saveChanges() {
    if (!date.trim() || !duration.trim() || !distance.trim()) {
      Alert.alert("Erreur", "Remplis la date, la durée et la distance.");
      return;
    }

    if (!isValidDate(date.trim())) {
      Alert.alert(
        "Date invalide",
        "Utilise le format AAAA-MM-JJ, par exemple 2026-10-10."
      );
      return;
    }

    if (
      !Number.isFinite(Number(duration)) ||
      !Number.isFinite(Number(distance)) ||
      Number(duration) <= 0 ||
      Number(distance) < 0
    ) {
      Alert.alert(
        "Erreur",
        "La durée doit être positive et la distance ne peut pas être négative."
      );
      return;
    }

    onUpdate({
      ...activity,
      type,
      date: date.trim(),
      duration: Number(duration),
      distance: Number(distance),
      notes: notes.trim(),
    });

    setEditing(false);
    Alert.alert("Succès", "Activité modifiée avec succès.");
  }

  function confirmDelete() {
    Alert.alert(
      "Supprimer l'activité",
      "Veux-tu vraiment supprimer cette activité ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => onDelete(activity.id),
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>‹ Mes activités</Text>
      </Pressable>

      {editing ? (
        <>
          <Text style={styles.heading}>Modifier l'activité</Text>

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
                  <Text style={[styles.typeText, active && styles.typeTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Field label="Date (AAAA-MM-JJ)" value={date} onChangeText={setDate} />
          <Field
            label="Durée (minutes)"
            value={duration}
            onChangeText={setDuration}
            keyboardType="decimal-pad"
          />
          <Field
            label="Distance (km)"
            value={distance}
            onChangeText={setDistance}
            keyboardType="decimal-pad"
          />
          <Field label="Nom ou notes" value={notes} onChangeText={setNotes} multiline />

          <Pressable style={styles.primaryButton} onPress={saveChanges}>
            <Text style={styles.primaryText}>Enregistrer les modifications</Text>
          </Pressable>
          <Pressable style={styles.ghostButton} onPress={() => setEditing(false)}>
            <Text style={styles.ghostText}>Annuler</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.titleRow}>
            <SportIcon type={activity.type} size={68} />
            <View style={styles.titleText}>
              <Text style={styles.name} numberOfLines={2}>
                {displayName(activity)}
              </Text>
              <Text
                style={[
                  styles.typeLabel,
                  { color: (SPORTS[activity.type] || {}).color || colors.primary },
                ]}
              >
                {activity.type}
              </Text>
              <Text style={styles.date}>{activity.date}</Text>
            </View>
          </View>

          <View style={styles.tiles}>
            <Tile label="Durée" value={formatDuration(activity.duration)} />
            <Tile label="Distance" value={`${activity.distance} km`} />
          </View>

          <View style={styles.notesBox}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Text style={styles.notesText}>
              {activity.notes || "Aucune note pour cette séance."}
            </Text>
          </View>

          <Pressable style={styles.primaryButton} onPress={() => setEditing(true)}>
            <Text style={styles.primaryText}>Modifier l'activité</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={styles.deleteText}>Supprimer l'activité</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingTop: 58, paddingBottom: 40 },
  backButton: { marginBottom: 20 },
  backText: { color: colors.primary, fontSize: 17, fontWeight: "700" },

  heading: { fontSize: 30, fontWeight: "900", color: colors.ink, letterSpacing: -1 },
  label: { fontSize: 14, fontWeight: "700", color: colors.ink, marginTop: 18, marginBottom: 8 },

  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 22 },
  titleText: { marginLeft: 16, flex: 1 },
  name: { fontSize: 24, fontWeight: "900", color: colors.ink, letterSpacing: -0.5 },
  typeLabel: { fontSize: 14, fontWeight: "800", marginTop: 2 },
  date: { color: colors.muted, fontSize: 15, marginTop: 2 },

  tiles: { flexDirection: "row", gap: 10 },
  tile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.line,
  },
  tileValue: { fontSize: 24, fontWeight: "900", color: colors.ink },
  tileLabel: { fontSize: 13, color: colors.muted, marginTop: 4 },

  notesBox: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  notesTitle: { fontSize: 14, fontWeight: "700", color: colors.muted, marginBottom: 6 },
  notesText: { fontSize: 16, color: colors.ink, lineHeight: 23 },

  field: { marginTop: 0 },
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
  multiline: { minHeight: 96, textAlignVertical: "top" },

  types: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 4 },
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
  typeTextActive: { color: colors.ink, fontWeight: "800" },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 24,
  },
  primaryText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  ghostButton: { padding: 14, alignItems: "center", marginTop: 6 },
  ghostText: { color: colors.muted, fontWeight: "600", fontSize: 16 },
  deleteButton: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: colors.danger,
  },
  deleteText: { color: colors.danger, fontWeight: "800", fontSize: 16 },
});