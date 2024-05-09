'use strict'

import { deleteFilme, getFilmes, postFilme, putFilme } from "./filmes.js"
import { deleteGenero, getGeneros, postGenero, putGenero } from "./generos.js"

const select = document.getElementById('opcoes')
select.addEventListener('change', criarBotões)

const btnVisualizar = document.getElementById('visualizar')
btnVisualizar.addEventListener('click', criarTabela)

const btnCriar = document.getElementById('adicionar')


function criarBotões() {
    const txtBotoes = document.getElementById('opcoes').value

    btnVisualizar.textContent = `Visualizar ${String(txtBotoes)[0].toUpperCase() + String(txtBotoes).substring(1)}`

    btnCriar.textContent = `Adicionar ${String(txtBotoes)[0].toUpperCase() + String(txtBotoes).substring(1)}`
}

async function criarTabela() {
    const txtSelect = select.value

    if (txtSelect == 'generos') {

        const verificarTabela = document.querySelector('table')
        const teste = document.body.contains(verificarTabela)
        const main = document.getElementById('main')

        if (teste == false) {

            const tabela = document.createElement('table')
            tabela.id = 'tabela'
            tabela.classList.add('tbl')

            const divTabela = document.getElementById('tbl')
            divTabela.appendChild(tabela)

            const colunaId = document.createElement('th')
            colunaId.textContent = 'ID'
            colunaId.classList.add('coluna-id')

            const colunaNome = document.createElement('th')
            colunaNome.textContent = 'Nome'
            colunaNome.classList.add('coluna-nome')

            const colunaDescricao = document.createElement('th')
            colunaDescricao.textContent = 'Descrição'
            colunaDescricao.classList.add('coluna-desc')

            const linhaTitulo = document.createElement('tr')
            linhaTitulo.classList.add('linha-titulo')
            linhaTitulo.append(colunaId, colunaNome, colunaDescricao)

            tabela.appendChild(linhaTitulo)

            const generos = await getGeneros()

            const dadosGenero = {}

            generos.forEach(genero => {
                const linhaDados = document.createElement('tr')
                linhaDados.classList.add('linha-dados')

                const idGenero = document.createElement('td')
                idGenero.textContent = genero.id
                idGenero.classList.add('linha-id')

                const nomeGenero = document.createElement('td')
                nomeGenero.textContent = genero.nome
                nomeGenero.classList.add('linha-nome')

                const descricaoGenero = document.createElement('td')
                descricaoGenero.textContent = genero.descricao_genero
                descricaoGenero.classList.add('linha-desc')


                const excluirGenero = document.createElement('button')
                const iconeLixeira = document.createElement('img')
                iconeLixeira.classList.add('icone-lixeira')
                iconeLixeira.src = '../img/remove_icon.png'
                excluirGenero.appendChild(iconeLixeira)
                excluirGenero.classList.add('botao-excluir')
                excluirGenero.addEventListener('click', () => deleteGenero(idGenero.textContent))

                const editarGenero = document.createElement('button')
                const iconeLapis = document.createElement('img')
                iconeLapis.classList.add('icone-lapis')
                iconeLapis.src = '../img/pencil_icon.png'
                editarGenero.appendChild(iconeLapis)
                editarGenero.classList.add('botao-editar')
                editarGenero.addEventListener('click', function () {
                    main.innerHTML =
                        `
                    <div class="janela-modal w-1/3 h-3/6 bg-bg-tabela ml-96 mt-8 flex justify-center">
                    <div class="modal h-full w-full ml-10 flex flex-col	justify-center items-start" id="formulario">

                    <div class="id flex items-center justify-start h-16 w-32 ml-16">
                    <label for="" class="text-xl mr-2">ID:</label>
                    <input type="number" class="w-20 h-8 rounded-lg p-2">
                    </div>

                    <div class="nome flex items-center justify-start h-16 w-full ml-8">
                    <label for="" class="text-xl mr-2">Nome:</label>
                    <input type="text" class="w-80 h-8 rounded-lg p-2" id="nomeGenero">
                    </div>

                    <div class="descricao flex items-center justify-start w-5/6">
                    <label for="" class="text-xl mr-2">Descrição:</label>
                    <textarea name="" id="descGenero" cols="30" rows="10" class="w-96 h-52 resize-none rounded-lg p-2"></textarea>
                    </div>
                    
                    <div class="flex w-full justify-center mt-10 -ml-10">
                    <button class="bg-bg-botao-adicionar-filmes h-10 w-40 rounded-full text-white text-lg font-semibold" id="atualizarGenero">Atualizar Gênero</button>
                    </div>

                   </div>                    
                    `
                    const btnAtualizar = document.getElementById('atualizarGenero')
                    btnAtualizar.addEventListener('click', async function () {
                        const id = idGenero.textContent

                        const nome = document.getElementById('nomeGenero')
                        dadosGenero.nome = nome.value

                        const descricao_genero = document.getElementById('descGenero')
                        dadosGenero.descricao_genero = descricao_genero.value

                        const atualizarGenero = await putGenero(id, dadosGenero)

                        if (atualizarGenero) {
                            alert('Dados atualizados com sucesso!!!')
                            location.reload()
                        }
                        else {
                            alert('Ocorreu um erro ao atualizar os dados!!')
                        }
                    })
                })

                linhaDados.append(idGenero, nomeGenero, descricaoGenero, excluirGenero, editarGenero)
                tabela.appendChild(linhaDados)
            });
        }
        else {
            alert('Todos os dados já foram registrados!!')
        }

    }

    else if (txtSelect == 'classificacoes') {

    }

    else if (txtSelect == 'diretores') {

    }

    else if (txtSelect == 'atores') {

    }

    else if (txtSelect == 'filmes') {
        const filmes = await getFilmes()

        filmes.forEach(filme => {
            const linhaFilme = document.createElement('tr')
            linhaFilme.classList.add('linha-tabela')

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

            async function excluirFilmes(id) {
                const idFilme = id
                const excluir = await deleteFilme(idFilme)

                if (excluir) {
                    console.log('filme excluido com sucesso')
                    location.reload()
                } else {
                    console.log(Error)
                }

            }

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
}

criarBotões()