# 🏎️ Simulador de Corrida Mario Kart

Projeto desenvolvido como parte do bootcamp **Meu Tudo Mobile** da [DIO](https://www.dio.me).

## 📋 Descrição

Este projeto simula uma corrida de kart com múltiplos pilotos, utilizando lógica de programação e manipulação de dados em JavaScript. A corrida é dinâmica e cheia de surpresas, com diferentes tipos de blocos e interações entre os personagens.

## 🎮 Funcionalidades

- Adicionados 4 novos personagens: **Peach, Bowser, Yoshi e Toad**, totalizando **6 corredores jogáveis**.
- O jogo sorteia automaticamente **dois personagens diferentes** para competir em cada corrida.
- Cada rodada sorteia aleatoriamente o tipo de bloco da pista:
  - **Reta**: teste de velocidade.
  - **Curva**: teste de manobrabilidade.
  - **Confronto**: sorteio entre "Casco" (−1 ponto) ou "Bomba" (−2 pontos).
- O vencedor do confronto pode receber um **bônus de turbo** (+1 ponto extra) aleatoriamente.
- A **pontuação** é calculada conforme o desempenho em cada rodada/bloco.
- Ao final da corrida, é exibido o **resultado e o vencedor**, ou **empate** caso ocorra.

## 🚀 Tecnologias utilizadas

- Node.js
- JavaScript

## 📦 Como executar

```bash
# Clonar o repositório
git clone https://github.com/cdaguiar23/dio-mario-kart.git

# Entrar na pasta
cd dio-mario-kart/src

# Executar o projeto
node index.js


