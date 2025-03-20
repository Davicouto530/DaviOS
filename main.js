/**
 * Porecsso principal
 * Estudo do banco de dados MongoDB (CRUD)
 * @author Davi do couto
 */

//Importação do módulo de conexão
const {conectar, desconectar} = require("./database.js")

//Importação do modelo de dados do cliente
const clienteModel = require("./src/models/os.js")

//Função para cadastrar um novo cliente
//ATENÇÂO: Para trabalhar com banco de dados usar sempre
//async - await e try-catch
const salvarOS = async (nomeCli, foneCli, cpfCli, prazo, dadosEq, problemaCli, diagTecnico, pecasReparo, statusOS) => {
    try { 
        //setar a estrutura de dados com os valores
        //obs: usar os mesmo nomes da estrutura
        const novaOS = new clienteModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli,
            prazo: prazo,
            dadosEquipa: dadosEq,
            problemaCliente: problemaCli,
            diagTecnico: diagTecnico,
            pecasReparo: pecasReparo,
            statusOS: statusOS
        })
        //A linha abaixo salva os dados no banco de dados
        await novaOS.save()
        console.log("OS adicionada com sucesso")
    } catch (error) {
        //Tratamento personalizado aos erros(exeções)
        if(error.code = 11000){
            console.log(`Erro no CPF ${cpfCli} já está cadastrado`)
        }else {
            console.log(error)
        }
    }
}

//===============================================================
//Função listar todos os clientes
const listarClientes = async () => {
    try{
        const clientes = await clienteModel.find().sort({
            nomeCliente: 1
        })
        console.log(clientes)
    }catch(error){
        console.log(error)
    }
}

//Função para buscar um cliente pelo nome
//find({nomeCliente: new RegExp(nome, i)}) = Ignorar na bucas letras maiúsculas ou minúsculas
//(i = casy insentive)
const buscarClienteNome = async (nome) => {
    try{
        const clienteNome = await clienteModel.find({
            nomeCliente: new RegExp(nome, 'i')
        })
        console.log(clienteNome)
    }catch(error){
        console.log(error)
    }
}

//Função para buscar o cpf do cliente
//find({nomeCliente: new RegExp(nome, i)}) = Ignorar na bucas letras maiúsculas ou minúsculas
//(i = casy insentive)
const buscarClienteCpf = async (cpf) => {
    try{
        const clienteCpf = await clienteModel.find({
            cpf: new RegExp(cpf)
        })
        console.log(clienteCpf)
    }catch(error){
        console.log(error)
    }
}

const prazoCliente = async (prazo) => {
    try{
        const prazo = await clienteModel.find({
            prazo: new RegExp(prazo)
        })
        console.log(prazo)
    }catch(error){
        console.log(error)
    }
}

//Função para editar os dados do cliente
//ATENÇÃO: usar o id do cliente
const atualizarCliente = async (id, nomeCli, foneCli, cpfCli, prazo, dadosEq, problemaCli, diagTecnico, pecasReparo, statusOS) => {
    try{
        const osAlterada = await clienteModel.findByIdAndUpdate(
            id,
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli,
                cpf: cpfCli,
                prazo: prazo,
                dadosEquipa: dadosEq,
                problemaCliente: problemaCli,
                diagTecnico: diagTecnico,
                pecasReparo: pecasReparo,
                statusOS: statusOS
            },
            {
                new: true,
                runValidators: true
            }
        )
        console.log("Dados da OS alterado com sucesso")
    }catch(error){
        //Tratamento personalizado aos erros(exeções)
        if(error.code = 11000){
            console.log(`Erro no CPF ${cpfCli} já está cadastrado`)
        }else {
            console.log(error)
        }
    }
}

//Função para excluir os dados do cliente
const excluirCliente = async (id) => {
    try{
        const osDeletado = await clienteModel.findByIdAndDelete(id)
        console.log("OS excluída com sucesso!")
    }catch(error){
        console.log(error)
    }
}

//===============================================================
const iniciarSistema = async () => {
    console.clear()
    console.log("Estudo do MongoDB")
    console.log("-------------------------------------")
    await conectar()
    //CRUD create(inscerção do banco de dados)
    await salvarOS("Davi do couto", "11982218164", "23466773338","20", "Placa", "Placa mudada", "Placa")
    
    //CRUD read(listar todos os clientes)
    //await listarClientes()

    //CRUD read (buscar pelo nome do cliente)
    //await buscarClienteNome("Jeferson")

    //CRUD read (buscar pelo cpf do cliente)
    //await buscarClienteCpf(23466773338)

    //CRUD update (id do cliente)
    //await atualizarCliente("67db23512ed7a6cceff4f67e", "Davi do couto", "11982218164", "23466773338","20", "Placa", "Placa mudada", "Placa")

    //CRUD delete (id do cliente)
    //await excluirCliente("67db23512ed7a6cceff4f67e")

    // await salvarOS("Fábio Alberto Lopes", "963903225", "26787813338", "20", "lanterna", "lanterna quebrada", "lanterna frontal")
    await desconectar()
}

iniciarSistema()

