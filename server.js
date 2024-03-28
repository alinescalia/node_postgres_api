import Fastify from 'fastify'
import { connection } from './db/db.js'
import { ProdutoService } from './Services/produtos.service.js'


const fastify = Fastify({
    logger: true
})

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

fastify.post('/produto', ProdutoService.criarProduto)

fastify.patch('/produto/:id', ProdutoService.AtualizarprodParcial)


fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error('Erro ao subir o servdor', err)
        return;
    }
    console.log(`Server is now listening on ${address}`);
})