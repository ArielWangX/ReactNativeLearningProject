import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import RandomNumber from "./RandomNumber";
import { useState, useMemo } from "react";

export default function Game({ randomNumberCount }) {
  const [selectedNumberIndexArr, setSelectedNumberIndexArr] = useState([]);
  const [submit, setSubmit] = useState(false);

  // Memoize the randomNumbers and target
  const { randomNumbers, target } = useMemo(() => {
    const randomNumbers = Array.from({ length: randomNumberCount }).map(
      () => 1 + Math.floor(10 * Math.random())
    );

    const target = randomNumbers
      .slice(0, parseInt(randomNumberCount, 10) - 2)
      .reduce((acc, curr) => acc + curr, 0);
    // TODO: shuffle the random number

    return {
      randomNumbers: randomNumbers,
      target: target,
    };
  }, [submit]);

  const handleSubmit = () => {
    console.log("Submit the answer");
  };

  const handleRevert = () => {
    console.log("Revert the answer");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) => {
          return (
            <RandomNumber
              key={index}
              style={styles.random}
              number={randomNumber}
              selectedNumberIndexArray={[
                selectedNumberIndexArr,
                setSelectedNumberIndexArr,
              ]}
            />
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRevert} style={styles.button}>
          <Text style={styles.buttonText}>Revert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Game.prototype = {
  randomNumberCount: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    flex: 1,
    paddingTop: 40,
  },
  target: {
    marginHorizontal: 52,
    marginTop: 40,
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "orange",
  },
  randomContainer: {
    marginTop: 60,
    marginHorizontal: 32,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  random: {
    fontSize: 36,
    textAlign: "center",
    backgroundColor: "#aaa",
    width: 100,
    marginHorizontal: 32,
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "blue",
  },
  buttonText: {
    fontSize: 24,
    padding: 8,
    color: "white"
  }
});
