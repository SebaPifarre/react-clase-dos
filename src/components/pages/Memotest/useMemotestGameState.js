import { useState } from "react";
import initialFruits from "./fruits";

const createDuplicatedFruits = () => {
  let duplicatedFruits = [];
  initialFruits.forEach(({ src, name }) => {
    duplicatedFruits.push({
      name,
      src,
      key: `${name}-1`,
    });
    duplicatedFruits.push({
      name,
      src,
      key: `${name}-2`,
    });
  });

  duplicatedFruits.sort(() => 0.5 - Math.random());
  return duplicatedFruits;
};

const useMemotestGameState = () => {
  const [fruits, setFruits] = useState(createDuplicatedFruits);
  const [flipped, setFlipped] = useState([]);
  const [wonPairs, setWonPairs] = useState([]);

  const onClickFruit = (key) => {
    if(wonPairs.includes(key.slice(0,-2))){
        return null
    }
    if (!flipped.includes(key) && flipped.length < 2) {
      setFlipped([...flipped, key]);
      const newLength = flipped.length + 1;
      if (newLength == 2) {
        const firstName = flipped[0].slice(0, -2);
        const secondName = key.slice(0, -2);
        if (firstName == secondName) {
          setWonPairs([...wonPairs, firstName]);
        }
        setTimeout(() => {
          setFlipped([]);
        }, 500);
      }
    }
  };

  return { fruits, flipped, onClickFruit, wonPairs };
};

export default useMemotestGameState;
