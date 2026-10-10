import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ActivitiesScreen from "./screens/ActivitiesScreen";
import ActivityDetailScreen from "./screens/ActivityDetailScreen";
import AddActivityScreen from "./screens/AddActivityScreen";
import StatisticsScreen from "./screens/StatisticsScreen";

import initialActivities from "./data/activities";

const STORAGE_KEY = "@sporttrack_activities_v2";

export default function App() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les activités sauvegardées
  useEffect(() => {
    const loadActivities = async () => {
      try {
        const savedActivities = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedActivities !== null) {
          setActivities(JSON.parse(savedActivities));
        } else {
          setActivities(initialActivities);
        }
      } catch (error) {
        console.error("Erreur de chargement :", error);
        setActivities(initialActivities);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  // Sauvegarder les activités automatiquement
  useEffect(() => {
    if (isLoading) return;

    const saveActivities = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(activities)
        );
      } catch (error) {
        console.error("Erreur de sauvegarde :", error);
      }
    };

    saveActivities();
  }, [activities, isLoading]);

  // Ajouter une activité
  const addActivity = (newActivity) => {
    setActivities((previousActivities) => [
      newActivity,
      ...previousActivities,
    ]);

    setIsAdding(false);
  };

  // Modifier une activité
  const updateActivity = (updatedActivity) => {
    setActivities((previousActivities) =>
      previousActivities.map((activity) =>
        activity.id === updatedActivity.id
          ? updatedActivity
          : activity
      )
    );

    setSelectedActivity(updatedActivity);
  };

  // Supprimer une activité
  const deleteActivity = (activityId) => {
    setActivities((previousActivities) =>
      previousActivities.filter(
        (activity) => activity.id !== activityId
      )
    );

    setSelectedActivity(null);
  };

  // Écran de chargement
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Écran de détail
  if (selectedActivity !== null) {
    return (
      <ActivityDetailScreen
        activity={selectedActivity}
        onBack={() => setSelectedActivity(null)}
        onUpdate={updateActivity}
        onDelete={deleteActivity}
      />
    );
  }

  // Écran d'ajout
  if (isAdding) {
    return (
      <AddActivityScreen
        onBack={() => setIsAdding(false)}
        onAdd={addActivity}
      />
    );
  }

  // Écran des statistiques
  if (showStatistics) {
    return (
      <StatisticsScreen
        activities={activities}
        onBack={() => setShowStatistics(false)}
      />
    );
  }

  // Écran principal : historique et recherche
  return (
    <ActivitiesScreen
      activities={activities}
      onSelectActivity={setSelectedActivity}
      onAddPress={() => setIsAdding(true)}
      onStatisticsPress={() => setShowStatistics(true)}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});