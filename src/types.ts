export interface PizzaBlockTypes {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export interface SortTypes {
  name: string;
  sortProperty: string;
}

export interface SearchContextTypes {
  searchValue?: string;
  setSearchValue?: (value: string) => void;
}
