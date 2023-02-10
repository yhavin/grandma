import React from "react";
import { db } from "../firebase.config.js";
import { collection, addDoc } from "firebase/firestore";
import { Button, Paper, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import RecipeFormTextInput from "./RecipeFormTextInput.jsx";
import RecipeFormDropdownInput from "./RecipeFormDropdownInput.jsx";
import RecipeFormArrayInput from "./RecipeFormArrayInput.jsx";

const defaultRecipe = {
  title: "",
  mealType: "",
  ingredients: [{ name: "" }],
  steps: [{ description: "" }]
};

export const RecipeForm = () => {

  const methods = useForm({ defaultValues: defaultRecipe });
  const { handleSubmit, reset, control } = methods;

  const cleanSubmission = data => {
    const cleanedIngredients = data.ingredients.filter(ingredient => ingredient.name !== "");
    // const cleanedSteps = data.steps.filter(step => step.description !== "");
    const cleanedData = {...data, ingredients: cleanedIngredients};
    return cleanedData;
  };
  
  const collectionId = collection(db, "recipes");
  
  const onSubmit = data => {
    data = cleanSubmission(data);
    addDoc(collectionId, data);
    console.log(JSON.stringify(data, false, 2));
    reset(defaultRecipe);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Paper style={{ display: "grid", gridRowGap: "20px", padding: "20px", margin: "10px 400px"}}>
      <Typography variant="h5">New recipe</Typography>
      <RecipeFormTextInput name="title" control={control} label="Title" />
      <RecipeFormDropdownInput name="mealType" control={control} label="Meal type" />
      <RecipeFormArrayInput name="ingredients" control={control} label="Ingredients" childProp="name"/>
      {/* <RecipeFormArrayInput name="steps" control={control} label="Steps" /> */}
      <Button type="submit" variant="contained" color="primary" size="large">Submit</Button>
    </Paper>
    </form>
  );

};