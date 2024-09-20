import { handleSignIn, handleSignUp, handleSubmitContactMail } from "./submit";
import { getTopPriorityCategories } from "./categories";
import { addProductToCart, removeProductFromCart } from "./cart";
import { addProductToWishlist, removeProductFromWishlist } from "./wishlist";
import { getCategories, addNewCategory } from "./categories";
import { getProductSuggestions } from "./product";

export {
  getTopPriorityCategories,
  getCategories,
  addProductToCart,
  removeProductFromCart,
  addProductToWishlist,
  removeProductFromWishlist,
  getProductSuggestions,
  addNewCategory,
};
