# Dashboard - Abandono de Pessoas Incapazes no Ceará

![Status](https://img.shields.io/badge/status-active-blue)
![Período](https://img.shields.io/badge/período-2015%20a%202025-green)
![Linguagem](https://img.shields.io/badge/linguagens-HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20Python-orange)

## Acessar o Dashboard

**[Abrir Dashboard - GitHub Pages](https://pedrojoas.github.io/dashboard-abandono-incapaz/index.html)**

---

## Sobre o Projeto

Dashboard interativo desenvolvido como projeto de **Iniciação Científica na Universidade Federal do Ceará (UFC)**, que apresenta uma análise detalhada dos casos de Abandono de Pessoas Incapazes no estado do Ceará.

O projeto oferece visualizações geográficas e temporais dos dados criminais, permitindo explorar padrões e tendências através de:
- **Mapas interativos** por município e AIS (Áreas Integradas de Segurança)
- **Série temporal** da evolução dos casos
- **Análises de dados faltantes** e inconsistências
- **Filtros dinâmicos** para exploração customizada dos dados

**Período de análise:** Janeiro/2015 a Novembro/2025

---

## Pages do Dashboard

### [index.html](https://pedrojoas.github.io/dashboard-abandono-incapaz/index.html) - Dashboard Principal

Página principal do projeto com visualizações geográficas e estatísticas gerais.

**Funcionalidades:**
- Mapa interativo dos municípios e AIS do Ceará
- Cards informativos com estatísticas resumidas
- Gráficos de distribuição por região
- Filtros por período e categoria
- Informações ao passar o mouse sobre regiões

**Módulos JavaScript:**
- `main.js` - Inicialização e coordenação geral
- `mapa.js` - Gestão de mapas com Leaflet
- `cards.js` - Componentes de informação rápida
- `filtros.js` - Sistema de filtros dinâmicos

---

### analises.html - Análises Complementares

Página com análises mais detalhadas e exploratórias dos dados.

**Funcionalidades:**
- Análises multidimensionais
- Comparativas entre períodos
- Tabelas de dados detalhadas
- Gráficos avançados
- Exportação de dados

**Módulos JavaScript:**
- `graficos.js` - Geração de gráficos diversos

---

### temporal.html - Série Temporal

Página dedicada à análise temporal dos casos ao longo do período estudado.

**Funcionalidades:**
- Gráficos de série temporal completa (2015-2025)
- Análise de tendências
- Comparação de períodos
- Série temporal específica de crianças
- Série temporal de Fortaleza

**Dados Utilizados:**
- `serie_temporal_completa.csv` - Todos os casos
- `serie_temporal_criancas.csv` - Casos envolvendo menores
- `serie_temporal_fortaleza.csv` - Dados da capital

**Módulos JavaScript:**
- `temporal.js` - Lógica de séries temporais

---

## Projeto Acadêmico

**Instituição:** Universidade Federal do Ceará (UFC)  
**Programa:** Iniciação Científica  

---

