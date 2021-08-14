const BASE_URL="http://localhost:5000"

/* Category */
// get all the categories
export const getCategories = () => {
  return fetch(`${BASE_URL}/categories`).then((res) => res.json())
}
// get recipe list by category id
export const getRecipeListByCategoryId = (category_id) => {
  return fetch(`${BASE_URL}/categories/${category_id}`).then(res => res.json())
}

/* Recipe */
// get top 10 recipes
export const getTop10Recipes = () => {
  return fetch(`${BASE_URL}/recipes/?per_page=10`).then(res=>res.json())
}

// get all recipe with 10 items per page
export const getAllRecipes = () => {
  const per_page = 10;
  const page = 1
  return fetch(`${BASE_URL}/recipes/?per_page=${per_page}&page=${page}`).then(res => res.json());
}

// get a recipe
export const getRecipe = (recipe_id) => {
  return fetch(`${BASE_URL}/recipes/${recipe_id}`)
}

// CREATE a recipe
export const createRecipe = (formData) => {
  return fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    body: formData,
  });
};

// Update a recipe
export const updateRecipe = (recipe_id, title, ingredient, content, img) => {
  return fetch(`${BASE_URL}/recipes/${recipe_id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      ingredient,
      content,
      img,
    }),
  }).then((res) => res.json());
};

// DELETE a recipe
export const deleteRecipe = (recipe_id) => {
  return fetch(`${BASE_URL}/recipes/${recipe_id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json());
};

/* Comments */
// CREATE a comment
export const createComment = (recipe_id, description, rating) => {
  return fetch(`${BASE_URL}/recipes/${recipe_id}/comments`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      description,
      rating,
    }),
  }).then(res=>res.json())
};

// Update a comment
export const updatedComment = (recipe_id, description, rating, comment_id) => {
  return fetch(`${BASE_URL}/recipes/${recipe_id}/comments${comment_id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      description,
      rating,
    }),
  }).then(res => res.json())
}