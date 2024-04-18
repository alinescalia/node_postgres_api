import Fastify from 'fastify'
import { connection } from './db/db.js'
import cors from '@fastify/cors'
import { produtosRoutes } from './routes/produtos.routes.js'
import { CategoriaRoutes } from './routes/categoria.routes.js'

const fastify = Fastify({
    logger: false
})
await fastify.register(cors, {})

connection()

produtosRoutes(fastify)

CategoriaRoutes(fastify)


const PORT = 5005
const HOST = process.env.HOST || '127.0.0.1'

fastify.get('/', (request, reply) => {
    reply.send({
        "code": 200,
        "status": "UP",
        "message": "Servidor Rodando!"
    })
})
fastify.listen({ host: HOST, port: PORT }, (err, address) => {
    if (err) {
        console.error('Erro ao subir o servdor', err)
        return;
    }
    console.log(`Server is now listening on ${address}`);
})