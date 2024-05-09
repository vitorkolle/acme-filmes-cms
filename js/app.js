'use strict'

import { deleteFilme, getFilmes, postFilme, putFilme } from "./filmes.js"
import { deleteGenero, getGeneros, postGenero, putGenero } from "./generos.js"
import { deleteClassificacao, getClassificacoes, postClassificacao, putClassificacao } from "./classificacoes.js"

const select = document.getElementById('opcoes')
select.addEventListener('change', criarBotões)

const btnVisualizar = document.getElementById('visualizar')
btnVisualizar.addEventListener('click', criarTabela)
btnVisualizar.classList.add('btn-lateral')

const btnCriar = document.getElementById('adicionar')
btnCriar.addEventListener('click', cadastrarDados)
btnCriar.classList.add('btn-lateral')

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

            if (generos) {

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


                    const excluirCLassificacao = document.createElement('button')
                    const iconeLixeira = document.createElement('img')
                    iconeLixeira.classList.add('icone-lixeira')
                    iconeLixeira.src = '../img/remove_icon.png'
                    excluirCLassificacao.appendChild(iconeLixeira)
                    excluirCLassificacao.classList.add('botao-excluir')
                    excluirCLassificacao.addEventListener('click', () => deleteGenero(idGenero.textContent))

                    const editarClassificacao = document.createElement('button')
                    const iconeLapis = document.createElement('img')
                    iconeLapis.classList.add('icone-lapis')
                    iconeLapis.src = '../img/pencil_icon.png'
                    editarClassificacao.appendChild(iconeLapis)
                    editarClassificacao.classList.add('botao-editar')
                    editarClassificacao.addEventListener('click', function () {
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

                    linhaDados.append(idGenero, nomeGenero, descricaoGenero, excluirCLassificacao, editarClassificacao)
                    tabela.appendChild(linhaDados)
                });
            }
            else {
                alert('Não foram encontrados dados, cadastre-os ou pesquise outros atributos!!!')
                location.reload()
            }
        }
        else {
            alert('Todos os dados já foram registrados!!')
            location.reload()
        }

    }

    else if (txtSelect == 'classificacoes') {
        const verificarTabela = document.querySelector('table')
        const teste = document.body.contains(verificarTabela)
        const main = document.getElementById('main')

        if (teste == false){
            const tabela = document.createElement('table')
            tabela.id = 'tabela'
            tabela.classList.add('tbl')

            const divTabela = document.getElementById('tbl')
            divTabela.appendChild(tabela)

            const colunaId = document.createElement('th')
            colunaId.textContent = 'ID'
            colunaId.classList.add('coluna-id')

            const colunaFaixaEtaria = document.createElement('th')
            colunaFaixaEtaria.textContent = 'Faixa-etaria'
            colunaFaixaEtaria.classList.add('coluna-faixa')

            const colunaClassificacao = document.createElement('th')
            colunaClassificacao.textContent = 'Classificação'
            colunaClassificacao.classList.add('coluna-classificacao')

            const colunaCaracteristicas = document.createElement('th')
            colunaCaracteristicas.textContent = 'Características'
            colunaCaracteristicas.classList.add('coluna-caracteristicas')

            const linhaTitulo = document.createElement('tr')
            linhaTitulo.classList.add('linha-titulo')
            linhaTitulo.append(colunaId, colunaFaixaEtaria, colunaClassificacao, colunaCaracteristicas)

            tabela.appendChild(linhaTitulo)

            const classificacoes = await getClassificacoes()
            console.log(classificacoes);

            if (classificacoes) {

                const dadosCLassificacao = {}

                classificacoes.forEach(classificacao => {
                    const linhaDados = document.createElement('tr')
                    linhaDados.classList.add('linha-dados')

                    const idClassificacao = document.createElement('td')
                    idClassificacao.textContent = classificacao.id
                    idClassificacao.classList.add('linha-id')

                    const faixa_etaria = document.createElement('td')
                    faixa_etaria.textContent = classificacao.faixa_etaria
                    faixa_etaria.classList.add('linha-faixa')

                    const linhaClassificacao = document.createElement('td')
                    linhaClassificacao.textContent = classificacao.classificacao
                    linhaClassificacao.classList.add('linha-nome')

                    const caracteristicas = document.createElement('td')
                    caracteristicas.textContent = classificacao.caracteristicas
                    caracteristicas.classList.add('linha-desc')


                    const excluirCLassificacao = document.createElement('button')
                    const iconeLixeira = document.createElement('img')
                    iconeLixeira.classList.add('icone-lixeira')
                    iconeLixeira.src = '../img/remove_icon.png'
                    excluirCLassificacao.appendChild(iconeLixeira)
                    excluirCLassificacao.classList.add('botao-excluir')
                    excluirCLassificacao.addEventListener('click', () => deleteClassificacao(idClassificacao.textContent))

                    const editarClassificacao = document.createElement('button')
                    const iconeLapis = document.createElement('img')
                    iconeLapis.classList.add('icone-lapis')
                    iconeLapis.src = '../img/pencil_icon.png'
                    editarClassificacao.appendChild(iconeLapis)
                    editarClassificacao.classList.add('botao-editar')
                    editarClassificacao.addEventListener('click', function () {
                        main.innerHTML =
                            `
                        <div class="janela-modal w-1/3 h-4/6 bg-bg-tabela ml-96 mt-8 flex justify-center">
                        <div class="modal h-full w-full ml-10 flex flex-col	justify-center items-start" id="formulario">
    
                        <div class="flex items-center justify-start h-16 w-32 ml-16">
                        <label for="" class="text-xl mr-2">ID:</label>
                        <input type="number" class="w-20 h-8 rounded-lg p-2">
                        </div>
    
                        <div class="flex items-center justify-start h-16 w-full ml-8">
                        <label for="" class="text-xl mr-2">Faixa-etaria:</label>
                        <input type="text" class="w-80 h-8 rounded-lg p-2 ml-3" id="faixaEtaria">
                        </div>

                        <div class="flex items-center justify-start h-16 w-full ml-8">
                        <label for="" class="text-xl mr-2">Classificação:</label>
                        <input type="text" class="w-80 h-8 rounded-lg p-2 ml-3" id="nomeClassificacao">
                        </div>
    
                        <div class="flex items-center justify-start w-5/6 ml-8">
                        <label for="" class="text-xl mr-2">Características:</label>
                        <textarea name="" id="caracteristicas" cols="30" rows="10" class="w-96 h-52 resize-none rounded-lg p-2"></textarea>
                        </div>
                        
                        <div class="flex w-full justify-center mt-10 -ml-10">
                        <button class="bg-bg-botao-adicionar-filmes h-10 w-48 rounded-full text-white text-lg font-semibold" id="atualizarGenero">Atualizar Classificação</button>
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

                    linhaDados.append(idClassificacao, faixa_etaria, linhaClassificacao, caracteristicas, excluirCLassificacao, editarClassificacao)
                    tabela.appendChild(linhaDados)
                });
            }
            else {
                alert('Não foram encontrados dados, cadastre-os ou pesquise outros atributos!!!')
                location.reload()
            }
        }
        else{
            alert('Todos os dados já foram registrados!!')
            location.reload()
        }
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

async function cadastrarDados() {

    const txtSelect = select.value
    const main = document.getElementById('main')

    if (txtSelect == 'generos') {
        main.innerHTML =
            `
                        <div class="janela-modal w-1/3 h-3/6 bg-bg-tabela ml-96 mt-8 flex justify-center">
                        <div class="modal h-full w-full ml-10 flex flex-col	justify-center items-start" id="formulario">
    
                        <div class="nome flex items-center justify-start h-16 w-full ml-8">
                        <label for="" class="text-xl mr-2">Nome:</label>
                        <input type="text" class="w-80 h-8 rounded-lg p-2" id="nomeGenero">
                        </div>
    
                        <div class="descricao flex items-center justify-start w-5/6">
                        <label for="" class="text-xl mr-2">Descrição:</label>
                        <textarea name="" id="descGenero" cols="30" rows="10" class="w-96 h-52 resize-none rounded-lg p-2"></textarea>
                        </div>
                        
                        <div class="flex w-full justify-center mt-10 -ml-10">
                        <button class="bg-bg-botao-adicionar-filmes h-10 w-40 rounded-full text-white text-lg font-semibold" id="cadastrarGenero">Cadastrar Gênero</button>
                        </div>
    
                       </div>                    
                        `
        const btnCadastrar = document.getElementById('cadastrarGenero')
        btnCadastrar.addEventListener('click', async function () {
            const dadosGenero = {}

            const nome = document.getElementById('nomeGenero')
            dadosGenero.nome = nome.value

            const descricao_genero = document.getElementById('descGenero')
            dadosGenero.descricao_genero = descricao_genero.value

            const cadastrarGenero = await postGenero(dadosGenero)

            if (cadastrarGenero) {
                alert('Dados cadastrados com sucesso!!!')
                location.reload()
            }
            else {
                alert('Ocorreu um erro ao cadastrar os dados!!')
            }
        })
    }

    else if (txtSelect == 'classificacoes') {
    }

    else if (txtSelect == 'diretores') {

    }

    else if (txtSelect == 'atores') {

    }
    else if (txtSelect == 'filmes') {

    }

}

criarBotões()