"use strict";
// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela
// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction
let apiKey, requestToken, username, password, sessionId, contaId,  selectIdList;
const loginButton = document.getElementById('login-button'), searchContainer = document.getElementById('search-container'), selectContainer = document.getElementById('select-container'), criaList = document.getElementById('criaList'), mostrarListas = document.getElementById('mostrar-Listas'), mostrarMinhasListas = document.getElementById('minhas-listas'), templatefilme = document.querySelector('.templatefilme').content, fragment = document.createDocumentFragment();
const templateLista = document.querySelector('.templateLista').content, fragmentLista = document.createDocumentFragment(), minhasListasGeral = document.querySelector('#minhas-listas');
const templateVerLista = document.querySelector('.templateVerLista').content, fragmentVerLista = document.createDocumentFragment(), verListaContainer = document.querySelector('#ver-lista');
let selectList = searchContainer.querySelector('.selectList');
function preencherSenha() {
    password = document.getElementById('senha').value;
    validateLoginButton();
}
function preencherLogin() {
    username = document.getElementById('login').value;
    validateLoginButton();
}
function preencherApi() {
    apiKey = document.getElementById('api-key').value;
}
function validateLoginButton() {
    if (password && username) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}
function update() {
    selectIdList = selectList.options[selectList.selectedIndex].value;
    console.log(selectIdList);
    return selectIdList;
}
class HttpClient {
    static get({ url, method, body = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open(method, url, true);
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
                        reject({
                            status: request.status,
                            statusText: request.statusText
                        });
                    }
                };
                request.onerror = () => {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                };
                if (body) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    body = JSON.stringify(body);
                }
                request.send(body);
            });
        });
    }
}
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
            method: "GET"
        });
        requestToken = result.request_token;
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function* () {
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
            method: "POST",
            body: {
                username: `${username}`,
                password: `${password}`,
                request_token: `${requestToken}`
            }
        });
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
            method: "GET"
        });
        sessionId = result.session_id;
        searchContainer.style.display = "block";
        criaList.style.display = "block";
        mostrarListas.style.display = "block";
    });
}
function contaDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`,
            method: "GET"
        });
        contaId = result.id;
    });
}
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function* () {
        query = encodeURI(query);
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
            method: "GET"
        });
        selectContainer.style.display = "block";
        return result;
    });
}
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function* () {
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                name: `${nomeDaLista}`,
                description: `${descricao}`,
                language: "pt-br"
            }
        });
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function* () {
        listaId = encodeURI(listaId);
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                media_id: filmeId
            }
        });
    });
}
function pegarListasDaConta() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/account/${contaId}/lists?api_key=${apiKey}&session_id=${sessionId}`,
            method: "GET"
        });
        mostrarMinhasListas.style.display = "block";
        return result;
    });
}
function eliminarLista(listaId) {
    return __awaiter(this, void 0, void 0, function* () {
        listaId = encodeURI(listaId);
        console.log("Eliminar", listaId);
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}?api_key=${apiKey}&session_id=${sessionId}`,
            method: "DELETE"
        });
    });
}
function verLista(listaId) {
    return __awaiter(this, void 0, void 0, function* () {
        listaId = encodeURI(listaId);
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}?api_key=${apiKey}`,
            method: "GET"
        });
        verListaContainer.style.display = "block";
        verListaContainer.querySelector("tbody").innerHTML = "";
        verListaContainer.querySelector("h3 span").textContent = result.name;
        verListaContainer.querySelector("h4").textContent = result.description;
        templateVerLista.querySelector(".eliminarFilmeListBtn").dataset.idLista = result.id;
        for (const item of result.items) {
            templateVerLista.querySelector(".verFilmeNome").textContent = item.original_title;
            templateVerLista.querySelector(".verFilmeDescricao").textContent = item.overview;
            templateVerLista.querySelector(".verFilmeData").textContent = item.release_date;
            templateVerLista.querySelector(".eliminarFilmeListBtn").dataset.idFilme = item.id;
            let $cloneVerLista = document.importNode(templateVerLista, true);
            fragmentVerLista.appendChild($cloneVerLista);
        }
        verListaContainer.querySelector("tbody").appendChild(fragmentVerLista);
    });
}
function eliminarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function* () {
        listaId = encodeURI(listaId);
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}/remove_item?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                media_id: filmeId
            }
        });
    });
}
document.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    if (e.target.matches("#login-button")) {
        yield criarRequestToken();
        yield logar();
        yield criarSessao();
        yield contaDetails();
    }
    if (e.target.matches("#search-button")) {
        searchContainer.querySelector("tbody").innerHTML = "";
        selectList.innerHTML = "";
        let query = document.getElementById('search');
        let queryText = query.value;
        let listaDeFilmes = yield procurarFilme(queryText);
        let selectMinhasListas = yield pegarListasDaConta();
        for (let ls of selectMinhasListas.results) {
            let optionList = document.createElement('option');
            optionList.value = ls.id;
            optionList.appendChild(document.createTextNode(ls.name));
            selectList.appendChild(optionList);
        }
        for (const item of listaDeFilmes.results) {
            templatefilme.querySelector(".filmeId").textContent = item.id;
            templatefilme.querySelector(".filmeNome").textContent = item.original_title;
            templatefilme.querySelector(".adicionarFilmeBtn").dataset.idFilme = item.id;
            let $clone = document.importNode(templatefilme, true);
            fragment.appendChild($clone);
        }
        searchContainer.querySelector("tbody").appendChild(fragment);
        query.value = " ";
    }
    if (e.target.matches("#criaList-button")) {
        let nomeDaLista = document.querySelector('#name-list');
        let nomeDaListaText = nomeDaLista.value.toUpperCase();
        let descricao = document.querySelector('#description');
        let descricaoText = descricao.value;
        yield criarLista(nomeDaListaText, descricaoText);
        nomeDaLista.value = "";
        descricao.value = "";
    }
    if (e.target.matches(".adicionarFilmeBtn")) {
        let filmeId = e.target.dataset.idFilme;
        let listaId = update();
        console.log(filmeId, listaId);
        yield adicionarFilmeNaLista(filmeId, listaId);
        yield verLista(listaId);
    }
    if (e.target.matches("#list-button")) {
        minhasListasGeral.querySelector("tbody").innerHTML = "";
        let listDetails = yield pegarListasDaConta();
        for (const item of listDetails.results) {
            templateLista.querySelector(".listaIdTemplate").textContent = item.id;
            templateLista.querySelector(".listaNomeTemplate").textContent = item.name;
            templateLista.querySelector(".verListaBtn").dataset.idLista = item.id;
            templateLista.querySelector(".eliminarListaBtn").dataset.idLista = item.id;
            let $cloneLista = document.importNode(templateLista, true);
            fragmentLista.appendChild($cloneLista);
        }
        console.log(listDetails.results);
        minhasListasGeral.querySelector("tbody").appendChild(fragmentLista);
    }
    if (e.target.matches(".verListaBtn")) {
        let listaId = e.target.dataset.idLista;
        console.log(listaId);
        yield verLista(listaId);
    }
    if (e.target.matches(".eliminarListaBtn")) {
        let listaIdGeral = e.target.dataset.idLista;
        yield eliminarLista(listaIdGeral);
    }
    if (e.target.matches(".eliminarFilmeListBtn")) {
        let filmeId = e.target.dataset.idFilme;
        let listaId = e.target.dataset.idLista;
        yield eliminarFilmeNaLista(filmeId, listaId);
    }
}));
