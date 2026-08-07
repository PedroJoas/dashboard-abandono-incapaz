// =====================================================
// VARIÁVEIS GLOBAIS
// =====================================================

let vitimas = [];
let indiciados = [];


// =====================================================
// CARREGA UM CSV
// =====================================================

function carregarCSV(caminho){

    return new Promise((resolve, reject)=>{

        Papa.parse(caminho,{

            download:true,

            header:true,

            skipEmptyLines:true,

            complete:(resultado)=>{

                resolve(resultado.data);

            },

            error:(erro)=>{

                reject(erro);

            }

        });

    });

}



// =====================================================
// LIMPEZA DOS DADOS
// =====================================================

function prepararVitimas(){

    vitimas.forEach(v=>{

        v["Idade da vítima"] =
            Number(v["Idade da vítima"]);

    });

}


function prepararIndiciados(){

    indiciados.forEach(i=>{

        i["Idade do Indiciado/suspeito"] =
            Number(i["Idade do Indiciado/suspeito"]);

    });

}



// =====================================================
// INICIALIZA O DASHBOARD
// =====================================================

async function iniciarDashboard(){

    try{

        vitimas =
            await carregarCSV("dados/vitimas.csv");

        indiciados =
            await carregarCSV("dados/indiciados.csv");


        prepararVitimas();

        prepararIndiciados();

        // Gera os gráficos após os dados serem preparados
        if(typeof gerarGraficos === "function" && (vitimas.length > 0 || indiciados.length > 0)){
            gerarGraficos();
        }


        console.log("Vitimas carregadas:", vitimas.length);

        console.log("Indiciados carregados:", indiciados.length);


        // ======================
        // CARDS
        // ======================

        if(typeof atualizarCards === "function"){
            atualizarCards();
        }


        // ======================
        // MAPA (opcional)
        // ======================
        if(typeof iniciarMapa === "function"){
            iniciarMapa();
        }


    }

    catch(erro){

        console.error(erro);

        alert("Erro ao carregar os arquivos: " + (erro && erro.message ? erro.message : erro));

    }

}



// =====================================================
// EVENTO DO SELECT (opcional)
// =====================================================

const _tipoMapaEl = document.getElementById("tipoMapa");
if(_tipoMapaEl){
    _tipoMapaEl.addEventListener("change", function(){
        if(typeof trocarMapa === "function"){
            trocarMapa(this.value);
        }
    });
}



// =====================================================
// INÍCIO
// =====================================================

document.addEventListener("DOMContentLoaded",()=>{

    iniciarDashboard();

});