
var board;
var current;
var continueGame;
var AI;
var player1;
var player2;
var modal = document.getElementById('myModal');
var smodal = document.getElementById('startModal');



function setPlayer(value) {
    modal.style.display = "none";
    current = value;
    player1 = value;
    console.log(player1);
    if(value == "X"){
      player2 = "O";
    } else {
      player2 = "X";
    }
  smodal.style.display = "none";
  reset();
}
function resetWindow(){
  console.log("Reset window")
  //modal.style.display = "none";
  startPopUp();
}

function reset(){
  board = [ 0,1,2,  3,4,5,  6,7,8];
  for(var x = 0; x<board.length; x++){
    document.getElementById(x).disabled = false;
  }
  continueGame = true;
  AI = document.getElementById("ai").checked;
  document.getElementById("title").innerText= "Player 1";
  for(var g=0; g<9; g++){
   document.getElementById(g).innerText = '';
  }
}

function selected(btn_id){
  if(continueGame){
  if(current == "X" && (board[btn_id] != "X" || board[btn_id] != "O")){
    board[btn_id]=current;
    document.getElementById(btn_id).disabled = true;
    document.getElementById(btn_id).innerText = 'X';
    current = "O";
    victoryCheck("X");
    if(!draw() && continueGame){
    if(AI && player1 == "X"){
      document.getElementById("title").innerText= "A.I.";
      AIMove();
    }
      document.getElementById("title").innerText= "Player 2";
    }
  } else if (current == "O" && board[btn_id] != "X" ||  board[btn_id] != "O"){
    board[btn_id]=(current);
    document.getElementById(btn_id).disabled = true;
    document.getElementById(btn_id).innerText = 'O';
    current = "X";
    victoryCheck("O");
    if(!draw() && continueGame){
    if(AI && player1 == "O"){
      document.getElementById("title").innerText= "A.I.";
      AIMove();
    }
      document.getElementById("title").innerText= "Player 1";
    }

  }
  }
}


function victoryCheck(val){
  if(val == player1)
    var player = player1;
  else if (val == player2 && AI)
    player = player2;
  else
    player = player2;
  var winList=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var b=0; b<winList.length; b++){
    if(board[winList[b][0]]==board[winList[b][1]]&& board[winList[b][1]]==board[winList[b][2]] ){
     document.getElementById("winner").innerText = "Victory for "+player;
    continueGame = false;}}
  if(!continueGame)
    resultPopUp();
}

function draw(){
  var index = 0
  while(index < board.length){
    if(typeof board[index] == "number"){
      return false;
    }
    else
      index += 1;
  }
  continueGame = false;
  document.getElementById("winner").innerText = "Draw";
  resultPopUp();
  return true;
}
function AIMove(){
  //Victory Check
  pairs = [[[0,3],[2,4],[7,8],6], [[0,6],[5,4],[4,5],3],
           [[1,2],[4,8],[3,6],0], [[0,2],[7,4],[4,7],1],
           [[0,1],[6,4],[8,5],2], [[3,4],[3,4],[2,8],5],
           [[0,4],[5,2],[6,7],8], [[8,6],[6,8],[4,1],7],
           [[0,8],[5,3],[6,2],4], [[1,7],[1,7],[1,7],4]];
  for(var i=0; i<pairs.length; i++){
    for(var j=0; j<pairs[i].length-1; j++){
      if(board[pairs[i][j][0]]==player2&& board[pairs[i][j][1]]==player2 && board[pairs[i][3]] != player1){
        console.log(board[pairs[i][3]]);
        board[pairs[i][3]]=current;
        document.getElementById(pairs[i][3]).innerText = player2;
        console.log( "AI1" + board);
        victoryCheck(player2);
        return true;
        }
      }
  }

  //Block Check
  for(var l=0; l<pairs.length; l++){
    for(var k=0; k<pairs[l].length-1; k++){
      if(board[pairs[l][k][0]]==player1 && board[pairs[l][k][1]]==player1 && board[pairs[l][3]] != player2){
        console.log(board[pairs[l][3]]);
        board[pairs[l][3]]=current;
        document.getElementById(pairs[l][3]).innerText = player2;
        console.log( "AI2" + board);
        current = player1;
        victoryCheck(player2);
        return true;
        }
      }
  }

  if(!draw()){
    turn = false;
    while(!turn){
      var randomNum=Math.floor((Math.random() * 9))
      if (board[randomNum] != player1 && board[randomNum] != player2){
        board[randomNum]=current;
        document.getElementById(randomNum).innerText = player2;
        current = player1;
        turn = true;
      }
    }
  }
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function startPopUp() {
    smodal.style.display = "block";
}

function resultPopUp() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";

}

function closeWindow() {
   modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
