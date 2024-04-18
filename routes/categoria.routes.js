import { CategoriaService } from "../Services/categoria.service.js";

export const CategoriaRoutes = (fastify) => {

    fastify.patch('/produto/:id/:categoria', CategoriaService.adicionarcategoria)

    fastify.get('/produtos/categoria/:categoria', CategoriaService.produtosporcategoria)

};