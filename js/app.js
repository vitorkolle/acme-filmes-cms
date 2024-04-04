'use strict'

import { deleteFilme, getFilmes } from "./filmes.js"

async function criarTabela(){
    const filmes = await getFilmes()

    const tabela = document.getElementById('tabela')

    filmes.forEach(filme => {
        const linhaFilme = document.createElement('tr')
        linhaFilme.classList.add('linha-filme')

        const idFilme = document.createElement('td')
        idFilme.textContent = filme.id
        idFilme.classList.add('linha-id')
      

        const nomeFilme = document.createElement('td')
        nomeFilme.textContent = filme.nome
        nomeFilme.classList.add('text-center')

        const precoFilme = document.createElement('td')
        precoFilme.textContent = filme.valor_unitario.toFixed(2)
        precoFilme.classList.add('text-center')

        
        const dataFilme = document.createElement('td')
        const splitData = filme.data_lancamento.split('T')
        dataFilme.textContent = splitData[0]
        dataFilme.classList.add('text-center')
        dataFilme.id = 'data-filme'

        const excluirFilme = document.createElement('button')
        const iconeLixeira = document.createElement('img')
        iconeLixeira.classList.add('icone-lixeira')
        iconeLixeira.src = '../img/remove_icon.png'
        excluirFilme.appendChild(iconeLixeira)
        excluirFilme.classList.add('botao-excluir')
        excluirFilme.addEventListener('click', () => excluirFilmes(idFilme.textContent))

        const editarFilme = document.createElement('button')
        const iconeLapis = document.createElement('img')
        iconeLapis.classList.add('icone-lapis')
        iconeLapis.src = '../img/pencil_icon.png'
        editarFilme.appendChild(iconeLapis)
        editarFilme.classList.add('botao-editar')
        //editarFilme.addEventListener('click', () => editarFilmes(idFilme.textContent))

        linhaFilme.append(idFilme, nomeFilme, precoFilme, dataFilme, excluirFilme, editarFilme)
        tabela.appendChild(linhaFilme)
        
    });
    
}

async function excluirFilmes(id){
    const idFilme = id
    const excluir = await deleteFilme(idFilme)

    if(excluir){
        console.log('filme excluido com sucesso')
        location.reload()
    }else{
        console.log(Error)
    }

}

const btnAdd = document.getElementById('btn-adicionar-filme')
btnAdd.addEventListener('click', adicionarFilme())

function adicionarFilme(){
    window.location.href = 'novoFilme.html'    
}


criarTabela()