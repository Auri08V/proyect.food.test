const { Router } = require("express");
const { getAllRecipes } = require("../Controllers/getRecipes");
const router = Router();

//Ruta para encontrar recetas por nombres
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let recipesTotal = await getAllRecipes();
    if (name) {
      let recipesName = recipesTotal.filter((recipe) =>
        recipe.name.toLowerCase().includes(name.toLowerCase())
      );
      recipesName.length
        ? res.status(200).send(recipesName)
        : res.status(404).send("No se encontró ninguna receta con ese nombre");
    } else {
      res.status(200).send(recipesTotal); // Enviar todas las recetas sin filtrar
    }
  } catch (error) {
    console.error("Ha ocurrido un error: ", error);
    res.status(500).send("Error al obtener las recetas");
  }
});

//Ruta para encontrar recetas por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let recipesTotal = await getAllRecipes();
    let recipesId = recipesTotal.filter((recipe) => recipe.id === id);
    recipesId.length
      ? res.status(200).send(recipesId)
      : res.status(404).send("No se encontró ninguna receta con ese ID");
  } catch (error) {
    console.error("Ha ocurrido un error: ", error);
    res.status(500).send("Error al obtener las recetas");
  }
});

module.exports = router;
