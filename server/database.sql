CREATE DATABASE cocktailrecipes;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL UNIQUE,
  category_desc VARCHAR(255) NOT NULL,
  created_at timestamp without time zone default current_timestamp  
);

CREATE TABLE recipes(
  recipe_id SERIAL PRIMARY KEY,
  recipe_title VARCHAR(50) NOT NULL,
  recipe_ingredient  VARCHAR(255) NOT NULL,
  recipe_content TEXT NOT NULL,
  recipe_image_url VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dehd751pl/image/upload/v1629553823/recipe/gin_mule_kox1yh.jpg',
  created_at timestamp without time zone default current_timestamp,
  category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE;
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE;
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  comment_description VARCHAR(255) NOT NULL,
  comment_rating INT NOT NULL check(
    comment_rating >= 1 and comment_rating <= 5
  ),
  created_at timestamp without time zone default current_timestamp,
  recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE;
);

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  created_at timestamp without time zone default current_timestamp
);

CREATE TABLE recipe_images(
  recipe_image_id SERIAL PRIMARY KEY,
  image_url  VARCHAR(255),
  created_at timestamp without time zone default current_timestamp,
  recipe_id INTEGER REFERENCES recipes(recipe_id)
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


-- update
-- WITH recipes AS (
--         UPDATE recipes 
--         SET title = 'test', ingredient = 'tets', content = 'test',category_id = 1
--         WHERE recipe_id = 7
-- )
-- UPDATE recipe_images 
-- SET image1_url = '1.jpg', image2_url = '2.jpg'
-- WHERE recipe_id = 7
-- RETURNING *;

INSERT INTO categories (category, category_desc) VALUES ('Gin','以穀物為原料經發酵與蒸餾製造出的中性烈酒基底，增添以杜松子為主的多種藥材與香料調味後，所製造出來的一種西洋蒸餾酒');
INSERT INTO categories (category, category_desc) VALUES ('Rum','帶有醇厚的甜膩果香或甘蔗焦香，非常適合調製具有熱帶風情的水果類調酒，由甘蔗副產品（如糖蜜）或甘蔗汁，透過發酵和蒸餾過程製成的一種蒸餾酒');
INSERT INTO categories (category, category_desc) VALUES ('Vodka','「無色、無味、無香」，只有淡淡的酒精味，適合搭配色澤、風味強烈的材料，是「最純粹的基酒經蒸餾處理的酒精飲料。由水和經蒸餾淨化的乙醇所合成，通常會經多重蒸餾達到更純更美味的效果');
INSERT INTO categories (category, category_desc) VALUES ('Whisky','口感獨特鮮明，容易與其他副材料衝突，因此以威士忌為基酒的調酒並不多，主要以純飲為主。以發酵穀物製成的蒸餾酒精飲料。 不同種類的穀物能夠製成不同種類的威士忌');
INSERT INTO categories (category, category_desc) VALUES ('Tequila','龍舌蘭是原產自墨西哥的植物，莖部富含水分及糖分，故被用來發酵釀酒，也因為它獨特的植物香氣，適合調配成口感濃厚的調酒，或以「shot」的方式飲用');
INSERT INTO categories (category, category_desc) VALUES ('Brandy','以水果酒為基底，加以蒸餾製成的酒，酒液帶有甜甜的水果香氣，又被稱為「葡萄酒的靈魂」，本是無色，在橡木桶貯藏過程中會逐漸浸染成褐色');


ALTER TABLE comments DROP CONSTRAINT (recipe_id);
ALTER TABLE comments ADD CONSTRAINT recipe_id FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE;;
