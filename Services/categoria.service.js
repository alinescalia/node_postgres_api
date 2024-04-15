import { config } from "../db/config/index.js";
import { connection } from "../db/db.js";

export const CategoriaService = {

    produtosporcategoria: async (req, res) => {

        const categ = req.params.categoria

        const query = `SELECT produtos.nome, nome_categoria from public.produtos JOIN categoria on categoria_id = categoria.id WHERE nome_categoria = '${categ}'`

        console.log(query)

        const result = await config.query(query)


        return (result.rows)

    },

    adicionarcategoria: async (req, res) => {

        const prodid = req.params.id
        const newcat = req.params.categoria

        const result = await config.query('SELECT id from public.categoria where nome_categoria = $1', [newcat])
        const codcat = result.rows.map(({ id }) => id)

        const query = `UPDATE public.produtos SET categoria_id = ${codcat} WHERE id = ${prodid} RETURNING *`

        const produto = await config.query(query)

        return (produto.rows[0])

    }


}