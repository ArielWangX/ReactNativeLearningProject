import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const RandomNumber = ({ key, style, number, selectedNumberIndexArray }) => {
  const [selectedNumberIndexArr, setSelectedNumberIndexArr] =
    selectedNumberIndexArray;

  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    console.log("Press");
    setIsSelected(!isSelected);

    let newArr = [...selectedNumberIndexArr];
    if (selectedNumberIndexArr.includes(key)) {
      newArr = newArr.filter((value) => value !== key);
    } else {
      newArr = [...selectedNumberIndexArr, key];
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
