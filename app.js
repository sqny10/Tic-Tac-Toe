const turnText = document.getElementById("turn-text");
const refreshBtn = document.getElementById("refresh-btn");
let boxes = document.querySelectorAll(".box");

const winCases = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6] 
];

let turn = "&times;";

refreshBtn.addEventListener("click", () => {
    window.location.reload();
})

boxes.forEach((box) => {
    box.addEventListener("click", setBox)
});

function setBox(e){
    e.target.innerHTML = turn;
        
    if(turn === "&times;" && e.target.dataset.value === ""){
        turn = "&#9900;";
        turnText.innerHTML = turn;
        e.target.dataset.value = "x";
        e.target.removeEventListener("click", setBox);
    }

    if(turn === "&#9900;" && e.target.dataset.value === ""){
        turn = "&times;"
        turnText.innerHTML = turn;
        e.target.dataset.value = "o";
        e.target.removeEventListener("click", setBox);
    }

    if(checkWinner("x")){
        boxes.forEach((box) => {
            box.removeEventListener("click", setBox);
        });
        turnText.innerHTML = "Winner is X";
        return
    }else if(checkWinner("o")){
        boxes.forEach((box) => {
            box.removeEventListener("click", setBox);
        });
        turnText.innerHTML = "Winner is O";
        return
    }

    if(!checkDraw()){
        turnText.innerHTML = "Draw";
    }
}

function checkWinner(value){
    return winCases.some((winCase) => {
        return winCase.every((index) => {
            return boxes[index].dataset.value === value;
        })
    })
}

function checkDraw(){
    boxes = Array.from(boxes);

    return boxes.some((box) => {
        return box.dataset.value === "";
    })
}

