//Criação de variáveis para armazenar os valores de entrada do HTML
const listaDePaises = document.querySelectorAll("form select"),
    moedaOrigem = document.querySelector(".from select"),
    moedaDestino = document.querySelector(".to select"),
    botaoConverter = document.querySelector("form button");

//Loop que encontra e compara as moedas entre si, com base nos códigos de cotação encontrados
for (let i = 0; i < listaDePaises.length; i++) {
    for (let currency_code in country_list) {
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "BRL" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        listaDePaises[i].insertAdjacentHTML("beforeend", optionTag);
    }
    listaDePaises[i].addEventListener("change", e => {
        carregaBandeira(e.target);
    });
}
//Função responsável pelo carregamento das bandeiras que tem como parâmetro os códigos que estão na variável do arquivo: country-list
//Ela captura os códigos de cada  país e substitui na url abaixo que retorna a bandeira correspondente
/*function carregaBandeira(element) {
    for (let code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector(".span");
            imgTag.src = "flag-icon flag-icon-gr flag-icon-squared";
        }
    }
}*/

window.addEventListener("load", () => {
    executaConversao();
});

botaoConverter.addEventListener("click", e => {
    e.preventDefault();
    executaConversao();
});

const iconeConversao = document.querySelector("form .icon");
iconeConversao.addEventListener("click", () => {
    let tempCode = moedaOrigem.value;
    moedaOrigem.value = moedaDestino.value;
    moedaDestino.value = tempCode;
    carregaBandeira(moedaOrigem);
    carregaBandeira(moedaDestino);
    executaConversao();
})
//Função responsável por captura o valor de entrada e substitui o valor por 1 caso o usuario digite 0 ou nenhum valor
function executaConversao() {
    const quantia = document.querySelector("form input");
    const resultadoConversao = document.querySelector("form .exchange-rate");
    let valor = quantia.value;
    if (valor == "" || valor == "0") {
        quantia.value = "1";
        valor = 1;
    }
    //Executa e imprime o resultado da conversão com o auxílio de um API que possui as cotações em tempo real
    resultadoConversao.innerText = "Realizando a conversão...";
    let url = `https://v6.exchangerate-api.com/v6/6644dbade03d02376076cab6/latest/${moedaOrigem.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let taxaConversao = result.conversion_rates[moedaDestino.value];
        let totalConversao = (valor * taxaConversao).toFixed(2);
        resultadoConversao.innerText = `${valor} ${moedaOrigem
    .value} = ${totalConversao} ${moedaDestino.value}`;
    }).catch(() => {
        resultadoConversao.innerText = "Algo deu errado...";
    });
}

function mudaTema() {
    document.body.classList.toggle("dark");
}