import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import styles from './Search.module.scss';
import {SearchContext} from '../../App';
import debounce from 'lodash.debounce';

export const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const {setSearchValue} = useContext(SearchContext);

  const onClickClear = () => {
    if (setSearchValue) {
      setSearchValue('');
      setValue('');
      inputRef.current?.focus();
    }
  };

  const updateSearchValue = useCallback(
    debounce(str => {
      if (setSearchValue) {
        setSearchValue(str);
      }
    }, 250),
    [],
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы"
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};
