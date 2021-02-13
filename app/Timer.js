import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

function Timer(props) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View style={styles.container}>
      <Text>{seconds}</Text>
      <Button
        title={isActive ? "active" : "inactive"}
        onPress={toggle}
      ></Button>
      <Button onPress={reset} title="Reset"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Timer;
