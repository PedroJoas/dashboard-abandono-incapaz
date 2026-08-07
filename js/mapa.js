// =====================================================
// VARIÁVEIS GLOBAIS
// =====================================================

let mapa;
let camadaMapa;
let legenda;

let valorMin = 0;
let valorMax = 0;


// =====================================================
// INICIALIZA O MAPA
// =====================================================

function iniciarMapa() {

    mapa = L.map("map", {
        zoomControl: true
    });


    mapa.setView([-5.2, -39.5], 7);


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap"
        }
    ).addTo(mapa);


    criarLegenda();


    trocarMapa("municipios");

}



// =====================================================
// CARREGA GEOJSON
// =====================================================

async function carregarGeoJSON(caminho){

    const resposta = await fetch(caminho);

    return await resposta.json();

}



// =====================================================
// TROCA O MAPA
// =====================================================

async function trocarMapa(tipo){


    if(camadaMapa){

        mapa.removeLayer(camadaMapa);

    }


    let arquivo;


    switch(tipo){


        case "municipios":

            arquivo =
                "dados/casos_municipios_shape.geojson";

            break;


        case "ais":

            arquivo =
                "dados/casos_ais_shape.geojson";

            break;


        case "fortaleza":

            arquivo =
                "dados/casos_fortaleza_shape.geojson";

            break;


        default:

            arquivo =
                "dados/casos_municipios_shape.geojson";

    }



    const geojson =
        await carregarGeoJSON(arquivo);



    // ------------------------------------------
    // Calcula escala do mapa atual
    // ------------------------------------------

    const valores = geojson.features

        .filter(
            f => Number(f.properties.casos) > 0
        )

        .map(
            f => Number(f.properties.taxa)
        )

        .filter(
            v => !isNaN(v)
        );



    valorMin = Math.min(...valores);

    valorMax = Math.max(...valores);



    // ------------------------------------------
    // Atualiza legenda
    // ------------------------------------------

    atualizarLegenda();



    camadaMapa = L.geoJSON(
        geojson,
        {

            style: estilo,

            onEachFeature:onEachFeature

        }

    ).addTo(mapa);



    mapa.fitBounds(
        camadaMapa.getBounds()
    );

}



// =====================================================
// ESCALA DE CORES DINÂMICA
// =====================================================

function getColor(valor, casos){


    // Sem casos
    if(Number(casos) === 0){

        return "#d9d9d9";

    }

    
    if(valorMax === valorMin){

        return "#fff7bc";

    }


    const percentual =

        (valor - valorMin) /
        (valorMax - valorMin);



    return percentual > 0.85 ? "#7f0000" :

           percentual > 0.70 ? "#b30000" :

           percentual > 0.55 ? "#e34a33" :

           percentual > 0.40 ? "#fc8d59" :

           percentual > 0.25 ? "#fdbb84" :

           percentual > 0.10 ? "#fdd49e" :

                                "#fff7bc";

}


// =====================================================
// ESTILO DAS REGIÕES
// =====================================================

function estilo(feature){


    return {

        fillColor:
            getColor(
                Number(feature.properties.taxa),
                Number(feature.properties.casos)
            ),


        weight:1,

        opacity:1,

        color:"#666",

        fillOpacity:0.8

    };


}



// =====================================================
// HIGHLIGHT
// =====================================================

function destacar(e){


    const layer = e.target;


    layer.setStyle({

        weight:3,

        color:"#000",

        fillOpacity:1

    });


    layer.bringToFront();

}



function resetar(e){

    camadaMapa.resetStyle(e.target);

}



function zoomFeature(e){

    mapa.fitBounds(
        e.target.getBounds()
    );

}



// =====================================================
// POPUP
// =====================================================

function onEachFeature(feature, layer){


    const p = feature.properties;


    layer.bindPopup(`

        <h3>${p.nome}</h3>

        <hr>

        <b>Território:</b>
        ${p.territorio ?? "-"}
        <br>


        <b>Casos:</b>
        ${p.casos}
        <br>


        <b>População:</b>
        ${
            Number(p.populacao)
            .toLocaleString("pt-BR")
        }

        <br>


        <b>Taxa:</b>

        ${Number(p.taxa).toFixed(2)}

        vítimas/100 mil habitantes

        <br>


        <b>Classe:</b>
        ${p.classe ?? "-"}

    `);



    layer.on({

        mouseover:destacar,

        mouseout:resetar,

        click:zoomFeature

    });


}



// =====================================================
// LEGENDA
// =====================================================

function criarLegenda(){


    legenda = L.control({

        position:"bottomright"

    });



    legenda.onAdd = function(){


        const div =
            L.DomUtil.create(
                "div",
                "legend"
            );


        return div;


    };


    legenda.addTo(mapa);


}



// =====================================================
// ATUALIZA LEGENDA
// =====================================================

function atualizarLegenda(){


    if(!legenda) return;



    const div =
        legenda.getContainer();



    div.innerHTML = `

    <b>Taxa por 100 mil habitantes</b>

    <br><br>


    <i style="
    background:#d9d9d9;
    width:18px;
    height:18px;
    display:inline-block;">
    </i>

    Sem casos

    <br>


    <i style="
    background:#fff7bc;
    width:18px;
    height:18px;
    display:inline-block;">
    </i>

    Baixa

    <br>


    <i style="
    background:#fdbb84;
    width:18px;
    height:18px;
    display:inline-block;">
    </i>

    Média

    <br>


    <i style="
    background:#e34a33;
    width:18px;
    height:18px;
    display:inline-block;">
    </i>

    Alta

    <br>


    <i style="
    background:#7f0000;
    width:18px;
    height:18px;
    display:inline-block;">
    </i>

    Muito alta


    <br><br>


    Mín:
    ${valorMin.toFixed(2)}

    <br>

    Máx:
    ${valorMax.toFixed(2)}

    `;


}