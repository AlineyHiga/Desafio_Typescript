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
//##codigo geral##
//declaração das variaveis //
var pacotesCadastrados = new ListaDePacotes();
//varialvel que vai ter o valor da última id do pacote adicionado, para n ter repetição
var ultimo_id = 0;
var botao_cadastrar = document.querySelector('#botao-form');
var input_nome = document.querySelector('#nome-pacote');
var input_status = document.querySelectorAll('input[name="status"]');
var input_data = document.querySelector('#data');
var input_descricao = document.querySelector('#descricao');
var botao_excluir = document.querySelectorAll('.botao-excluir');
var botaoForm_editar = document.querySelector('#botaoform-editar');
//###CADASTRAR### 
//função para mostrar os pacotes no html
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
//pegar a api
var pacote = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes';
fetch(pacote, {
    method: 'GET',
    headers: { 'Content-Type': "application/json" }
})
    .then(function (response) { return response.json(); })
    .then(function (result) {
    var listaDeObjetos = result;
    ultimo_id = Number(listaDeObjetos.length);
    listaDeObjetos.map(function (objeto, index) {
        listaDeObjetos[index] = objeto;
        //formatar as informaçoes 
        var nome = objeto.nome;
        var descricao = objeto.descricao;
        var data = objeto.data;
        var status = objeto.status;
        var id = Number(objeto.id);
        var pacote = new Pacote(nome, descricao, data, status, id);
        //colocar os pacotes dentro da lista 
        pacotesCadastrados.AddPacotes(pacote, id);
        MostrarPacote(objeto);
    });
});
function Cadastro() {
    var stat = Boolean(input_status[0].value);
    var data = input_data.value.toString();
    data += 'T18:58:24.397Z';
    //função para ver a data 
    var data_comparada = new Date(data).getTime();
    var data_atual = new Date().getTime();
    if (data_comparada < data_atual) {
        return alert("A data escrita já passou");
    }
    //novo id do objeto será o id no último pacote +1
    var id = ultimo_id + 1;
    ultimo_id = id;
    var pacote = new Pacote(input_nome.value, input_descricao.value, data, stat, id);
    //cadastrar pacotes na lista
    pacotesCadastrados.AddPacotes(pacote, id);
    MostrarPacote(pacote);
    //limpar os forms
    input_nome.value = '';
    input_status[0].checked = false;
    input_data.value = '';
    input_descricao.value = '';
    return document.querySelector("#card-".concat(id)).scrollIntoView();
}
//botão para ver quando o botão de cadastrar for apertado
botao_cadastrar.addEventListener('click', function () {
    Cadastro();
});
//###Excluir####
function Excluir(id) {
    //excluir o pacote da lista
    pacotesCadastrados.ExcluirPacotes(id);
    //excluir a div do pacote
    document.querySelector("#card-".concat(id)).remove();
}
//##EDITAR##
//função para modificar o pacote na lista 
function ModificarPacote(pacote, nome, descricao) {
    console.log('estou aqui');
    var stat = Boolean(input_status[0].value);
    var data = input_data.value.toString();
    data += 'T18:58:24.397Z';
    console.log('nome', nome);
    console.log('nome', descricao);
    //modificar o objeto na lista
    pacote.MudancaNome(nome);
    pacote.MudancaDiscricao(descricao);
    pacote.MudancaData(data);
    pacote.MudancaStatus(stat);
    console.log(pacote);
    //limpar os forms
    input_nome.value = '';
    input_status[0].checked = false;
    input_data.value = '';
    input_descricao.value = '';
    return pacote;
}
//função para modificar o conteudo no html
function ModificarCard(modificado, id) {
    var card_nome = document.querySelector("#t-".concat(id));
    var card_descricao = document.querySelector("#dc-".concat(id));
    var card_data = document.querySelector("#dt-".concat(id));
    var titulo = modificado.nome;
    var descricao = modificado.descricao;
    var data = new Date(modificado.data);
    var dataDia = data.getDate();
    var dataMes = data.getMonth() + 1;
    var dataAno = data.getFullYear();
    card_nome === null || card_nome === void 0 ? void 0 : card_nome.innerHTML = "".concat(titulo);
    card_descricao === null || card_descricao === void 0 ? void 0 : card_descricao.innerHTML = "".concat(descricao);
    card_data === null || card_data === void 0 ? void 0 : card_data.innerHTML = "Data da viagem: ".concat(dataDia, "/").concat(dataMes, "/").concat(dataAno);
}
//função chamda quando se aperta o botão editar nos card
function Editar(id) {
    //setar os botões para poder modificar 
    botao_cadastrar.style.display = "none";
    botaoForm_editar.style.display = "block";
    //scroll até os inputs
    document.querySelector('header').scrollIntoView();
    //pegar o pacote escolhido
    var pacote = pacotesCadastrados.ListarPacotes();
    pacote = pacote[id - 1];
    //colocando as informaçoes nos inputs
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
    //verificar quando o botão para editar for apertado
    botaoForm_editar.addEventListener('click', function () {
        var novoP = ModificarPacote(pacote, input_nome.value, input_descricao.value);
        ModificarCard(novoP, id);
        botao_cadastrar.style.display = "block";
        botaoForm_editar.style.display = "none";
        document.querySelector("#card-".concat(id)).scrollIntoView();
    });
}
