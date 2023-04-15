import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ArticleContext } from "../context/articleContext";

const Form = ({ db }) => {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [shown, setShown] = useState(true);
  const [update, setUpdate] = useState(false);

  const { articleModif, viderArticle } = useContext(ArticleContext);

  useEffect(
    function () {
      setTitre(articleModif.titre);
      setContenu(articleModif.contenu);
      setUpdate(true);
    },
    [articleModif]
  );

  function add() {
    db.transaction(function (tx) {
      tx.executeSql(
        `INSERT INTO articles ( titre , contenu ) VALUES ( ? , ?);`,
        [titre, contenu],
        function (transact, resultat) {
          console.log("Insert réussi");
          setTitre("");
          setContenu("");
        },
        function (transact, err) {
          console.log("Echec", err);
        }
      );
    });
  }

  function modif() {
    db.transaction(function (tx) {
      tx.executeSql(
        `UPDATE articles SET titre = ? , contenu = ? WHERE  ID = ?;`,
        [titre, contenu, articleModif.id],
        function (transact, resultat) {
          console.log("Modification réussie")
          setTitre("");
          setContenu("")
        //   viderArticle()
          setUpdate(false)
        },
        function (transact, err) {
          console.log("ECHEC modification");
        }
      );
    });
  }

  function annuler() {
    setTitre("");
    setContenu("");
    // viderArticle();
    setUpdate(false);
  }

  return (
    <View style={styles.container}>
      {shown || update ? (
        <View style={styles.container}>
          <Text style={styles.title}>Formulaire</Text>
          <Text>Titre :</Text>
          <TextInput
            style={styles.input}
            placeholder="Titre"
            onChangeText={(texte) => setTitre(texte)}
            value={titre}
          />
          <Text>Contenu :</Text>
          <TextInput
            style={styles.input}
            placeholder="Contenu"
            multiline={true}
            numberOfLines={5}
            onChangeText={(texte) => setContenu(texte)}
            value={contenu}
          />
          {update ? (
            <View style={styles.btn}>
              <Button title="Modifier" onPress={() => modif()} />
              <Button title="annuler" onPress={() => annuler()} />
            </View>
          ) : (
            <View style={styles.btn}>
              <Button title="Soumettre" onPress={() => add()} />
              <Button title="Diminuer" onPress={() => setShown(!shown)} />
            </View>
          )}
        </View>
      ) : (
        <View>
          <Button
            title="Agrandir"
            onPress={() => {
              setShown(!shown);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    borderBottomWidth: 1,
    padding: 20,
  },
  title: {
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
  },
  btn: {
    width: 300,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
