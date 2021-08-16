import React, { useState, useEffect, useContext } from "react";
import { Recipe, AddComment,Comments } from "../../components";
import { useParams } from "react-router-dom";
import { getComments } from "../../WebApi";
import { LoadingContext } from "../../contexts";
const RecipePage = () => {
  const [recipeChange, setRecipeChange] = useState(false);
  const [comments, setComments] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const comment = await getComments(id);
      console.log("response from comment", comment);
      setComments(comment);
      setIsLoading(false);
    };
    fetchData();
    setRecipeChange(false);
  }, [id, setIsLoading, recipeChange]);
  return (
    <div>
      <Recipe recipeChange={recipeChange} setRecipeChange={setRecipeChange} />
      <AddComment
        recipeChange={recipeChange}
        setRecipeChange={setRecipeChange}
      />
      <Comments
        recipeChange={recipeChange}
        setRecipeChange={setRecipeChange}
        comments={comments}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RecipePage;
