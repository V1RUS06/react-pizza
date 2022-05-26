import React, { FC } from "react";

interface Props {
  onCategoriesClick: (index: number) => void;
  value: number;
}

export const Categories: FC<Props> = ({ onCategoriesClick, value }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onCategoriesClick(index)}
            className={value === index ? "active" : ""}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
