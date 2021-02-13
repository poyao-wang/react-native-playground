import { StyleSheet, Text } from "react-native";
import React from "react";

function Timer({ seconds }) {
  return <Text>{seconds}</Text>;
}

const styles = StyleSheet.create({
  container: {},
});

export default Timer;
