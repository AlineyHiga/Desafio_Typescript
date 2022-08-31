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
    ListaDePacotes.prototype.AddPacotes = function (pacote, index) {
        index--;
        this.listaP[index] = pacote;
    };
    ListaDePacotes.prototype.ExcluirPacotes = function (id) {
        this.listaP.splice(id - 1, 1);
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
    var data = new Date(objeto.data);
    console.log(data);
    var dataDia = data.getDate();
    var dataMes = data.getMonth() + 1;
    var dataAno = data.getFullYear();
    var id = objeto.id;
    document.querySelector('#pacotes-cadastrados').innerHTML +=
        " <div class=\"pacotes\" id='card-".concat(id, "'>\n    <section >\n        <h4 class=\"titulo\" id='t-").concat(id, "'>").concat(titulo, "</h4>\n        <p class=\"descricao\" id='dc-").concat(id, "'>").concat(descricao, "</p>\n        <span class=\"data-viagem\" id='dt-").concat(id, "' >Data da viagem: ").concat(dataDia, "/").concat(dataMes, "/").concat(dataAno, "</span>\n        <div class=\"div-botao\">\n            <button class=\"botao-editar\" id='b-").concat(id, "' value=").concat(id, ">Editar</button>\n            <button class=\"botao-excluir\" id='b-").concat(id, "'value=").concat(id, " onclick='Excluir(").concat(id, ")'>Excluir</button>\n        </div>\n    </section>\n</div>");
};
var pacotesCadastrados = new ListaDePacotes();
//pegar a api
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
        var id = objeto.id;
        pacotesCadastrados.AddPacotes(objeto, id);
        MostrarPacote(objeto);
    });
});
//CADASTRAR pacotes
var botao_form = document.querySelector('#botao-form');
function Cadastro() {
    var input_nome = document.querySelector('#nome-pacote');
    var input_status = document.querySelectorAll('input[name="status"]:checked');
    var stat = input_status[0].value;
    var input_data = document.querySelector('#data').value;
    var data = input_data.toString() + 'T18:58:24.397Z';
    //função para ver a data 
    var data_comparada = new Date(data).getTime();
    var data_atual = new Date().getTime();
    if (data_comparada < data_atual) {
        return alert("A data escrita já passou");
    }
    var input_descricao = document.querySelector('#descricao');
    var id = pacotesCadastrados.ListarPacotes().length;
    id += 1;
    var pacote = new Pacote(input_nome.value, input_descricao.value, data, stat, id);
    pacotesCadastrados.AddPacotes(pacote, id);
    console.log(input_data);
    console.log(pacotesCadastrados);
    MostrarPacote(pacote);
    //limpar os forms
    input_nome.value = '';
    input_status[0].checked = false;
    input_data.value = '';
    input_descricao.value = '';
    return;
}
botao_form.addEventListener('click', function () {
    Cadastro();
});
console.log(pacotesCadastrados);
//###Excluir####
var botao_excluir = document.querySelectorAll('.botao-excluir');
console.log(botao_excluir);
function Excluir(id) {
    pacotesCadastrados.ExcluirPacotes(id);
    var elemento = document.querySelector("#card-".concat(id));
    console.log(elemento);
    elemento.remove();
}
//status está estranho 
//refazer o metodo da id
