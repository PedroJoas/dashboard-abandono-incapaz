import pandas as pd
import geopandas as gpd
from shapely import wkt
from pathlib import Path


PASTA = Path("dados")


# =====================================================
# CONFIGURAÇÃO DOS ARQUIVOS
# =====================================================

arquivos = {

    "casos_municipios_shape.csv": {

        "nome": "nm_municipio",
        "territorio": "nm_ais",
        "crs": "auto"

    },


    "taxa_faltantes_mun_geometry.csv": {

        "nome": "nm_municipio",
        "territorio": "nm_ais_x",
        "crs": "auto"

    },


    "casos_ais_shape.csv": {

        "nome": "nm_ais",
        "territorio": "TERRITORIO",
        "crs": "EPSG:31984"

    },


    "casos_fortaleza_shape.csv": {

        "nome": "NM_AIS",
        "territorio": "TERRITORIO",
        "crs": "EPSG:31984"

    }

}



# =====================================================
# PROCURA CRS DOS MUNICÍPIOS
# =====================================================

def descobrir_crs(df):

    candidatos = [

        "EPSG:31983",
        "EPSG:31984",
        "EPSG:31985",
        "EPSG:32723",
        "EPSG:32724",
        "EPSG:32725"

    ]


    for crs in candidatos:


        gdf = gpd.GeoDataFrame(
            df.copy(),
            geometry="geometry",
            crs=crs
        )


        teste = gdf.to_crs(4326)


        ponto = teste.geometry.centroid.iloc[0]


        lon = ponto.x
        lat = ponto.y


        # Ceará aproximadamente
        if (
            -42 < lon < -37
            and
            -9 < lat < -2
        ):

            print(
                "CRS encontrado:",
                crs
            )

            return crs



    raise Exception(
        "Nenhum CRS compatível encontrado"
    )



# =====================================================
# CONVERSÃO
# =====================================================


for arquivo, config in arquivos.items():


    print("\nConvertendo:", arquivo)


    df = pd.read_csv(
        PASTA / arquivo
    )


    # transforma WKT

    df["geometry"] = df["geometry"].apply(
        wkt.loads
    )



    # --------------------------------------
    # Define CRS
    # --------------------------------------

    if config["crs"] == "auto":

        crs = descobrir_crs(df)

    else:

        crs = config["crs"]



    gdf = gpd.GeoDataFrame(

        df,

        geometry="geometry",

        crs=crs

    )


    print(
        "CRS original:",
        gdf.crs
    )


    # --------------------------------------
    # Conversão para Leaflet
    # --------------------------------------

    gdf = gdf.to_crs(
        "EPSG:4326"
    )


    print(
        "Bounds:",
        gdf.total_bounds
    )



    # --------------------------------------
    # Renomeia colunas
    # --------------------------------------

    gdf = gdf.rename(

        columns={

            config["nome"]:
                "nome",

            config["territorio"]:
                "territorio",

            "count":
                "casos",

            "POPULAÇÃO":
                "populacao",

            "total":
                "populacao",

            "taxa_por_100_mil_habitantes":
                "taxa",

            "class_taxa":
                "classe"

        }

    )



    # Remove centroid caso exista

    if "centroid" in gdf.columns:

        gdf = gdf.drop(
            columns=["centroid"]
        )



    # --------------------------------------
    # Mantém somente necessário
    # --------------------------------------

    colunas = [

        "nome",
        "territorio",
        "casos",
        "populacao",
        "taxa",
        "classe",
        "geometry"

    ]


    gdf = gdf[
        [
            c for c in colunas
            if c in gdf.columns
        ]
    ]



    # --------------------------------------
    # Exporta GeoJSON
    # --------------------------------------

    saida = arquivo.replace(
        ".csv",
        ".geojson"
    )


    gdf.to_file(

        PASTA / saida,

        driver="GeoJSON"

    )


    print(
        "Criado:",
        saida
    )


print("\nConversão finalizada!")