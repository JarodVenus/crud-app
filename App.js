import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import * as SQLITE from "expo-sqlite";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Article from "./components/Article";
import { ArticleContextProvider } from "./context/articleContext";

const db = SQLITE.openDatabase("demo.sqlite");

export default function App() {
  useEffect(function () {
    db.transaction(function (tx) {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT,titre VARCHAR(200),contenu TEXT,dt_creation DATETIME DEFAULT CURRENT_TIMESTAMP)`
      );
    });
  }, []);

  return (
    <ArticleContextProvider>
      <View style={styles.container}>
        <Text style={styles.title}>
          Utiliser SQLite avec React-Native (si ça fonctionne ...)
        </Text>
        <Form db={db} />
        <Article db={db} />
        <StatusBar style="auto" />
      </View>
    </ArticleContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    marginTop: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
});
