import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import Timer from "./app/Timer";

const timeData = [
  {
    id: 0,
    setNo: 1,
    workoutNo: 1,
    type: "rest",
    duration: 1,
    start: 0,
    end: 1,
  },
  {
    id: 1,
    setNo: 2,
    workoutNo: 2,
    type: "workout",
    duration: 1,
    start: 1,
    end: 2,
  },
  {
    id: 2,
    setNo: 3,
    workoutNo: 3,
    type: "rest",
    duration: 1,
    start: 2,
    end: 3,
  },
];

const defaultState = {
  isActive: false,
  seconds: 0,
  sectionId: 0,
  setNo: timeData[0].setNo,
  timeMax: timeData[timeData.length - 1].end,
  type: timeData[0].type,
  workoutNo: timeData[0].workoutNo,
};

export default function App() {
  const [state, setState] = useState(defaultState);

  function setPartOfState(object) {
    const newObject = { ...state, ...object };
    setState(newObject);
  }

  function toggle() {
    // setIsActive(!isActive);
    setPartOfState({ isActive: !state.isActive });
  }

  function reset() {
    // setSeconds(0);
    // setIsActive(false);
    setPartOfState({ seconds: 0, isActive: false });
  }

  useEffect(() => {
    let interval = null;
    if (state.isActive) {
      interval = setInterval(() => {
        // setSeconds((seconds) => seconds + 1);
        setPartOfState({ seconds: state.seconds + 1 });
      }, 1000);
    } else if (!state.isActive && state.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state]);

  return (
    <View style={styles.container}>
      <Timer seconds={state.seconds} />
      <Text>{`Set : ${state.setNo}`}</Text>
      <Text>{`Workout : ${state.workoutNo}`}</Text>
      <Text>{`Type : ${state.type}`}</Text>
      <Button
        title={state.isActive ? "pause" : "play"}
        onPress={toggle}
      ></Button>
      <Button onPress={reset} title="Reset"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
