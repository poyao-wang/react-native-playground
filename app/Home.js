import React from "react";
import { View, StyleSheet, Button } from "react-native";

function Home({ hideShow }) {
  return (
    <View style={styles.container}>
      <Button title="Hide / Show" onPress={() => hideShow()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
