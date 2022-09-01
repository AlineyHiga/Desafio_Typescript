// interface {
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

//####Funções GERAIS####
//função para mostrar os pacotes
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

var pacotesCadastrados=new ListaDePacotes()

//pegar a api
const pacote: string = 'https://62361b7feb166c26eb2f488a.mockapi.io/pacotes'

    fetch(pacote, {
        method: 'GET',
        headers: {'Content-Type': "application/json"},
    })
    .then((response: any) => response.json())
    .then((result: any) =>{
    let listaDeObjetos: Object[] = result
    listaDeObjetos.map((objeto, index) => {
        listaDeObjetos[index] = objeto;
        let nome=objeto.nome
        let descricao=objeto.descricao
        let data=objeto.data
        let status=objeto.status
        let id:number= Number(objeto.id)
        let pacote =new Pacote(nome,descricao,data,status,id)
        
        pacotesCadastrados.AddPacotes(pacote,id);
        MostrarPacote(objeto);
    })
})

//CADASTRAR pacotes

let botao_form=document.querySelector('#botao-form');


function Cadastro():void{
   
    let input_nome:string =document.querySelector('#nome-pacote');
    
    let input_status:NodeListOf<Element> =document.querySelectorAll('input[name="status"]:checked');
    let stat:boolean=Boolean(input_status[0].value);

    let input_data=document.querySelector('#data')
    
    let data: string=input_data.value.toString() 
    data+='T18:58:24.397Z'
    //função para ver a data 
    let data_comparada=new Date(data).getTime()
    let data_atual= new Date().getTime()
    if(data_comparada<data_atual){
        return alert("A data escrita já passou")
    }
        
    
    let input_descricao:string=document.querySelector('#descricao');
    //novo id do objeto será o id no último pacote +1
    let id:number=pacotesCadastrados.ListarPacotes();
    id=Number(id[id.length -1].id)
    id+=1;
    console.log('id',id)
    let pacote=new Pacote(input_nome.value,input_descricao.value,data,stat,id);
    
    pacotesCadastrados.AddPacotes(pacote,id);
    console.log(input_data);
    console.log(pacotesCadastrados);
    MostrarPacote(pacote);
    //limpar os forms
    input_nome.value='';
    input_status[0].checked=false 
    input_data.value='';
    input_descricao.value='';

    return
}
botao_form.addEventListener('click',()=>{
    Cadastro()
})
console.log(pacotesCadastrados);

//###Excluir####
let botao_excluir=document.querySelectorAll('.botao-excluir') 
console.log(botao_excluir)
function Excluir(id):void{
    pacotesCadastrados.ExcluirPacotes(id)
    let elemento=document.querySelector(`#card-${id}`)
    console.log(elemento) //<--
    elemento.remove()
}

//##EDITAR##
function Editar(id):void{
    //
    document.querySelector('header').scrollIntoView()
    console.log('oi')
    console.log(id)
    //pegar o pacote escolhido
    let pacote:object= pacotesCadastrados.listaP
    pacote=pacote[id-1]
    
    console.log(pacote)
    console.log(pacote.status)
    console.log(pacote.data.split('T')[0])

    let input_nome=document.querySelector('#nome-pacote');
    let input_status:NodeListOf<Element> =document.querySelectorAll('input[name="status"]');
    console.log(input_status)
    let input_data=document.querySelector('#data')
    let input_descricao=document.querySelector('#descricao');
    //colocando as informaçoes
    input_descricao.value=pacote.descricao
    input_nome.value=pacote.nome;
    if (pacote.status==true) {
        input_status[0].checked=true
    }
    else{
        input_status[1].checked=true
    }
    input_data.value=pacote.data.split('T')[0];
    input_descricao.value=pacote.descricao;
    Excluir(id)
    botao_form.addEventListener('click',()=>{
        Cadastro()
    })
}
// nome:string;
// descricao:string;
// data: string;
// status:boolean;
// id:number;