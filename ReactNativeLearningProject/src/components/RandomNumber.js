import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const RandomNumber = ({ index, style, number, selectedNumberIndexArray, revertGame }) => {
  const [selectedNumberIndexArr, setSelectedNumberIndexArr] =
    selectedNumberIndexArray;

  const [isSelected, setIsSelected] = useState(false);
  const [revert, setRevert] = revertGame;

  useEffect(() => {
    if (revert === true) {
      setIsSelected(false);
      setRevert(false);
    }
  }, [revert])

  const handlePress = () => {
    console.log("Press");
    let numberSelected = !isSelected;
    setIsSelected(numberSelected);
    console.log(numberSelected);

    let newArr = [...selectedNumberIndexArr];
    if (!numberSelected) {
      console.log("Remove index")
      newArr = newArr.filter((value) => value !== index);
    } else {
      console.log("Add index")
      newArr = [...selectedNumberIndexArr, index];
    }
    setSelectedNumberIndexArr(newArr);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[style, isSelected && styles.selected]}>{number}</Text>
    </TouchableOpacity>
  );
};

RandomNumber.prototype = {
  style: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  isSelected: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  selected: {
    opacity: 0.3,
  },
});

export default RandomNumber;
