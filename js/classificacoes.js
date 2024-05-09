export async function getClassificacoes(){
    const url = 'http://localhost:8080/v2/acmeFilmes/classificacoes'
    const response = await fetch(url)
    const data = await response.json()
    
    return data.classificacoes  
}

export async function getClassificacao(id){
    const url = `http://localhost:8080/v2/acmeFilmes/classificacao/${id}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data.classificacao
} 

export async function postClassificacao(dadosClassificacao){
    const url = 'http://localhost:8080/v2/acmeFilmes/classificacao'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosClassificacao)
    }
    const response = await fetch(url, options)
    return response.ok
}

export async function deleteClassificacao(id){
    const url = `http://localhost:8080/v2/acmeFilmes/classificacao/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    if(response){
        alert('Dados excluídos com sucesso!!!')
    }else{
        alert('Erro ao excluir os dados')
    }
    location.reload()
    return response.ok
}

export async function putClassificacao(id, dadosClassificacao){
    const url = `http://localhost:8080/v2/acmeFilmes/classificacao/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dadosClassificacao)
    }
    const response = await fetch(url, options)
    return response.ok
}