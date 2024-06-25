export const baseUrl = `http://localhost:3001/api/v1`;

// user Apis :-
const signUp = `${baseUrl}/user/signup`;
const signIn = `${baseUrl}/user/signin`;
const profile = `${baseUrl}/user/profile`;

// product Apis :-
const addProduct = `${baseUrl}/product/addproduct`;
const viewProduct = `${baseUrl}/product/viewproducts`;
const updateProduct = `${baseUrl}/product/updateproduct`;
const deleteProduct = `${baseUrl}/product/deleteproduct`;
const getProduct = `${baseUrl}/product/getproduct`;
const getProductList = `${baseUrl}/product/getproductlist`;

// sale apis :- 
const addSale = `${baseUrl}/sale/addsale`;
const viewSale = `${baseUrl}/sale/viewsales`;

export {
  signUp,
  signIn,
  profile,
  addProduct,
  viewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductList,
  addSale,
  viewSale
};
