// =====================================================
// RETORNA A MÉDIA DE UMA COLUNA NUMÉRICA
// =====================================================

function calcularMedia(vetor) {

    const valores = vetor.filter(v => !isNaN(v));

    if (valores.length === 0)
        return 0;

    const soma = valores.reduce((a, b) => a + b, 0);

    return soma / valores.length;

}



// =====================================================
// ATUALIZA TODOS OS CARDS
// =====================================================

function atualizarCards() {

    //---------------------------------------
    // Quantidade de vítimas
    //---------------------------------------

    document.getElementById("totalVitimas").textContent =
        vitimas.length.toLocaleString("pt-BR");



    //---------------------------------------
    // Quantidade de indiciados
    //---------------------------------------

    document.getElementById("totalIndiciados").textContent =
        indiciados.length.toLocaleString("pt-BR");



    //---------------------------------------
    // Idade média das vítimas
    //---------------------------------------

    const idadeVitimas =
        vitimas.map(v => v["Idade da vítima"]);

    const mediaVitimas =
        calcularMedia(idadeVitimas);

    document.getElementById("idadeMediaVitimas").textContent =
        mediaVitimas.toFixed(1) + " anos";



    //---------------------------------------
    // Idade média dos indiciados
    //---------------------------------------

    const idadeIndiciados =
        indiciados.map(i => i["Idade do Indiciado/suspeito"]);

    const mediaIndiciados =
        calcularMedia(idadeIndiciados);

    document.getElementById("idadeMediaIndiciados").textContent =
        mediaIndiciados.toFixed(1) + " anos";



    //---------------------------------------
    // Mulheres vítimas
    //---------------------------------------

    const mulheres =
        vitimas.filter(v =>
            (v["Gênero da vítima"] || "").trim().toLowerCase() === "feminino"
        ).length;



    //---------------------------------------
    // Homens vítimas
    //---------------------------------------

    const homens =
        vitimas.filter(v =>
            (v["Gênero da vítima"] || "").trim().toLowerCase() === "masculino"
        ).length;



    //---------------------------------------
    // Percentuais
    //---------------------------------------

    const totalSexo = mulheres + homens;

    const percMulheres =
        totalSexo === 0 ? 0 : mulheres * 100 / totalSexo;

    const percHomens =
        totalSexo === 0 ? 0 : homens * 100 / totalSexo;



    document.getElementById("percMulheres").textContent =
        percMulheres.toFixed(1) + "%";


    document.getElementById("percHomens").textContent =
        percHomens.toFixed(1) + "%";

}