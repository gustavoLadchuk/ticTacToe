let turn = ['X', 'blue']
let slots = ['.','.','.','.','.','.','.','.','.']
let winner = 'none'
let winnerLine = [0, 0] //[0 = null / 1 = horizontal / 2 = vertical / 3 = diagonal, N da linha ou coluna / lado da diagonal]
let X_score = 0
let O_score = 0
let first = 'X'
let avaibleSlots = 9


function defineColor(){
    if (turn[0] == 'X'){
        turn[1] = 'blue'
    }else{
        turn[1] = 'red'
    }
}

function toggleDisabledAll(value){
    let b = ''
    for (let i = 1; i <= 9; i++){
        b = String(i)
        document.getElementById(b).disabled = value
        if (value == true){
            document.getElementById(b).classList.remove('selectable')
        }else{
            document.getElementById(b).classList.add('selectable')
        }
    }
   

}

function toggle(){
    if (turn[0] == 'X'){
        turn[0] = 'O'
    }else{
        turn[0] = 'X'
    }
    defineColor()
}

function validation(){
    let line
    let column
    let conbination

    //horizontal
    for (i = 0; i <= 2; i++){
      line = i * 3
     conbination = slots[line] + slots[line + 1] + slots[line + 2]
      if (conbination == 'XXX' || conbination == 'OOO'){
        winner = slots[line]
        winnerLine = [1, line]
      }
      conbination = ''
    }

    //vertical
    for (i = 0; i <= 2; i++){
        column = i
       conbination = slots[column] + slots[column + 3] + slots[column + 6]
        if (conbination == 'XXX' || conbination == 'OOO'){
          winner = slots[column]
          winnerLine = [2, column]
        }
        conbination = ''
      }

    //diagonais
    if (slots[0] + slots[4] + slots[8] == 'XXX' || slots[0] + slots[4] + slots[8] == 'OOO'){
        winner = slots[0]
        winnerLine = [3, 1]
    }

    if (slots[2] + slots[4] + slots[6] == 'XXX' || slots[2] + slots[4] + slots[6] == 'OOO'){
        winner = slots[2]
        winnerLine = [3, 2]
    }
    

    if (winner != 'none'){
        document.getElementById('winner').innerHTML = winner + ' Venceu'
        toggleDisabledAll(true)
        if (winner == 'X'){
            document.getElementById('winner').style.color = 'blue'
            X_score++
            document.getElementById('Xscore').innerHTML = X_score
        }else{
            document.getElementById('winner').style.color = 'red'
            O_score++
            document.getElementById('Oscore').innerHTML = O_score
        }
        

        for (let i = 0; i <= 2; i++){
            let Wslots = ''
            if (winnerLine[0] == 1)
            Wslots = String((winnerLine[1] + i) + 1)
            else if (winnerLine[0] == 2)
            Wslots = String((winnerLine[1] + i * 3) + 1)
            else if (winnerLine[0] == 3 && winnerLine[1] == 1)
            Wslots = String((i * 4) + 1)
            else if (winnerLine[0] == 3 && winnerLine[1] == 2)
            Wslots = String((2 + i * 2) + 1)

            document.getElementById(Wslots).style.color = 'lime'

            console.log(Wslots)
        }


    }else{
        document.getElementById('winner').innerHTML = 'Vez de ' + turn[0]
    }

    if (avaibleSlots == 0 && winner == 'none'){
        document.getElementById('winner').innerHTML = 'Empate'
        document.getElementById('winner').style.color = 'gray'
        first = turn[0]
    }
   
}

function selection(slot){
    document.getElementById(slot).classList.remove('selectable');
    document.getElementById(slot).innerHTML = turn[0]
    document.getElementById(slot).disabled = true
    slots[slot - 1] = turn[0]
    document.getElementById(slot).style.color = turn[1]
    avaibleSlots--
    toggle()
    validation()
}

document.getElementById('restart').onclick = function(){
    
    if (winner != 'none'){
        turn[0] = winner
        first = winner
    }else{
        turn[0] = first
    }
    defineColor()
    slots = ['-','-','-','-','-','-','-','-','-']
    winner = 'none';
    document.getElementById('winner').innerHTML = ''
    document.getElementById('winner').style.color = 'transparent'
    toggleDisabledAll(false)
    avaibleSlots = 9

    for (let i = 1; i <= 9; i++){
        document.getElementById(String(i)).innerHTML = '.';
        document.getElementById(String(i)).style.color = 'transparent'
        
    }  
    document.getElementById('winner').style.color = 'gray'
    document.getElementById('winner').innerHTML = 'Vez de ' + turn[0]
}

