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
//####Funções GERAIS####
//função para mostrar os pacotes
var MostrarPacote = function (objeto) {
    var titulo = objeto.nome;
    var descricao = objeto.descricao;
    var data = new Date(objeto.data);
    var dataDia = data.getDate();
    var dataMes = data.getMonth() + 1;
    var dataAno = data.getFullYear();
    var id = objeto.id;
    //cria o card do pacote no html
    document.querySelector('#pacotes-cadastrados').innerHTML +=
        " <div class=\"pacotes\" id='card-".concat(id, "'>\n    <section >\n        <h4 class=\"titulo\" id='t-").concat(id, "'>").concat(titulo, "</h4>\n        <p class=\"descricao\" id='dc-").concat(id, "'>").concat(descricao, "</p>\n        <span class=\"data-viagem\" id='dt-").concat(id, "' >Data da viagem: ").concat(dataDia, "/").concat(dataMes, "/").concat(dataAno, "</span>\n        <div class=\"div-botao\">\n            <button class=\"botao-editar\" id='b-").concat(id, "' value=").concat(id, " onclick='Editar(").concat(id, ")'>Editar</button>\n            <button class=\"botao-excluir\" id='b-").concat(id, "'value=").concat(id, " onclick='Excluir(").concat(id, ")'>Excluir</button>\n        </div>\n    </section>\n</div>");
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
        var nome = objeto.nome;
        var descricao = objeto.descricao;
        var data = objeto.data;
        var status = objeto.status;
        var id = Number(objeto.id);
        var pacote = new Pacote(nome, descricao, data, status, id);
        pacotesCadastrados.AddPacotes(pacote, id);
        MostrarPacote(objeto);
    });
});
//CADASTRAR pacotes
var botao_form = document.querySelector('#botao-form');
function Cadastro() {
    var input_nome = document.querySelector('#nome-pacote');
    var input_status = document.querySelectorAll('input[name="status"]:checked');
    var stat = Boolean(input_status[0].value);
    var input_data = document.querySelector('#data');
    var data = input_data.value.toString();
    data += 'T18:58:24.397Z';
    //função para ver a data 
    var data_comparada = new Date(data).getTime();
    var data_atual = new Date().getTime();
    if (data_comparada < data_atual) {
        return alert("A data escrita já passou");
    }
    var input_descricao = document.querySelector('#descricao');
    //novo id do objeto será o id no último pacote +1
    var id = pacotesCadastrados.ListarPacotes();
    id = Number(id[id.length - 1].id);
    id += 1;
    console.log('id', id);
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
    console.log(elemento); //<--
    elemento.remove();
}
//##EDITAR##
function Editar(id) {
    //
    document.querySelector('header').scrollIntoView();
    console.log('oi');
    console.log(id);
    //pegar o pacote escolhido
    var pacote = pacotesCadastrados.listaP;
    pacote = pacote[id - 1];
    console.log(pacote);
    console.log(pacote.status);
    console.log(pacote.data.split('T')[0]);
    var input_nome = document.querySelector('#nome-pacote');
    var input_status = document.querySelectorAll('input[name="status"]');
    console.log(input_status);
    var input_data = document.querySelector('#data');
    var input_descricao = document.querySelector('#descricao');
    //colocando as informaçoes
    input_descricao.value = pacote.descricao;
    input_nome.value = pacote.nome;
    if (pacote.status == true) {
        input_status[0].checked = true;
    }
    else {
        input_status[1].checked = true;
    }
    input_data.value = pacote.data.split('T')[0];
    input_descricao.value = pacote.descricao;
    Excluir(id);
    botao_form.addEventListener('click', function () {
        Cadastro();
    });
}
// nome:string;
// descricao:string;
// data: string;
// status:boolean;
// id:number;
