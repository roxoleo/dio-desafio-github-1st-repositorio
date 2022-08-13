/*
DESAFIO 4:
// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

*/

//RESPOSTA

let  apiKey:string,
    requestToken:string,
     username: string,
    password: string,
    sessionId:number,
    contaId:number,
    selectIdList;

const loginButton = document.getElementById('login-button') as HTMLButtonElement,
    searchContainer = document.getElementById('search-container') as HTMLElement,
    selectContainer = document.getElementById('select-container')!,
    criaList = document.getElementById('criaList')!,
    mostrarListas = document.getElementById('mostrar-Listas')!,
    mostrarMinhasListas = document.getElementById('minhas-listas')! ,

    templateFilme1 = document.querySelector('.templatefilme') as HTMLTemplateElement,
    templateFilme = templateFilme1.content,
    fragment = document.createDocumentFragment()!;

const templateLista1 = document.querySelector('.templateLista')  as HTMLTemplateElement,
    templateLista=templateLista1.content,
    fragmentLista = document.createDocumentFragment()!,
    minhasListasGeral = document.querySelector('#minhas-listas') as HTMLElement;

const templateVerLista1 = document.querySelector('.templateVerLista') as HTMLTemplateElement,
    templateVerLista=templateVerLista1.content,
    fragmentVerLista = document.createDocumentFragment()!,
    verListaContainer = document.querySelector('#ver-lista') as HTMLElement ;


let selectList = searchContainer.querySelector('.selectList') as HTMLSelectElement;

function preencherSenha() {
   let password1 = document.getElementById('senha') as HTMLInputElement;
    password = password1.value;
    validateLoginButton();
}

function preencherLogin() {
   let  username1 = document.getElementById('login') as HTMLInputElement;
    username =username1.value;
    validateLoginButton();
}

function preencherApi() {
   let  apiKey1 = document.getElementById('api-key') as HTMLInputElement;
    apiKey = apiKey1.value;
}

function validateLoginButton() {
    if (password && username) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

function update() {
    selectIdList = selectList.options[selectList.selectedIndex].value;
    console.log(selectIdList);
    return selectIdList;
}

class HttpClient {
    
    static async get(response: { url:string, method:string, body?:object }){
        return  new Promise((resolve, reject) => {
            let body:any;
            let request = new XMLHttpRequest();
            request.open(response.method, response.url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    })
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                })
            }

            if (response.body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                  body = JSON.stringify(response.body);
            }

            request.send(body);
        })
    }
}


async function criarRequestToken() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    })
    requestToken = result.request_token;
}

async function logar() {
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        }
    })
}

async function criarSessao() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    })
    sessionId = result.session_id;
    searchContainer.style.display = "block";
    criaList.style.display = "block";
    mostrarListas.style.display = "block";
}

async function contaDetails() {
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`,
        method: "GET"
    })
    contaId = result.id;
}

async function procurarFilme(query:string) {
    query = encodeURI(query);
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: "GET"
    })
    selectContainer.style.display = "block";
    return result;
}

async function criarLista(nomeDaLista:string, descricao:string) {
    await HttpClient.get({
      url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
      method: "POST",
      body: {
        name: `${nomeDaLista}`,
        description: `${descricao}`,
        language: "pt-br"
      }
    })
  }

async function adicionarFilmeNaLista(filmeId:any, listaId:string) {
    listaId = encodeURI(listaId);
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    })
}

async function pegarListasDaConta() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/account/${contaId}/lists?api_key=${apiKey}&session_id=${sessionId}`,
        method: "GET"
    })
    mostrarMinhasListas.style.display = "block";
    return result;
}

async function eliminarLista(listaId:any) {
    listaId = encodeURI(listaId);
    console.log("Eliminar", listaId);
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}?api_key=${apiKey}&session_id=${sessionId}`,
        method: "DELETE"
    })
}

async function verLista(listaId:any) {
    listaId = encodeURI(listaId);
    let result:any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}?api_key=${apiKey}`,
        method: "GET"
    })
    verListaContainer.style.display = "block";
    let tbody = verListaContainer.querySelector("tbody") as HTMLElement;
    tbody.innerHTML="";
    let h3Span =verListaContainer.querySelector("h3 span") as HTMLElement;
    h3Span.textContent = result.name;
    let h4 =verListaContainer.querySelector("h4") as HTMLElement;
    h4.textContent = result.description;
    let eflb = templateVerLista.querySelector(".eliminarFilmeListBtn") as HTMLButtonElement;
    eflb.dataset.idLista = result.id;

    for (const item of result.items) {
        let vfn = templateVerLista.querySelector(".verFilmeNome") as  HTMLElement;
        vfn.textContent = item.original_title;
        let vfd = templateVerLista.querySelector(".verFilmeDescricao") as  HTMLElement;
        vfd.textContent = item.overview;
        let vfda = templateVerLista.querySelector(".verFilmeData") as HTMLElement;
        vfda.textContent = item.release_date;
        
        eflb.dataset.idFilme = item.id;

        let $cloneVerLista = document.importNode(templateVerLista, true);
        fragmentVerLista.appendChild($cloneVerLista);
    }
    tbody.appendChild(fragmentVerLista);
}

async function eliminarFilmeNaLista(filmeId:any, listaId:any) {
    listaId = encodeURI(listaId);
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/remove_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    })
}

document.addEventListener('click', async e => {
    const target =e.target as HTMLButtonElement;
    if (target.matches("#login-button")) {
        await criarRequestToken();
        await logar();
        await criarSessao();
        await contaDetails();
    }

    if (target.matches("#search-button")) {
        let tbody = searchContainer.querySelector("tbody") as HTMLElement;
        tbody.innerHTML = "";
        selectList.innerHTML = "";

        let query = document.getElementById('search') as HTMLInputElement;
        let queryText = query.value;
        let listaDeFilmes:any = await procurarFilme(queryText);
        let selectMinhasListas:any = await pegarListasDaConta();

        for (let ls of selectMinhasListas.results) {
            let optionList = document.createElement('option');
            optionList.value = ls.id;
            optionList.appendChild(document.createTextNode(ls.name));
            selectList.appendChild(optionList);
        }

        for (const item of listaDeFilmes.results) {
            let fi=templateFilme.querySelector(".filmeId") as HTMLElement;
            fi.textContent = item.id;
            let fn=templateFilme.querySelector(".filmeNome") as HTMLElement;
            fn.textContent = item.original_title;
            let afb=templateFilme.querySelector(".adicionarFilmeBtn") as HTMLButtonElement;
            afb.dataset.idFilme = item.id;

            let $clone = document.importNode(templateFilme, true);
            fragment.appendChild($clone);
        }

        searchContainer.querySelector("tbody")?.appendChild(fragment);
        query.value = " ";
    }

    if (target.matches("#criaList-button")) {
        let nomeDaLista = document.querySelector('#name-list') as HTMLInputElement;
        let nomeDaListaText = nomeDaLista.value.toUpperCase();
        let descricao = document.querySelector('#description') as HTMLInputElement;
        let descricaoText = descricao.value;
       
        await criarLista(nomeDaListaText, descricaoText);

        nomeDaLista.value = "";
        descricao.value = "";
    }

    if (target.matches(".adicionarFilmeBtn")) {
        let filmeId = target.dataset.idFilme;
        let listaId = update();
        console.log(filmeId, listaId);
        await adicionarFilmeNaLista(filmeId, listaId);
        await verLista(listaId);
    }

    if (target.matches("#list-button")) {
        let tbody =  minhasListasGeral.querySelector("tbody") as HTMLElement;
        tbody.innerHTML = "";
        let listDetails:any = await pegarListasDaConta();

        for (const item of listDetails.results) {
            let lit = templateLista.querySelector(".listaIdTemplate") as HTMLElement;
            lit.textContent = item.id;
            let lnt = templateLista.querySelector(".listaNomeTemplate") as HTMLElement;
            lnt.textContent = item.name;
            let vlb =  templateLista.querySelector(".verListaBtn") as HTMLButtonElement;
            vlb.dataset.idLista = item.id;
            let elb =   templateLista.querySelector(".eliminarListaBtn") as HTMLButtonElement;
           elb.dataset.idLista = item.id;

            let $cloneLista = document.importNode(templateLista, true);
            fragmentLista.appendChild($cloneLista);
        }
        console.log(listDetails.results);
        tbody?.appendChild(fragmentLista);
    }


    if (target.matches(".verListaBtn")) {
        let listaId = target.dataset.idLista;
        console.log(listaId);
        await verLista(listaId);
    }

    if (target.matches(".eliminarListaBtn")) {
        let listaIdGeral =target.dataset.idLista;
        await eliminarLista(listaIdGeral);
    }

    if (target.matches(".eliminarFilmeListBtn")) {
        let filmeId = target.dataset.idFilme;
        let listaId = target.dataset.idLista;
        await eliminarFilmeNaLista(filmeId, listaId);
    }


})