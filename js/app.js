console.log('JS Trial', this)


/// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ Mie Funzioni ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ \\\

// Funzione per la validazione del numero di cella della griglia
function getSize() {
    
    if(difficultySelectorDOMElement.value === '7'){
        size = 7;
    } else if(difficultySelectorDOMElement.value === '9'){
        size = 9;
    } else if((difficultySelectorDOMElement.value === '10' )){
        size = 10;
    } else{
        alert('NON GIOCARE COL MIO CODICE!')
        startButtonDOMElement.removeEventListener('click', gameClickStart);
    }

    return size
}


// Funzione per mostrare le bombe
function showBombs() {

    const allCells = document.querySelectorAll('.square')

    for (let index = 0; index < allCells.length; index++){
        const cellValue = parseInt(allCells[index].innerHTML)
        if(bombs.includes(cellValue)){
            allCells[index].classList.add('bg-red');
            allCells[index].innerHTML = 'BOOM';
        }
    }
}


// Funzione per la generazione di bombe
function generateBombs(){
    const min = 1;
    const max = size ** 2;
    const randomNumbers = 16;

    const randomUniqueNumbers = []

    while (randomUniqueNumbers.length < randomNumbers){

        // Genero un numero casuale in base alle vostanti dichiarate fuori
        let randomNumber = Math.floor(Math.random() * max) + min;
    
        // SE l'Array randomUniqueNumbers non ha all'interno (randomNumber) → il fatto che indichi l'assenza è dato dalla sua corrispondenza al false, quindi che la condizione dettata è falsa.
        if (randomUniqueNumbers.includes(randomNumber) === false){
            // Inserisco il numero generato nell'Array
            randomUniqueNumbers.push(randomNumber);
        }
    }
    

    return randomUniqueNumbers
    
}


// Funzione di generazione della Griglia
function gameClickStart(){

    let gridSide = getSize();
    const numOfCells = gridSide ** 2 // number → ** significa elevato a, quindi si ottiene 10 x 10  

    bombs = generateBombs()
    console.log(bombs)

    for(let i = 0; i < numOfCells; i++){

        const cellDOMElement = document.createElement('div');
        let divClass = 'easy' //string
        //console.dir(cellDOMElement)
        const cellNumber = i + 1; //number
        cellDOMElement.innerHTML = cellNumber; //string

        if(difficultySelectorDOMElement.value === '10'){
     
            divClass = 'hard'; //string
        
        } else if(difficultySelectorDOMElement.value === '9'){
      
            divClass = 'medium'; //string
           
        } 

        cellDOMElement.classList.add('square', divClass) //object
        gridDOMElement.appendChild(cellDOMElement) ////object

        
        cellDOMElement.addEventListener('contextmenu', rightClick)
        cellDOMElement.addEventListener('click', cellClick)  
        cellDOMElement.addEventListener('click', function(){
            if (score === numOfCells - bombs.length){
                alert('Complimenti hai completato il gioco!')
                let block = document.createElement('div');
                block.classList.add('block');
                gridDOMElement.append(block);
            }
        })
    }

    startButtonDOMElement.removeEventListener('click', gameClickStart);
}

// Funzione per il Reset della Griglia
function gameClickReset(){

    gridDOMElement.innerHTML= ''; //string
    scoreDOMElement.innerHTML = '0'; //string
    score = 0; //number
    startButtonDOMElement.addEventListener('click', gameClickStart);

}

// Funzione che determina cosa accade quando avviene un click sulla cella della griglia
function cellClick(){
    //console.log("cellClick", this.innerHTML);
    const cellDOMElement = this;
    const cellNumber = parseInt(cellDOMElement.innerHTML);

    // const allCells = document.getElementsByClassName('square')
    console.log('Hai clickato la cella numero ', cellNumber)
    for(let bombNumber = 0; bombNumber < bombs.length; bombNumber++){

        if(cellNumber !== bombs[bombNumber]){

            cellDOMElement.classList.add('bg-azure') //object

        } else{

            cellDOMElement.classList.add('bg-red');
            console.log('Mi dispiace, hai perso.');           
            cellDOMElement.onclick = alert(`Hai perso! il tuo punteggo è: ${score}`);
            let block = document.createElement('div');
            block.classList.add('block');
            gridDOMElement.append(block);
            bombs[bombNumber].click;
            showBombs()
        }
    }

    
    if(!cellDOMElement.classList.contains('bg-red')){
        score += 1;
        console.log('punteggio attuale: ' + score)
    } 

   
    scoreDOMElement.innerHTML = score;
    cellDOMElement.removeEventListener('click', cellClick)
}

// Funzione per le "bandierine"
function rightClick(){
    event.preventDefault(oncontextmenu)
    this.classList.toggle('bg-green')
}


/// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ Mie Funzioni ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ \\\








const gridDOMElement = document.getElementById('grid'); //object

const startButtonDOMElement = document.getElementById('generate-grid'); //object

const difficultySelectorDOMElement = document.getElementById('difficulty-selection') //object

const restartButtonDOMElement = document.getElementById('delete-grid') //object

const scoreDOMElement = document.getElementById('score') //object

let score = parseInt(scoreDOMElement.innerHTML)
let bombs = [];


// Creazione delle varie griglie tramite funzione definita sopra
startButtonDOMElement.addEventListener('click', gameClickStart);


// Reset delle griglie tramite funzione definita sopra
restartButtonDOMElement.addEventListener('click', gameClickReset);

