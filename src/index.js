const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0
}

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0
}

const player3 = {
  NOME: "Peach",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0
}

const player4 = {
  NOME: "Bowser",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0
}

const player5 = {
  NOME: "Yoshi",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 3,
  PODER: 2,
  PONTOS: 0
}

const player6 = {
  NOME: "Toad",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 5,
  PODER: 2,
  PONTOS: 0
}

// Função para rolar dado
async function rollDice() {
  return Math.floor(Math.random() * 6) +1
}

// Função para sortear bloco da pista
async function getRandomBlock() {
  let random = Math.random()
  let result
  switch(true) {
    case random < 0.33:
      result = "RETA"
      break
    case random < 0.66:
      result = "CURVA"
      break
    default:
      result = "CONFRONTO"
  }
  return result
}

// Função para sortear tipo de confronto
function getConfrontType() {
  return Math.random() < 0.5 ? "CASCO" : "BOMBA";
}

// Função para sortear turbo
function turboBonus() {
  return Math.random() < 0.5 ? 1 : 0;
}

async function logRollResult(charactername, block, diceResult, attribute) {
  console.log(`${charactername} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`Rodada ${round}`)
    
    // sortear bloco
    let block = await getRandomBlock()
    console.log(`Bloco: ${block}`)
    
    // rolar os dados
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()
    
    // teste de habilidade
    let totalTestSkill1 = 0
    let totalTestSkill2 = 0
    
    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE
      
      await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE)
      await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE)
    }
    
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE
      
      await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE)
      await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE)
    }
    
    if (block === "CONFRONTO") {
      let tipoConfronto = getConfrontType();
      let pontosPerda = tipoConfronto === "CASCO" ? 1 : 2;
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;
      
      console.log(`${character1.NOME} confrontou com ${character2.NOME} usando ${tipoConfronto}`);
      
      await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
      await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        character2.PONTOS -= pontosPerda;
        if (character2.PONTOS < 0) character2.PONTOS = 0;
        let turbo = turboBonus();
        character1.PONTOS += turbo;
        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu ${pontosPerda} ponto(s)`);
        if (turbo) console.log(`${character1.NOME} ganhou TURBO (+1 ponto extra)!`);
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        character1.PONTOS -= pontosPerda;
        if (character1.PONTOS < 0) character1.PONTOS = 0;
        let turbo = turboBonus();
        character2.PONTOS += turbo;
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu ${pontosPerda} ponto(s)`);
        if (turbo) console.log(`${character2.NOME} ganhou TURBO (+1 ponto extra)!`);
      }
      
      if (powerResult2 === powerResult1) {
        console.log("Confronto empatado! Nenhum ponto foi perdido");
      }
    }
    
    // Verificando o vencedor do bloco
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`)
      character1.PONTOS++
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`)
      character2.PONTOS++
    }
    
    console.log("---------------------------------")
  }
}

async function declareWinner(character1, character2) {
  console.log(`Resultado final:`)
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)
  
  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns!`)
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns!`)
  } else {
    console.log("A corrida terminou em empate")
  }
}

(async function main() {
  const players = [player1, player2, player3, player4, player5, player6];
  // Sorteia 2 personagens diferentes
  const [char1, char2] = players.sort(() => 0.5 - Math.random()).slice(0, 2);
  console.log(`Corrida entre ${char1.NOME} e ${char2.NOME} começando...\n`)
  
  await playRaceEngine(char1, char2)
  await declareWinner(char1, char2)
})()