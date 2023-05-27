const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_PLAYER_HEAL= 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
const enteredValue = prompt('max life for u and moster', '100');

let chosenMazxLife = parseInt(enteredValue);
let currentMonsterHealth = chosenMazxLife;
let currentPlayerHealth = chosenMazxLife;
let hasBonusLife = true;
let battleLog=[];


if (isNaN(chosenMazxLife) || chosenMazxLife <= 0) {
  chosenMazxLife = 100;
}

adjustHealthBars(chosenMazxLife);

function writeToLog(ev, val, monsterHealth, playerHealth){
  let logEntrt={
    event: ev,
    value: val,
    target: 'MONSTER',
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth : playerHealth

  };
  if(ev === LOG_EVENT_PLAYER_ATTACK){
   logEntrt.target = 'MONSTER';

  }else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
    logEntrt={
      event: ev,
      value: val,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth : playerHealth

    };
    

  }else if(ev === LOG_EVENT_MONSTER_ATTACK){
    logEntrt={
    event: ev,
    value: val,
    target: 'PLAYER',
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth : playerHealth

  };
  

  }else if(ev=== LOG_PLAYER_HEAL){
    logEntrt={
      event: ev,
      value: val,
      target: 'PLAYER ',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth : playerHealth

    };
    
  }else if(ev=== LOG_EVENT_GAME_OVER){
    logEntrt={
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth : playerHealth

    };
    
  }
  battleLog.push(logEntrt);
}

function reset() {
  let currentMonsterHealth = chosenMazxLife;
  let currentPlayerHealth = chosenMazxLife;
  resetGame(chosenMazxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('bonus claimed');

  }


  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('you win!');
    writeToLog(LOG_EVENT_GAME_OVER, 'player won', currentMonsterHealth, currentPlayerHealth);

  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('monster lost');
    writeToLog(LOG_EVENT_GAME_OVER, 'monster won', currentMonsterHealth, currentPlayerHealth);

  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('you draw');
    writeToLog(LOG_EVENT_GAME_OVER, 'draw', currentMonsterHealth, currentPlayerHealth);

  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMoster(mode) {
  let maxDamage = ATTACK_VALUE;
  let logEvent;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent,  damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}



function attackHandler() {
  attackMoster('ATTACK');
}
function strongAttackHandler() {
  attackMoster('STRONG_ATTACK');
}
function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMazxLife - HEAL_VALUE) {
    alert('you cant heal any more');
    healValue = chosenMazxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(LOG_PLAYER_HEAL,  healValue, currentMonsterHealth, currentPlayerHealth);

  endRound();

}

function printLogHandler(){
  console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click',printLogHandler);