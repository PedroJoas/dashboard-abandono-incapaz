// ======================================================
// GERA TODOS OS GRÁFICOS
// ======================================================

function gerarGraficos(){

    graficoIdadeVitimas();

    graficoSexoVitimas();

    graficoFaixaVitimas();

    graficoLocalVitimas();

    graficoIdadeIndiciados();

    graficoSexoIndiciados();

    graficoFaixaIndiciados();

    graficoRelacionamento();

}



// ======================================================
// CONTAGEM
// ======================================================

function contar(lista){

    const contagem = {};

    lista.forEach(item=>{

        if(item === "" || item == null) return;

        contagem[item] = (contagem[item] || 0) + 1;

    });

    return contagem;

}



// ======================================================
// HISTOGRAMA
// ======================================================

function histograma(lista, largura = 5){

    const bins = {};

    lista.forEach(v=>{

        if(isNaN(v)) return;

        let inicio = Math.floor(v/largura)*largura;

        let fim = inicio + largura - 1;

        let faixa = `${inicio}-${fim}`;

        bins[faixa] = (bins[faixa] || 0)+1;

    });

    return bins;

}



// ======================================================
// CRIA UM GRÁFICO
// ======================================================

function criarGrafico(id,tipo,labels,valores,label){

    const el = document.getElementById(id);
    if(!el) return; // canvas not present on this page

    new Chart(
        el,
        {
            type: tipo,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: valores
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: tipo === "pie" }
                }
            }
        }
    );

}



// ======================================================
// VÍTIMAS
// ======================================================

function graficoIdadeVitimas(){

    const dados = histograma(

        vitimas.map(v=>Number(v["Idade da vítima"]))

    );

    criarGrafico(

        "idadeVitimas",

        "bar",

        Object.keys(dados),

        Object.values(dados),

        "Vítimas"

    );

}



function graficoSexoVitimas(){

    const dados = contar(

        vitimas.map(v=>v["Gênero da vítima"])

    );

    criarGrafico(

        "sexoVitimas",

        "pie",

        Object.keys(dados),

        Object.values(dados),

        "Sexo"

    );

}



function graficoFaixaVitimas(){

    const dados = contar(

        vitimas.map(v=>v["faixa etaria"])

    );

    criarGrafico(

        "faixaVitimas",

        "bar",

        Object.keys(dados),

        Object.values(dados),

        "Faixa"

    );

}



function graficoLocalVitimas(){

    const dados = contar(

        vitimas.map(v=>v["Tipo de local"])

    );

    criarGrafico(

        "localVitimas",

        "bar",

        Object.keys(dados),

        Object.values(dados),

        "Tipo"

    );

}



// ======================================================
// INDICIADOS
// ======================================================

function graficoIdadeIndiciados(){

    const dados = histograma(

        indiciados.map(

            i=>Number(i["Idade do Indiciado/suspeito"])

        )

    );

    criarGrafico(

        "idadeIndiciados",

        "bar",

        Object.keys(dados),

        Object.values(dados),

        "Indiciados"

    );

}



function graficoSexoIndiciados(){

    const dados = contar(

        indiciados.map(

            i=>i["Gênero do Indiciado/suspeito"]

        )

    );

    criarGrafico(

        "sexoIndiciados",

        "pie",

        Object.keys(dados),

        Object.values(dados),

        "Sexo"

    );

}



function graficoFaixaIndiciados(){

    const dados = contar(

        indiciados.map(

            i=>i["faixa etaria"]

        )

    );

    criarGrafico(

        "faixaIndiciados",

        "bar",

        Object.keys(dados),

        Object.values(dados),

        "Faixa"

    );

}



function graficoRelacionamento(){

    const dados = contar(

        indiciados.map(

            i=>i["Relacionamento"]

        )

    );

    criarGrafico(

        "relacionamento",

        "bar",

        Object.keys(dados),

        Object.values(dados),

        "Relacionamento"

    );

}