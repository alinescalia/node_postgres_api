import { config } from "../db/config/index.js";
import { connection } from "../db/db.js";

export const ProdutoService = {

    selectProducts: async (req, res) => {
        const produtos = await config.query('SELECT * FROM produtos ORDER by id ASC');
        return produtos.rows;
    },

    selectProductsporid: async (req, res) => {
        let prodid = req.params.id
        const produtos = await config.query('SELECT * FROM produtos WHERE id = $1', [prodid]);

        if
            (!produtos.rowCount) {

            res.status(404).send("Produto não encontrado!")

            return;
        }

        return produtos.rows[0];
    },

    selecProdutoativo: async (req, res) => {

        JSON.stringify()
        let statusdoprod = req.params.status == 'true' ? true : false // para transformar a string em boolean 

        const query = `SELECT * from public.produtos where ativo is ${statusdoprod}` // o ${} para trazer qualquer valor de variavel

        console.log(query)
        //SELECIONAR PRODUTO POR STATUS

        const produtos = await config.query(query)

        return (produtos.rows)

    },

    criarProduto: async (req, res) => {

        //criar produto em um id q foi apagado!!!!

        const idexist = await config.query('SELECT id from public.produtos order by id');

        const arrayid = idexist.rows.map(({ id }) => id);
        console.log(arrayid)

        const arrayunico = arrayid;

        function encontraridemfalta(numeros) {

            for (let i = 0; i < numeros.length - 1; i++) {
                if (numeros[i + 1] - numeros[i] > 1) {
                    const idmiss = numeros[i] + 1;
                    return (idmiss)
                };
            };
            return undefined
        };

        // [
        //     1,  2,  3,  5,  6,  7,  8,  9, 10,
        //    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        //    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        //    31, 32, 33, 34, 35, 36, 37, 38, 39
        //  ].find((n, idx, arr) => n + 1 !== arr[idx + 1])

        let idmiss = encontraridemfalta(arrayunico)



        if (!idmiss) {
            let qtdids = await config.query('SELECT COUNT (*) FROM produtos')
            const arrayqtdid = qtdids.rows.map(id => Object.values(id));
            const arrayqtdun = parseInt([].concat.apply([], arrayqtdid));


            let nextid = arrayqtdun + 1


            const { nome, preco, off, descricao, categoria, data_do_cadastro, ativo } = req.body

            const produtobd = [
                nextid,
                nome,
                preco,
                off,
                descricao,
                categoria,
                data_do_cadastro,
                ativo
            ]

            try {
                // o returning dentro das aspas volta o valor adicionado o * volta todo pode ser por id entre outros!

                const push = await config.query('INSERT into public.produtos (id, nome, preco, off, descricao, categoria, data_do_cadastro, ativo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', produtobd)
                res.send(push.rows[0], 'Novo produto criado!')
            }
            catch {
                console.log(arrayqtdun)
                res.status(500).send('Erro ao criar produto')
            }
        }
        else {
            const { nome, preco, off, descricao, categoria, data_do_cadastro, ativo } = req.body

            const VALUESBD = [idmiss, nome, preco, off, descricao, categoria, data_do_cadastro, ativo]


            try {
                console.log(VALUESBD)
                const push = await config.query('INSERT into public.produtos (id, nome, preco, off, descricao, categoria, data_do_cadastro, ativo) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', VALUESBD)
                res.send(push.rows[0], 'Novo produto criado!')
            }

            catch {
                res.status(500).send('Erro ao criar produto')
            }


        }
    },

    AtualizarprodParcial: async (req, res) => {

        let prodid = req.params.id
        const produtobd = await config.query('SELECT nome, preco, off, descricao, categoria, data_do_cadastro, ativo FROM produtos WHERE id = $1', [prodid]);

        if
            (!produtobd.rowCount) {

            res.status(404).send("Produto não encontrado!")

            return;
        }

        const { nome, preco, off, descricao, categoria, data_do_cadastro, ativo } = req.body


        const arrayDeValores = produtobd.rows[0];


        arrayDeValores.nome = nome ?? arrayDeValores.nome
        arrayDeValores.preco = preco ?? arrayDeValores.preco
        arrayDeValores.off = off ?? arrayDeValores.off
        arrayDeValores.descricao = descricao ?? arrayDeValores.descricao
        arrayDeValores.categoria = categoria ?? arrayDeValores.categoria
        arrayDeValores.data_do_cadastro = data_do_cadastro ?? arrayDeValores.data_do_cadastro
        arrayDeValores.ativo = ativo ?? arrayDeValores.ativo

        let values = [
            arrayDeValores.nome,
            arrayDeValores.preco,
            arrayDeValores.off,
            arrayDeValores.descricao,
            arrayDeValores.categoria,
            arrayDeValores.data_do_cadastro,
            arrayDeValores.ativo,
            prodid
        ]


        // MESMO Q O ANTERIOR
        try {

            const result = await config.query('UPDATE public.produtos SET nome = $1, preco = $2, off = $3, descricao = $4, categoria= $5, data_do_cadastro = $6, ativo = $7 WHERE id = $8 RETURNING *', values)
            console.log("Produto atualizado com sucesso!",)
            res.send(result.rows[0], 'Produto atualizado com Sucesso');
        }
        catch {
            res.status(400).send('Produto não pode ser atualizado!')
        }

    },

    AtualizarProduto: async (req, res) => {


        let prodid = req.params.id
        const produto = await config.query('SELECT * from public.produtos where ID=$1', [prodid])
        let prod = produto


        if (!prod.rowCount) {
            console.log(prod)
            res.status(404).send("Produto não encontrado!")

            return;
        }


        const { nome, preco, off, descricao, categoria, data_do_cadastro, ativo } = req.body


        const values = [
            nome,
            preco,
            off,
            descricao,
            categoria,
            data_do_cadastro,
            ativo,
            prodid
        ]

        //MESMO Q O ANTERIOR
        try {
            const push = await config.query('UPDATE public.produtos SET nome = $1, preco = $2, off = $3, descricao = $4, categoria= $5, data_do_cadastro = $6, ativo = $7 WHERE id = $8 RETURNING *', values)
            console.log("Produto atualizado com sucesso!")
            res.send(push.rows[0], 'Produto atualizado com sucesso!');
        }
        catch (err) {
            console.log('Produto nao pode ser atualizado', err)
            // res.status(400).send('produto não pode ser atualizado!')
        }

    },

    DeletarProduto: async (req, res) => {

        let prodid = req.params.id
        const produto = await config.query('DELETE from public.produtos where ID=$1 RETURNING *', [prodid])

        if (!produto.rowCount) {
            console.log(produto)
            res.status(404).send("Produto não encontrado!")

            return;
        }

        console.log(produto.rows[0])

        return ('Produto Deletado')

    }


}
