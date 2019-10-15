// POST /projects: A rota deve receber id e title dentro corpo de cadastrar um novo projeto dentro de um array no 
// seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; 
// Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com àspas duplas.

// GET /projects: Rota que lista todos projetos e suas tarefas;

// POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de
// um projeto específico escolhido através do id presente nos parâmetros da rota;

// PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;

// DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;

//=========================================================================================================================================

// Middlewares
// Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL 
// que verifica se o projeto com aquele ID existe. 
// Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;

// Crie um middleware global chamado em todas requisições que imprime (console.log) 
// uma contagem de quantas requisições foram feitas na aplicação até então;

const express = require('express')
const servidor = express()

servidor.use(express.json())
servidor.use(contagemDeRequisicoes)

let numeroDeRequisicao = 0
const projetos = []

//Middlewares
function verificaSeProjetoExiste(req, res, next) {
    const { id } = req.params
    const projeto = projetos.find(elemento => elemento.id === id)

    if(!projeto) {
        return res.status(400).json({ Erro: 'Projeto não existe !' })
    }

    return next()
}

function contagemDeRequisicoes(req, res, next) {
    numeroDeRequisicao++

    console.log(`Contagem de requisições: ${numeroDeRequisicao}`)

    return next()
}

servidor.get('/projects', (req, res) => {
    return res.json(projetos)
})

servidor.post('/projects', (req, res) => {
    const { id, title } = req.body
    const projeto = {
        id,
        title,
        task: []
    }

    projetos.push(projeto)

    return res.json(projeto)
})

servidor.put('/projects/:id', verificaSeProjetoExiste, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const projeto = projetos.find(elemento => elemento.id === id)

    projeto.title = title

    return res.json(projeto)

})

servidor.delete('/projects/:id', verificaSeProjetoExiste, (req, res) => {
    const { id } = req.params
    const projetoIndex = projetos.find(elemento => elemento.id === id)

    projetos.splice(projetoIndex, 1)

    return res.json({ mensagem: "Projeto deletado !"})
})

//adiciona uma tarefa !
servidor.post('/projects/:id/task', verificaSeProjetoExiste, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const projeto = projetos.find(elemento => elemento.id === id)

    projeto.task.push(title)

    return res.json(projeto)
})

servidor.listen(3030)