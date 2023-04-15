import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ArticleContext } from "../context/articleContext";

const Article = ({ db }) => {
  const [articles, setArticles] = useState([]);
  const { modifier } = useContext(ArticleContext);

  useEffect(
    function () {
      db.transaction(function (tx) {
        tx.executeSql(
          `SELECT id , titre , contenu , strftime('%d/%m/%Y' , dt_creation ) AS date FROM articles ;`,
          [],
          function (transact, resultat) {
            setArticles(resultat.rows._array);
          },
          function (transact, err) {
            console.log("Echec lors du select", err);
          }
        );
      });
    },
    [articles]
  );

  function supprimer(id) {
    db.transaction(function (tx) {
      tx.executeSql(
        `DELETE FROM articles WHERE id = ? `,
        [id],
        function (transact, resultat) {
          console.log("DELETE success");
        },
        function (transact, err) {
          console.log("DELETE échec", err);
        }
      );
    });
  }

  return (
    <ScrollView>
      <View style={styles.box}>
        <Text>Liste des articles en base de données</Text>
        {articles.map(function (article, index) {
          return (
            <View style={styles.box2} key={article.id}>
              <Text style={styles.title2}>{article.titre}</Text>
              <Text>{article.date}</Text>
              <Text style={styles.art}>{article.contenu}</Text>
              <View style={styles.btn}>
                <Button
                  title="Modifier"
                  onPress={() => {
                    modifier(article);
                  }}
                />
                <Button
                  title="Supprimer"
                  onPress={() => {
                    supprimer(article.id);
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Article;

const styles = StyleSheet.create({
  box: {
    padding: 10,
    alignSelf: "center",
    width: "90%",
  },
  title2: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopWidth: 1,
    paddingVertical: 5,
    borderColor: "blue",
  },
  art: {
    textAlign: "center",
    marginVertical: 10,
  },
  box2: {
    borderWidth: 1,
    marginVertical: 5,
    // padding : 10,
    borderColor: "blue",
    borderRadius : 5
  },
});
