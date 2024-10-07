let block = document.getElementById("block");
let character = document.getElementById("character");
let element1 = document.getElementById("element1");
let element2 = document.getElementById("element2");

let isJumping = false;
let counter = 0;
let blockPositionLeft = 500;
let blockSpeed = 20;
let isGameOver = false;
let isPaused = false;
let gameWidth = 750;
let intervalId; 


document.addEventListener("keydown", (event) => {
    if (!isGameOver && !isPaused) { 
        switch (event.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
        }
    }
});

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") { 
        jumpCharacter();
        jumpElement1();
        jumpElement2();
    }
});

function jumpCharacter() {
    if (!isJumping) {
        isJumping = true;
        character.classList.add("animate");
        setTimeout(() => {
            character.classList.remove("animate");
            isJumping = false;
        }, 500);
    }
}

function jumpElement1() {
    if (!element1.classList.contains("animate")) {
        element1.classList.add("animate");
        setTimeout(() => {
            element1.classList.remove("animate");
        }, 500);
    }
}

function jumpElement2() {
    if (!element2.classList.contains("animate")) {
        element2.classList.add("animate");
        setTimeout(() => {
            element2.classList.remove("animate");
        }, 500);
    }
}

function moveLeft() {
    blockPositionLeft -= blockSpeed;
    if (blockPositionLeft < 0) { 
        blockPositionLeft = gameWidth;
    }
    block.style.left = blockPositionLeft + "px";
}

function moveRight() {
    blockPositionLeft += blockSpeed;
    if (blockPositionLeft > gameWidth) { 
        blockPositionLeft = 0;
    }
    block.style.left = blockPositionLeft + "px";
}

// Função para pausar e despausar o jogo
document.getElementById("pauseButton").addEventListener("click", () => {
    if (isPaused) {
        resumeGame(); // Retoma o jogo se estiver pausado
    } else {
        pauseGame(); // Pausa o jogo se estiver rodando
    }
});

// Função para pausar o jogo
function pauseGame() {
    isPaused = true;
    clearInterval(intervalId); // Para a checagem de colisões e a pontuação
    document.getElementById("pauseButton").innerText = "Despausar"; // Atualiza o texto do botão
}

// Função para despausar o jogo
function resumeGame() {
    isPaused = false;
    intervalId = setInterval(checkDead, 10); // Retoma a checagem de colisões e a pontuação
    document.getElementById("pauseButton").innerText = "Pausar"; // Atualiza o texto do botão
}

function resetBlock() {
    blockPositionLeft = 500; 
    block.style.left = blockPositionLeft + "px";
    isGameOver = false; 
    counter = 0; 
    document.getElementById("scoreSpan").innerText = "0";
}

function gameOver(message) {
    alert(message);
    isGameOver = true; 
    setTimeout(resetBlock, 100); 
}

const checkDead = setInterval(() => {
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    const element1Top = parseInt(window.getComputedStyle(element1).getPropertyValue("top"));
    const element2Top = parseInt(window.getComputedStyle(element2).getPropertyValue("top"));
    const blockLeft = blockPositionLeft; 

    if (blockLeft < 30 && blockLeft > 0 && characterTop >= 130) {
        gameOver("Fim de jogo. Personagem Vermelho colidiu! Pontuação: " + Math.floor(counter / 100));
    }
    
    else if (blockLeft < 220 && blockLeft > 180 && element1Top >= 130) {
        gameOver("Fim de jogo. Bloco Amarelo colidiu! Pontuação: " + Math.floor(counter / 100));
    }
    
    else if (blockLeft < 470 && blockLeft > 430 && element2Top >= 130) {
        gameOver("Fim de jogo. Bloco Verde colidiu! Pontuação: " + Math.floor(counter / 100));
    } 
    
    else if (!isGameOver && !isPaused) {
        
        counter++;
        document.getElementById("scoreSpan").innerText = Math.floor(counter / 100);
    }
}, 10);

// o jogo só reseta depois de dar ok 3x na caixa de diálogo e eu não sei pq
// o bloco azul não quer colidir com o vermelho e eu também não sei pq, isso só acontece quando
//mudo o tamanho do espaço de colisão para 20
//bloco vermelho em espaço de colisão 30 e 40 as vzs bugam e ficam mto maiores do que eram pra ser,
// como o 20 simplesmente não funciona vou deixar 30 mesmo