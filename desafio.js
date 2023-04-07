/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */

// const startGame = true;



const playBlackJack = () => {
   const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
   const suits = ['♦️', '♥️', '♣️', '♠️'];



   const getRandomCard = () => {
      const randomValue = values[Math.floor(Math.random() * values.length)];
      const randomSuits = suits[Math.floor(Math.random() * suits.length)];
      return { suit: randomSuits, value: randomValue };
   }

   const getPoints = (cards) => {
      let points = 0;
      let aCards = 0;

      for (let card of cards) {
         if (card.value === 'A') {
            aCards++;
            points += 11;
         } else if (['J', 'Q', 'K'].includes(card.value)) {
            points += 10;
         } else {
            points += parseInt(card.value);
         }

         while (points > 21 && aCards > 0) {
            points -= 10;
            aCards--;
         };
      };
      return points;
   };
   //aqui tem que ser let porque se não, caso queiram comprar mais cartas não teria como mudar
   let userCards = [getRandomCard(), getRandomCard()];
   let botCards = [getRandomCard(), getRandomCard()];

   let userPoints = getPoints(userCards);
   let botPoints = getPoints(botCards);

   console.log('Cartas do usuário:', userCards, 'Pontos do usuário:', userPoints);
   
   console.log('Cartas do BOT:', botCards[0]);

   console.log('Carta escondida do BOT:', botCards[1], 'pontos do BOT:', botPoints);

   let buyCard = confirm('Deseja comprar outra carta?');
   while (buyCard && userPoints <= 21) {
      userCards.push(getRandomCard());
      userPoints = getPoints(userCards);
      console.log('Cartas do usuário:' ,userCards, 'Pontos do Usuário:' ,userPoints);
      if (userPoints <= 21) {
         buyCard = confirm('Deseja comprar outra carta?');
      }
   }

   buyCard = true;
   while (buyCard && botPoints <= 21) {
      botCards.push(getRandomCard());
      botPoints = getPoints(botCards);
      if (botPoints <= 17) {
         console.log('O bot comprou outra carta');
      } else {
         buyCard = false;
         console.log('O bot não quer mais cartas');
      }
   }

   console.log('Cartas do usuário: ',userCards, 'Pontos do usuário:' ,userPoints);
   console.log('Cartas do BOT: ',botCards, 'pontos do BOT:' ,botPoints);
   if (userPoints > 21 && botPoints > 21) {
      console.log('Deu empate');
   } else if (userPoints > 21) {
      console.log('Passou de 21, você perdeu');
   } else if (botPoints > 21) {
      console.log('o bot passou de 21, você ganhou');
   } else if (userPoints === botPoints) {
      console.log('Empate');
   } else if (userPoints > botPoints) {
      console.log('Você ganhou');
   } else {
      console.log('Você perdeu');
   }

};

const startGame = confirm('Welcome to the blackJack game!\nVocê quer começar um novo jogo?');
if (startGame === false) {
   alert('ok, game over');
} else {
   playBlackJack();
}
