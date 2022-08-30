//####classes####
var Pacote = /** @class */ (function () {
    function Pacote(_nome, _descricao, _data, _status, _id) {
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }
    Pacote.prototype.MudancaNome = function (m_nome) {
        this.nome = m_nome;
    };
    Pacote.prototype.MudancaDiscricao = function (m_descricao) {
        this.descricao = m_descricao;
    };
    Pacote.prototype.MudancaData = function (m_data) {
        this.data = m_data;
    };
    Pacote.prototype.MudancaStatus = function (m_status) {
        this.status = m_status;
    };
    Pacote.prototype.MudancaId = function (m_id) {
        this.id = m_id;
    };
    return Pacote;
}());
var ListaDePacotes = /** @class */ (function () {
    function ListaDePacotes() {
        this.listaP = [];
    }
    ListaDePacotes.prototype.ListarPacotes = function () {
        return this.listaP;
    };
    ListaDePacotes.prototype.AddPacotes = function (pacote) {
        this.listaP.push(pacote);
    };
    ListaDePacotes.prototype.ExcluirPacotes = function (id) {
        this.listaP.splice(id, 1);
    };
    ListaDePacotes.prototype.EditarPacotes = function (id) {
        var pacote = this.listaP.filter(function (objeto) { return objeto.id == id; });
        this.listaP.splice(id, 1);
        return pacote;
    };
    return ListaDePacotes;
}());
//####Funções####
//função para mostrar os pacotes
var MostrarPacote = function (objeto) {
    var titulo = objeto.nome;
    var descricao = objeto.descricao;
    var data = objeto.data;
    var id = objeto.id;
    document.querySelector('#pacotes-cadastrados').innerHTML +=
        " <div class=\"pacotes\">\n    <section >\n        <h4 class=\"titulo\">".concat(titulo, "</h4>\n        <p class=\"descricao\">").concat(descricao, "</p>\n        <span class=\"data-viagem\">Data da viagem:").concat(data, "</span>\n        <div class=\"div-botao\">\n            <button class=\"botao-editar\" id='b-").concat(id, "' value=").concat(id, ">Editar</button>\n            <button class=\"botao-excluir\" id='b-").concat(id, "'value=").concat(id, ">Excluir</button>\n        </div>\n    </section>\n</div>");
};
var pacotesCadastrados = new ListaDePacotes();
//pegar a ip
var pacote = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes';
fetch(pacote, {
    method: 'GET',
    headers: { 'Content-Type': "application/json" }
})
    .then(function (response) { return response.json(); })
    .then(function (result) {
    var listaDeObjetos = result;
    listaDeObjetos.map(function (objeto, index) {
        listaDeObjetos[index] = objeto;
        pacotesCadastrados.AddPacotes(objeto);
        console.log(listaDeObjetos[index]);
        MostrarPacote(objeto);
    });
});
//CADASTRAR pacotes
var Cadastro = function () {
    var input_nome = document.queryCommandValue('#nome-pacote');
    var input_status = document.queryCommandValue('.status');
    var input_data = document.queryCommandValue('#data');
    var input_descricao = document.queryCommandValue('#descricao');
    var botao_form = document.querySelector('#botao-form');
};
console.log('qq', pacotesCadastrados);
