// Core product interface
export interface Product {
  id: string;
  name: string;
  slug: string;
  priceInCents: number;
  image: string;
  rating: number;
  ratingCount: number;
  discount?: {
    type: "fixed" | "percentage";
    value: number;
  };
}

// Extended product interface for UI components
export interface ProductWithStatus extends Product {
  isWishlisted: boolean;
  isInCart: boolean;
}

// Price component props
export interface PriceProps {
  priceInCents: number;
  variant?: "default" | "crossed" | "sale";
  className?: string;
}

// Rating component props
export interface RatingProps {
  rating: number;
  count: number;
  maxRating?: number;
}

// Category interface
export interface Category {
  slug: string;
  name: string;
}

// Sale interface
export interface Sale {
  label: string;
  endDate: Date;
}

// Product section props
export interface ProductSectionProps {
  products: ProductWithStatus[];
  category: Category;
  sale?: Sale;
  hrefLabel?: string;
}

// Toggle button props
export interface ToggleItemStatusButtonProps {
  isActive: boolean;
  type: "cart" | "wishlist";
  productId: string;
  productName: string;
}

// Countdown component props
export interface CountdownProps {
  endDateTime: Date;
  renderer: (props: CountdownRendererProps) => React.ReactNode;
}

export interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export interface TimeUnitProps {
  value: string;
  label: string;
}
