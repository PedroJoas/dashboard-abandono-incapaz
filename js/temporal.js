// =====================================================
// CONFIGURAÇÃO
// =====================================================

let graficoCompleto;
let graficoComparacao;



// =====================================================
// CARREGA CSV
// =====================================================

function carregarCSV(caminho){

    return new Promise((resolve,reject)=>{


        Papa.parse(
            caminho,
            {

                download:true,

                header:true,

                skipEmptyLines:true,


                complete:(resultado)=>{

                    resolve(resultado.data);

                },


                error:(erro)=>{

                    reject(erro);

                }

            }
        );


    });

}




// =====================================================
// FORMATA DATA
// =====================================================

function formatarData(data){

    const partes =
        data.split("-");


    return `${partes[1]}/${partes[0]}`;

}





// =====================================================
// PREPARA DADOS
// =====================================================

function prepararSerie(dados){


    return dados.map(
        d => ({

            data:
                formatarData(d.ano_mes),


            valor:
                Number(
                    d["count"]
                )

        })

    );


}





// =====================================================
// GRÁFICO PRINCIPAL
// =====================================================

function criarGraficoCompleto(dados){


    const ctx =
        document
        .getElementById(
            "serieCompleta"
        );



    graficoCompleto =
    new Chart(
        ctx,
        {


        type:"line",


        data:{


            labels:
                dados.map(
                    d=>d.data
                ),


        datasets:[


        {

        label:"Casos registrados",

        data:
        dados.map(
            d=>d.valor
        ),

        tension:0.3

        },


        {

        label:"Média móvel (3 meses)",

        data:
        mediaMovel(
            dados.map(
                d=>d.valor
            )
        ),

        tension:0.3

        }


        ]


        },


        options:{


            responsive:true,
            maintainAspectRatio:false,


            plugins:{


                legend:{
                    display:true,
                    align:"start"
                }

            },


            scales:{


                y:{


                    beginAtZero:true,


                    title:{

                        display:true,

                        text:"Quantidade de casos"

                    }

                }


            }


        }


    });


}





// =====================================================
// COMPARAÇÃO
// =====================================================

function criarComparacao(
    completa,
    criancas,
    fortaleza
){


    const meses = completa.map(
        d => d.data
    );



    const valoresCriancas =
        meses.map(
            mes => {

                const item =
                    criancas.find(
                        d => d.data === mes
                    );


                return item ? item.valor : 0;

            }
        );



    const valoresFortaleza =
        meses.map(
            mes => {

                const item =
                    fortaleza.find(
                        d => d.data === mes
                    );


                return item ? item.valor : 0;

            }
        );



    const ctx =
        document.getElementById(
            "comparacaoSeries"
        );



    graficoComparacao =
    new Chart(
        ctx,
        {


        type:"line",


        data:{


            labels: meses,


            datasets:[


                {

                label:"Todos os casos",

                data:
                    completa.map(
                        d=>d.valor
                    ),

                tension:0.3

                },


                {

                label:"Crianças",

                data:
                    valoresCriancas,

                tension:0.3

                },


                {

                label:"Fortaleza",

                data:
                    valoresFortaleza,

                tension:0.3

                }


            ]


        },


        options:{


            responsive:true,

            maintainAspectRatio:false,


            plugins:{


                legend:{

                    align:"start"

                }


            },


            interaction:{

                mode:"index",

                intersect:false

            },


            scales:{


                y:{

                    beginAtZero:true

                },


                x:{

                    ticks:{

                        maxTicksLimit:12

                    }

                }


            }


        }


    });


}


function mediaMovel(valores, janela=3){

    return valores.map((_, i)=>{

        if(i < janela-1)
            return null;


        const grupo =
            valores.slice(
                i-janela+1,
                i+1
            );


        return grupo.reduce(
            (a,b)=>a+b,
            0
        ) / janela;

    });

}


// =====================================================
// CARDS
// =====================================================

function gerarIndicadores(dados){


    const valores =
        dados.map(
            d=>d.valor
        );


    const total =
        valores.reduce(
            (a,b)=>a+b,
            0
        );


    const media =
        total / valores.length;



    // pico mensal

    const maior =
        Math.max(...valores);


    const indiceMaior =
        dados.findIndex(
            d=>d.valor===maior
        );



    document.getElementById(
        "maiorMes"
    ).innerHTML =
    `${dados[indiceMaior].data}: ${maior}`;



    document.getElementById(
        "mediaMensal"
    ).innerHTML =
    media.toFixed(2);



    document.getElementById(
        "totalPeriodo"
    ).innerHTML =
    total;



    document.getElementById(
        "ultimoMes"
    ).innerHTML =
    dados[dados.length-1].data;



    // novo card pico

    document.getElementById(
        "picoMensal"
    ).innerHTML =
    `${dados[indiceMaior].data}: ${maior}`;



    // ano com maior quantidade

    const porAno={};


    dados.forEach(d=>{

        const ano =
            d.data.split("/")[1];


        porAno[ano] =
            (porAno[ano] || 0)
            + d.valor;

    });



    const anoMaior =
        Object.keys(porAno)
        .reduce(
            (a,b)=>
            porAno[a]>porAno[b]?a:b
        );



    document.getElementById(
        "anoMaior"
    ).innerHTML =
    `${anoMaior}: ${porAno[anoMaior]}`;



    // variação últimos 12 meses

    if(dados.length >= 24){


        const atual =

            dados.slice(-12)
            .reduce(
                (a,b)=>a+b.valor,
                0
            );


        const anterior =

            dados.slice(-24,-12)
            .reduce(
                (a,b)=>a+b.valor,
                0
            );


        const variacao =
            ((atual-anterior)/anterior)*100;



        document.getElementById(
            "variacaoAnual"
        ).innerHTML =
        `${variacao.toFixed(1)}%`;


    }


}



function criarSazonalidade(dados){


    const meses =
    [
        "Jan","Fev","Mar",
        "Abr","Mai","Jun",
        "Jul","Ago","Set",
        "Out","Nov","Dez"
    ];



    const valores =
    Array(12).fill(0);



    const quantidades =
    Array(12).fill(0);



    dados.forEach(d=>{


        const mes =
            Number(
                d.data.split("/")[0]
            )-1;


        valores[mes]+=d.valor;

        quantidades[mes]++;


    });



    const medias =
        valores.map(
            (v,i)=>
            v/quantidades[i]
        );



    new Chart(
        document.getElementById(
            "sazonalidade"
        ),
        {


        type:"bar",


        data:{

            labels:meses,

            datasets:[{

                label:
                "Média de casos",

                data:medias

            }]

        },


        options:{

            responsive:true,

            maintainAspectRatio:false

        }


        }

    );


}

// =====================================================
// INICIALIZA
// =====================================================

async function iniciarTemporal(){


const completa =
prepararSerie(
await carregarCSV(
"dados/serie_temporal_completa.csv"
)
);



const criancas =
prepararSerie(
await carregarCSV(
"dados/serie_temporal_criancas.csv"
)
);



const fortaleza =
prepararSerie(
await carregarCSV(
"dados/serie_temporal_fortaleza.csv"
)
);



criarGraficoCompleto(
    completa
);



criarComparacao(
    completa,
    criancas,
    fortaleza
);


criarSazonalidade(completa);

gerarIndicadores(
    completa
);



}



document.addEventListener(
"DOMContentLoaded",
iniciarTemporal
);