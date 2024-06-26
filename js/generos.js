export async function getGeneros(){
    const url = 'http://localhost:8080/v2/acmeFilmes/generos'
    const response = await fetch(url)
    const data = await response.json()
    
    return data.generos  
}

export async function getGenero(id){
    const url = `http://localhost:8080/v2/acmeFilmes/genero/${id}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data.genero
} 

export async function postGenero(genero){
    const url = 'http://localhost:8080/v2/acmeFilmes/genero'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genero)
    }
    const response = await fetch(url, options)
    return response.ok
}

export async function deleteGenero(id){
    const url = `http://localhost:8080/v2/acmeFilmes/genero/${id}`
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

export async function putGenero(id, dadosGenero){
    const url = `http://localhost:8080/v2/acmeFilmes/genero/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dadosGenero)
    }
    const response = await fetch(url, options)
    return response.ok
}