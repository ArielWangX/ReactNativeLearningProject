import { StyleSheet, Text, View, Pressable } from "react-native";
import PropTypes from "prop-types";
import RandomNumber from "./RandomNumber";
import { useState, useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Game({ randomNumberCount, scoreRecord }) {
  const [selectedNumberIndexArr, setSelectedNumberIndexArr] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [revert, setRevert] = useState(false);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [score, setScore] = scoreRecord;

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
    let result = 0;

    console.log(selectedNumberIndexArr);
    selectedNumberIndexArr.forEach((index) => {
      result += randomNumbers[index];
    });

    if (result === target) {
      console.log("Correct");
      console.log(result);

      let currentScore = score + 1;
      setScore(currentScore);
      setIsCorrect(true);
    } else {
      console.log("Wrong");
      console.log(result);
      setIsCorrect(false);
    }
  };

  const handleRevert = () => {
    console.log("Revert the answer");
    setRevert(true);
    setIsCorrect(undefined);
    setSelectedNumberIndexArr([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreLabel}>
          <Feather name="target" size={38} color="black" />
          <Text style={styles.scoreText}> Score: </Text>
        </View>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
      <View style={styles.gameContainer}>
        <Text style={styles.target}>{target}</Text>
        <View style={styles.randomContainer}>
          {randomNumbers.map((randomNumber, index) => {
            return (
              <RandomNumber
                key={index}
                index={index}
                style={styles.random}
                number={randomNumber}
                selectedNumberIndexArray={[
                  selectedNumberIndexArr,
                  setSelectedNumberIndexArr,
                ]}
                revertGame={[revert, setRevert]}
              />
            );
          })}
        </View>
        <View style={styles.markContainer}>
          {isCorrect && <Feather name="check-circle" size={38} color="green" />}
          {!isCorrect && isCorrect !== undefined && (
            <FontAwesome5 name="times-circle" size={38} color="red" />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleRevert}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.pressedButton,
            ]}
          >
            <Text style={styles.buttonText}>Revert</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.pressedButton,
            ]}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
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
  scoreContainer: {
    flex: 0.15,
    marginTop: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  scoreLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  scoreText: {
    fontSize: 24
  },
  gameContainer: {
    flex: 1,
  },
  target: {
    marginHorizontal: 52,
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
  markContainer: {
    flex: 0.2,
    alignItems: "center",
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
  pressedButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 24,
    padding: 8,
    color: "white",
  },
});
