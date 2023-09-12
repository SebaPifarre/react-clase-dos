import React from "react";
import cx from "classnames";
import "./MemoTest.css";
import fridge from "./imagenes/fridge.jpg";
import useMemotestGameState from "./useMemotestGameState";

const Fruit = ({ src, name, flipped, onClick }) => {
  return (
    <div onClick={onClick} className="memotest-img-wrapper">
      <img
        className={cx("memotest-img", { "memotest-img--flipped": flipped })}
        src={flipped ? src : fridge}
        alt={name}
      />
    </div>
  );
};

const MemoTest = () => {
  const { fruits, flipped, onClickFruit, wonPairs } = useMemotestGameState();

  return (
    <div className="memotest-grid">
      {fruits.map(({ key, name, src }) => (
        <>
          <Fruit
            key={key}
            name={name}
            src={src}
            onClick={() => onClickFruit(key)}
            flipped={wonPairs.includes(name) || flipped.includes(key)}
          />
        </>
      ))}
    </div>
  );
};

export default MemoTest;
