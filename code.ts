//##interface ##
interface IPacote{
    MudancaNome():void;
    MudancaDiscricao():void;
    MudancaData():void;
    MudancaStatus():void;
    MudancaId():void;
}
interface IListaDePacotes{
    ListarPacotes():Array<object>;
    AddPacotes(p:object):void;
    ExcluirPacotes(id:number):void;
    EditarPacotes(id:number):object;
}

//####classes####
class Pacote  implements IPacote{
    nome:string;
    descricao:string;
    data: string;
    status:boolean;
    id:number;
    constructor(_nome:string,_descricao:string,_data:string,_status:boolean,_id:number){
        this.nome=_nome;
        this.descricao=_descricao;
        this.data=_data;
        this.status=_status;
        this.id=_id;
        
    }
    MudancaNome(m_nome:string):void{
        this.nome=m_nome;
    }
    MudancaDiscricao(m_descricao:string):void{
        this.descricao=m_descricao;
    }
    MudancaData(m_data:string):void{
        this.data=m_data;
    }
    MudancaStatus(m_status:boolean):void{
        this.status=m_status;
    }
    MudancaId(m_id:number):void{
        this.id=m_id;
    }
}
class ListaDePacotes implements IListaDePacotes {
    listaP:Array<object>=[];
     
    ListarPacotes():Array<object>{
        return this.listaP
    }
    AddPacotes(pacote:object,index:number):void{
        index--
        this.listaP[index]=pacote
    }
    ExcluirPacotes(id:number):void{
        this.listaP.splice(id-1,1)
    }
    EditarPacotes(id:number):object{
        let pacote:object=this.listaP.filter((objeto)=>objeto.id==id)
        this.listaP.splice(id,1)
        return pacote
    }
}

//##codigo geral##

//declaração das variaveis //
var pacotesCadastrados=new ListaDePacotes()
//varialvel que vai ter o valor da última id do pacote adicionado, para n ter repetição
var ultimo_id=0;

let botao_cadastrar=document.querySelector('#botao-form');
let input_nome=document.querySelector('#nome-pacote');
let input_status:NodeListOf<Element> =document.querySelectorAll('input[name="status"]'); 
let input_data=document.querySelector('#data');
let input_descricao=document.querySelector('#descricao');
let botao_excluir=document.querySelectorAll('.botao-excluir') 
let botaoForm_editar=document.querySelector('#botaoform-editar')

//###CADASTRAR### 

//função para mostrar os pacotes no html
const MostrarPacote=(objeto:object):void=>{
    let titulo:string = objeto.nome;
    let descricao:string=objeto.descricao;
    let data=new Date(objeto.data)
    let dataDia:number=data.getDate();
    let dataMes:number= data.getMonth()+1;
    let dataAno:number= data.getFullYear();
    let id:number=objeto.id;
    //cria o card do pacote no html
    document.querySelector('#pacotes-cadastrados').innerHTML+=
` <div class="pacotes" id='card-${id}'>
    <section >
        <h4 class="titulo" id='t-${id}'>${titulo}</h4>
        <p class="descricao" id='dc-${id}'>${descricao}</p>
        <span class="data-viagem" id='dt-${id}' >Data da viagem: ${dataDia}/${dataMes}/${dataAno}</span>
        <div class="div-botao">
            <button class="botao-editar" id='b-${id}' value=${id} onclick='Editar(${id})'>Editar</button>
            <button class="botao-excluir" id='b-${id}'value=${id} onclick='Excluir(${id})'>Excluir</button>
        </div>
    </section>
</div>`;

}

//pegar a api
const pacote: string = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes'

    fetch(pacote, {
        method: 'GET',
        headers: {'Content-Type': "application/json"},
    })
    .then((response: any) => response.json())
    .then((result: any) =>{
    let listaDeObjetos: Object[] = result
    ultimo_id=Number(listaDeObjetos.length)
    listaDeObjetos.map((objeto, index) => {
        listaDeObjetos[index] = objeto;
        //formatar as informaçoes 
        let nome=objeto.nome
        let descricao=objeto.descricao
        let data=objeto.data
        let status=objeto.status
        let id:number= Number(objeto.id)
        let pacote =new Pacote(nome,descricao,data,status,id)
        //colocar os pacotes dentro da lista 
        pacotesCadastrados.AddPacotes(pacote,id);

        MostrarPacote(objeto);
    })
})

function Cadastro():void{
    let stat:boolean=Boolean(input_status[0].value);
    let data: string=input_data.value.toString() ;
    data+='T18:58:24.397Z';
    //função para ver a data 
    let data_comparada=new Date(data).getTime();
    let data_atual= new Date().getTime();
    if(data_comparada<data_atual){
        return alert("A data escrita já passou");
    }
    //novo id do objeto será o id no último pacote +1
    let id:number=ultimo_id+1
    ultimo_id=id;

    let pacote=new Pacote(input_nome.value,input_descricao.value,data,stat,id);
    //cadastrar pacotes na lista
    pacotesCadastrados.AddPacotes(pacote,id);
    MostrarPacote(pacote);
    //limpar os forms
    input_nome.value='';
    input_status[0].checked=false 
    input_data.value='';
    input_descricao.value='';

    return document.querySelector(`#card-${id}`).scrollIntoView()
}
//botão para ver quando o botão de cadastrar for apertado
botao_cadastrar.addEventListener('click',()=>{
    Cadastro()
    
}) 
//###Excluir####

function Excluir(id:number):void{
    //excluir o pacote da lista
    pacotesCadastrados.ExcluirPacotes(id)
    //excluir a div do pacote
    document.querySelector(`#card-${id}`).remove()
}

//##EDITAR##
//função para modificar o pacote na lista 
function ModificarPacote(pacote:object,nome:string,descricao:string):object{
    
    let stat:boolean=Boolean(input_status[0].value);
    let data: string=input_data.value.toString() ;
    data+='T18:58:24.397Z';
    //modificar o objeto na lista
    pacote.MudancaNome(nome)
    pacote.MudancaDiscricao(descricao)
    pacote.MudancaData(data)
    pacote.MudancaStatus(stat)
    
    
    //limpar os forms
    input_nome.value='';
    input_status[0].checked=false 
    input_data.value='';
    input_descricao.value='';
    return pacote
}
//função para modificar o conteudo no html
function ModificarCard(modificado:object,id:number):void{
    let card_nome= document.querySelector(`#t-${id}`)
    let card_descricao= document.querySelector(`#dc-${id}`)
    let card_data= document.querySelector(`#dt-${id}`)
    
    let titulo:string = modificado.nome;
    let descricao:string=modificado.descricao;
    let data=new Date(modificado.data)
    let dataDia:number=data.getDate();
    let dataMes:number= data.getMonth()+1;
    let dataAno:number= data.getFullYear();

    card_nome?.innerHTML=`${titulo}`
    card_descricao?.innerHTML=`${descricao}`
    card_data?.innerHTML=`Data da viagem: ${dataDia}/${dataMes}/${dataAno}`
   
}
//função chamda quando se aperta o botão editar nos card
function Editar(id:number):void{
    //setar os botões para poder modificar 
    botao_cadastrar.style.display = "none"
    botaoForm_editar.style.display = "block"

    //scroll até os inputs
    document.querySelector('header').scrollIntoView()
   
    //pegar o pacote escolhido
    let pacote= pacotesCadastrados.ListarPacotes().filter(function(objeto:object,index:number):any{
        if(objeto.id==id){
            return objeto
    }
    
})
 
    
    //colocando as informaçoes nos inputs
    input_descricao.value=pacote[0].descricao
    input_nome.value=pacote[0].nome;
    if (pacote[0].status==true) {
        input_status[0].checked=true
    }
    else{
        input_status[1].checked=true
    }
    input_data.value=pacote[0].data.split('T')[0];
    input_descricao.value=pacote[0].descricao;
    
    //verificar quando o botão para editar for apertado
    botaoForm_editar.addEventListener('click',()=>{
        let novoP:object=ModificarPacote(pacote[0],input_nome.value,input_descricao.value);
        ModificarCard(novoP,id);
        botao_cadastrar.style.display ="block"
        botaoForm_editar.style.display = "none"
        document.querySelector(`#card-${id}`).scrollIntoView()
    })
}