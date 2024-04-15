import Fastify from 'fastify'
import { connection } from './db/db.js'
import cors from '@fastify/cors'
import { CategoriaService } from './Services/categoria.service.js'
import { produtosRoutes } from './routes/produtos.routes.js'

const fastify = Fastify({
    logger: false
})
await fastify.register(cors, {})

connection()

produtosRoutes(fastify)


const PORT = 5005

fastify.get('/', (request, reply) => {
    reply.send({
        "code": 200,
        "status": "UP",
        "message": "Servidor Rodando!"
    })
})
fastify.patch('/produto/:id/:categoria', CategoriaService.adicionarcategoria)

fastify.get('/produtos/categoria/:categoria', CategoriaService.produtosporcategoria)


fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error('Erro ao subir o servdor', err)
        return;
    }
    console.log(`Server is now listening on ${address}`);
})