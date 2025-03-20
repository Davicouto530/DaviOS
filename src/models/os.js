/**
 * Modelo de dados para construção das coleções("tabelas")
 * clientes 
 */

//Importação dos recursos do framework mongoose
const {model, Schema} = require('mongoose')
const { version, type } = require('os')

//Criação da estrutura da coleção Clientes
const cadastroOS = new Schema({
    nomeCliente: {
        type: String
    }, 
    foneCliente: {
        type: String
    },
    cpf: {
        type: String,
        unique: true,
        index: true
    },
    prazo: {
        type: String
    },
    dadosEquipa: {
        type: String
    },
    problemaCliente: {
        type: String
    },
    diagTecnico: {
        type: String
    },
    pecasReparo: {
        type: String
    },
    statusOS: {
        type: String
    },
    dataAbertura: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false}) //Não versionar os dados armazenadas

//Exportar para o main o modelo de dados
//Clientes será o nome da coleção

module.exports = model('CadastroOS', cadastroOS)

