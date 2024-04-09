import Fastify from 'fastify'
import { connection } from './db/db.js'
import { ProdutoService } from './Services/produtos.service.js'
import cors from '@fastify/cors'
import { CategoriaService } from './Services/categoria.service.js'

const fastify = Fastify({
    logger: false
})
await fastify.register(cors, {})

connection()


const PORT = 5005

fastify.get('/', (request, reply) => {
    reply.send({
        "code": 200,
        "status": "UP",
        "message": "Servidor Rodando!"
    })
})
fastify.get('/produtos', ProdutoService.selectProducts)

fastify.get('/produtos/:id', ProdutoService.selectProductsporid)

fastify.get('/produtos/status/:status', ProdutoService.selecProdutoativo)

fastify.post('/produto', ProdutoService.criarProduto)

fastify.patch('/produto/:id', ProdutoService.AtualizarprodParcial)

fastify.put('/produto/:id', ProdutoService.AtualizarProduto)

fastify.delete('/produto/:id', ProdutoService.DeletarProduto)

fastify.patch('/produto/:id/:categoria', CategoriaService.adicionarcategoria)

fastify.get('/produtos/categoria/:categoria', CategoriaService.produtosporcategoria)


fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error('Erro ao subir o servdor', err)
        return;
    }
    console.log(`Server is now listening on ${address}`);
})