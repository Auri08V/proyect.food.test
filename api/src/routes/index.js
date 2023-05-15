const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getRecipesRouter = require ("./getRecipesRoute")


const router = Router();
//Ruta para traer recetas por ID y por nombre
router.use("/recipes",getRecipesRouter)





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
