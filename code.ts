//####classes####
class Pacote {
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
// interface {
interface IListaDePacotes{
    ListarPacotes():Array<object>;
    AddPacotes(p:object):void;
    ExcluirPacotes(id:number):void;
    EditarPacotes(id:number):object;
}

class ListaDePacotes implements IListaDePacotes {
    listaP:Array<object>=[];
     
    ListarPacotes():Array<object>{
        return this.listaP
    }
    AddPacotes(pacote:object):void{
        this.listaP.push(pacote)
    }
    ExcluirPacotes(id:number):void{
        this.listaP.splice(id,1)
    }
    EditarPacotes(id:number):object{
        let pacote:object=this.listaP.filter((objeto)=>objeto.id==id)
        this.listaP.splice(id,1)
        return pacote
    }
}

//####Funções####
//função para mostrar os pacotes
const MostrarPacote=(objeto:object):void=>{
    let titulo:string = objeto.nome;
    let descricao:string=objeto.descricao;
    let data:string= objeto.data;
    let id:number=objeto.id;
    document.querySelector('#pacotes-cadastrados').innerHTML+=
` <div class="pacotes">
    <section >
        <h4 class="titulo">${titulo}</h4>
        <p class="descricao">${descricao}</p>
        <span class="data-viagem">Data da viagem:${data}</span>
        <div class="div-botao">
            <button class="botao-editar" id='b-${id}' value=${id}>Editar</button>
            <button class="botao-excluir" id='b-${id}'value=${id}>Excluir</button>
        </div>
    </section>
</div>`;

}

let pacotesCadastrados=new ListaDePacotes()

//pegar a ip
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
        pacotesCadastrados.AddPacotes(objeto)
        console.log(listaDeObjetos[index]);
        MostrarPacote(objeto)
    })
})

//CADASTRAR pacotes
const Cadastro=()=>{
    let input_nome=document.queryCommandValue('#nome-pacote')
    let input_status=document.queryCommandValue('.status')
    let input_data=document.queryCommandValue('#data')
    let input_descricao=document.queryCommandValue('#descricao')
    let botao_form=document.querySelector('#botao-form')

}



console.log('qq',pacotesCadastrados)