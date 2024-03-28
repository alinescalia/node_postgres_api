import { config } from "../db/config/index.js";
import { connection } from "../db/db.js";

export const ProdutoService = {

    selectProducts: async (req, res) => {
        const produtos = await config.query('SELECT * FROM produtos');
        return produtos.rows;
    },

    selectProductsporid: async (req, res) => {
        let prodid = req.params.id
        const produtos = await config.query('SELECT * FROM produtos WHERE id = $1', [prodid]);
        return produtos.rows;
    },

    criarProduto: async (req, res) => {

        // let qtdids = await config.query('SELECT COUNT (*) FROM produtos')
        // let nextid = newid + 1

        const { nome, preco, off, descricao, categoria, data_do_cadastro, ativo } = req.body

        const produtobd = [
            nome,
            preco,
            off,
            descricao,
            categoria,
            data_do_cadastro,
            ativo
        ]

        const push = await config.query('INSERT INTO public.produtos (nome, preco, off, descricao, categoria, data_do_cadastro, ativo) VALUES ($1,$2,$3,$4,$5,$6,$7)', produtobd)

        return ('produtos atualizad!')
    },

    AtualizarprodParcial: async (req, res) => {

        let prodid = req.params.id
        const produtobd = await config.query('SELECT * from public.produtos where ID=$1', [prodid])
        let prod = produtobd


        const { nome, preco, off, descricao, categoria, data_do_cadastro, ativo } = req.body


        prod.nome = nome ?? prod.nome
        prod.preco = preco ?? prod.preco
        prod.off = off ?? prod.off
        prod.descricao = descricao ?? prod.descricao
        prod.categoria = categoria ?? prod.categoria
        prod.data_do_cadastro = data_do_cadastro ?? prod.data_do_cadastro
        prod.ativo = ativo ?? prod.ativo

        prod = [
            prod.nome,
            prod.preco,
            prod.off,
            prod.descricao,
            prod.categoria,
            prod.data_do_cadastro,
            prod.ativo,
            prodid
        ]

        const push = config.query('UPDATE public.produtos SET nome = $1, preco = $2, off = $3, descricao = $4, categoria= $5, data_do_cadastro = $6, ativo = $7 WHERE id = $8', prod)



        console.log("Produto atualizado com sucesso!")
        return (prod)
    }


}




