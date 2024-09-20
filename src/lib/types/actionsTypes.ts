export type GetProductsConfigType = {
  categories?: string[];
  name?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minRating?: number | null;
  maxRating?: number | null;
  minRatingCount?: number | null;
  maxRatingCount?: number | null;
  page?: number;
};
