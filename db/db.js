import { config } from "./config/index.js"

export const connection = async (req, res) => {
    try {
        // metodo connect é o que tenta a conexao com o db
        await config.connect();
        console.log("PostgreSQL conectado com sucesso!");
    } catch (err) {
        console.log('Erro ao conectar com o banco:', err);
    }
}

