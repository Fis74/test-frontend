export type Result = {
  result: string[];
};

export type ResultPrice = {
  result: number[];
};
export type ResultFields = {
  result: (string | null)[];
};

export type ResultItems = {
  result: Items[];
};

export type Items = {
  brand: string;
  id: string;
  price: number;
  product: string;
};

export enum Action {
  get_items = "get_items",
  filter = "filter",
  get_ids = "get_ids",
  get_fields = "get_fields",
}

export enum Field {
  brand = "brand",
  price = "price",
  product = "product",
}

export type Params = {
  offset?: number;
  limit?: number;
  ids?: string[];
  brand?: string | null;
  price?: number;
  product?: string;
  field?: Field;
};

export type Data = {
  action: Action;
  params: Params;
};
