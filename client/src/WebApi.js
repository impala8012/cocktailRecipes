import {getAuthToken} from "./utils"
// const BASE_URL="http://localhost:5000"

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

/* Category */
// get all the categories
export const getCategories = () => {
  return fetch(`${BASE_URL}/categories`).then((res) => res.json())
}
// get recipe list by category id
export const getRecipeListByCategoryId = (category_id) => {
  return fetch(`${BASE_URL}/categories/${category_id}`).then(res => res.json())
}

// get recipe list by category id with pagination
export const getRecipeListByCategoryIdWithPagination = (category_id, per_page, page) => {
  return fetch(`${BASE_URL}/categories/${category_id}/?per_page=${per_page}&page=${page}`).then(
    (res) => res.json()
  );
}


/* Recipe */
// get top 9 recipes
export const getTop9Recipes = () => {
  return fetch(`${BASE_URL}/recipes/?per_page=9`).then((res) => res.json());
};

// get all recipe with 10 items per page
export const getAllRecipesPagenation = (per_page,page) => {
  // const per_page = 10;
  // const page = 1
  return fetch(`${BASE_URL}/recipes/?per_page=${per_page}&page=${page}`).then(res => res.json());
}

// get all recipe with 10 items per page
export const getAllRecipes = () => {
  return fetch(`${BASE_URL}/recipes/`).then(res => res.json());
}

// get a recipe
export const getRecipe = (recipe_id) => {
  return fetch(`${BASE_URL}/recipes/${recipe_id}`).then((res) =>
    res.json()
  );
};

// GET recipes from a user
export const getUserRecipes = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/recipes/user-recipes`, {
    method: "GET",
    headers: { token: token },
  }).then((res) => res.json());
}

// CREATE a recipe
export const createRecipe = (formData,token) => {
  return fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers:{token:token},
    body: formData,
  });
};

// Update a recipe
export const updateRecipe = (recipe_id,formData) => {
  const token = getAuthToken()
  return fetch(`${BASE_URL}/recipes/${recipe_id}`, {
    method: "PUT",
    headers:{token: token},
    body: formData,
  });
};

// DELETE a recipe
export const deleteRecipe = (recipe_id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/recipes/${recipe_id}`, {
    method: "DELETE",
    headers: { token: token },
  });
};

/* Comments */
// GET comment by recipeID
export const getComments = (recipe_id) => {
  return fetch(`${BASE_URL}/recipes/${recipe_id}/comments`,{
  }).then((res) =>
    res.json()
  );
};

// CREATE a comment
export const createComment = (recipe_id, description, rating) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/recipes/${recipe_id}/comments`, {
    method: "POST",
    headers: { "content-type": "application/json", token: token },
    body: JSON.stringify({
      description,
      rating,
    }),
  }).then((res) => res.json());
};

// Update a comment
export const updatedComment = (recipe_id, description, rating, comment_id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/recipes/${recipe_id}/comments${comment_id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      description,
      rating,
    }),
  }).then((res) => res.json());
}

export const unsplashFoto = () => {
  return fetch(`https://api.unsplash.com/users/silverlining_dyl/likes`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
    },
  }).then((res) => res.json());
}
;

/* User */
// Register
export const register = (body) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// login
export const login = (body) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  });
}

// verify
export const Authentication = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/auth/verify`, {
    method: "POST",
    headers: { token: token },
  });
};