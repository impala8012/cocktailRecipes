CREATE DATABASE cocktailRecipes;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL UNIQUE,
  created_at timestamp without time zone default current_timestamp  
);

CREATE TABLE recipes(
  recipe_id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  ingredient  VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at timestamp without time zone default current_timestamp,
  category_id INTEGER REFERENCES categories(category_id)
);

CREATE TABLE recipe_images(
  recipe_photo_id SERIAL PRIMARY KEY,
  image1_url  VARCHAR(255),
  image2_url  VARCHAR(255),
  created_at timestamp without time zone default current_timestamp,
  recipe_id INTEGER REFERENCES recipes(recipe_id)
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  rating INT NOT NULL check(
    rating >= 1 and rating <= 5
  ),
  recipe_id INTEGER REFERENCES recipes(recipe_id)
);



CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

-- for adding with foreign key
WITH categories AS (
        INSERT INTO categories (title)
        VALUES ('abc')
        RETURNING category_id
)
INSERT INTO recipes (category_id, title, ingredient, description, pic_url)
SELECT category_id, 'def', 'efg', 'ghi','jkl.jpg' 
FROM categories
RETURNING *;


WITH recipes AS (
        INSERT INTO recipes (title, ingredient, description, category_id)
        VALUES ($1,$2,$3,$4)
        RETURNING recipe_id
)
INSERT INTO recipe_images (recipe_id, image1_url,image2_url)
SELECT recipe_id, $5,$6
FROM recipes
RETURNING *;

select *
from restaurants
    left join(
        select restaurant_id,
            count(*),
            TRUNC(AVG(rating, 1)) as average_rating
        from reviews
        group by restaurant_id
    ) reviews on restaurants.id = reviews.restaurant_id;