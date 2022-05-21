import React, { useState } from "react";

export const Categories = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onCategoriesClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            onClick={() => onCategoriesClick(index)}
            className={activeIndex === index ? "active" : ""}
            key={Math.random() * 1000}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
