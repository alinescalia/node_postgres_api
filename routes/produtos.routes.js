
import { ProdutoService } from "../Services/produtos.service.js"

export const produtosRoutes = (fastify) => {

    fastify.get('/produtos', ProdutoService.selectProducts)

    fastify.get('/produtos/:id', ProdutoService.selectProductsporid)

    fastify.get('/produtos/status/:status', ProdutoService.selecProdutoativo)

    fastify.post('/produto', ProdutoService.criarProduto)

    fastify.patch('/produto/:id', ProdutoService.AtualizarprodParcial)

    fastify.put('/produto/:id', ProdutoService.AtualizarProduto)

    fastify.delete('/produto/:id', ProdutoService.DeletarProduto)
}