'use strict'

async function criarTabela(){
    const urlGetFilmes = 'http://localhost:8080/v2/acmeFilmes/filmes'
    const response = await fetch(urlGetFilmes)
    const data = await response.json()

    const tabela = document.getElementById('tabela')

    data.filmes.forEach(filme => {
        console.log(filme)
        const linhaFilme = document.createElement('tr')
        linhaFilme.classList.add('linha-filme')

        const idFilme = document.createElement('td')
        idFilme.textContent = filme.id

        const nomeFilme = document.createElement('td')
        nomeFilme.textContent = filme.nome

        const precoFilme = document.createElement('td')
        precoFilme.textContent = filme.preco

        const dataFilme = document.createElement('td')
        const favFilme = document.createElement('td')

        linhaFilme.appendChild(idFilme, nomeFilme, precoFilme, dataFilme, favFilme)
        tabela.append(linhaFilme)
        
    });
    
}


criarTabela()