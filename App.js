
/*var readline = require('readline-sync');
var user = readline.question('ingrese el nombre que quiera: ');
var port = 3000
var tournamentID = 12
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var socket = require('socket.io-client')("http://localhost:"+ port +"");

var connect = socket.on('connect', function(){
    console.log("you are connected to the server")
});

socket.on('connect', function(){
  socket.emit('signin', {
    user_name: user,
    tournament_id: parseInt(tournamentID),
    user_role: 'player'
  });

});
socket.on('ok_signin', function(){
  console.log("Successfully signed in!");
});


socket.on('ready', function(data){
  console.log("ready")
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var board = data.board;
  

  
});
var pos = []
var f = 0
socket.on('ready', function(data){
  
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var board = data.board;
  var i=0;
  printBoard(board)
  var mov = getMov(board,playerTurnID);
  
  
  //console.log("mov",mov);
  
  
  socket.emit('play', {
    tournament_id: tournamentID,
    player_turn_id: playerTurnID,
    game_id: gameID,
    movement: mov
  });
  pos.push(mov)
  console.log("mov",mov);
  //console.log("moviemientos hechos ", pos);
});
socket.on('finish', function(data){
  console.log('finish',f);
  f+=1;
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var winnerTurnID = data.winner_turn_id;
  var board = data.board;
  
  socket.emit('player_ready', {
    tournament_id: tournamentID,
    player_turn_id: playerTurnID,
    game_id: gameID
  });
});*/
var actual = [0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,
             0,0,0,2,1,0,0,0,
             0,0,0,1,2,0,0,0,
             0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0]
//console.log(board[28])
var playerTurnID = 1


//var n = 0

//var move_b=boardMove(board,playerTurnID)
//printBoard(board)
//console.log('move',move_b)
//board = boardchange(playerTurnID,board,move_b)
//printBoard(board)
//------PRINT BOARD--------------------
function printBoard(board){
	console.log('board')
	var i = 0;
	while(i<=board.length-8){
	  	console.log(board[i],"|",board[i+1],"|",board[i+2],"|",board[i+3],"|",board[i+4],"|",board[i+5],"|",board[i+6],"|",board[i+7]);
	  	i+=8;
	}
}
//----------POSIBLES MOVIMIENTOS -------------------------------
function boardMove(board, playerTurnID){
	var movements = [];
	//console.log("entra a boardMove")

	var turn = 0
	if(playerTurnID ==1 ){
		turn = 2
	}else{
		turn = 1
	}
	//console.log(board)
	for(var i =0;i<board.length;i++){
		if (board[i] == turn){
			//console.log(movements,i)
			if(board[i-1]==0){
				//console.log('l',i-1,board[i-1])
				//movements['left'] = i-1;
				if(verifyLeft(i,playerTurnID,board) && movements.indexOf(i-1) == -1){
					movements.push(i-1);
				}
			}
			if(board[i-8]==0){
				//console.log('l',i-8,board[i-8])
				//movements['up'] = i-8;
				if(verifyUp(i,playerTurnID,board) && movements.indexOf(i-8) == -1){
					movements.push(i-8);
				}
				
			}
			var n = i-9
			if(board[i-9] == 0){
				//console.log('l',i-9,board[i-9])
			//	movements['upleft'] = n;
				if(leftUp(i,playerTurnID,board) && movements.indexOf(i-9) == -1){
					movements.push(i-9);
				}
			}
			if(board[i-7] == 0){
				//console.log('l',i-7,board[i-7]) 
				//movements['upright'] = n+2;
				if(rightUp(i,playerTurnID,board) && movements.indexOf(i-7) == -1){
					movements.push(i-7);
				}
			}
			if(board[i+1]==0){
				//console.log('l',i+1,board[i+1])
				//movements['righ'] = i+1;
				if(verifyRight(i,playerTurnID,board) && movements.indexOf(i+1) == -1){
					movements.push(i+1);
				}
			}
			if(board[i+8]==0){
				//console.log('l',i+8,board[i+8])
				//movements['down'] = i+8;
				if(verifyDown(i,playerTurnID,board) && movements.indexOf(i+8) == -1){
					movements.push(i+8);
				}
			}
			if(board[i+7] == 0){
				//console.log('l',i+7,board[i+7])
			//	movements['downleft'] = n;
				if(leftDown(i,playerTurnID,board) && movements.indexOf(i+7) == -1){
					movements.push(i+7);
				}
			}
			if(board[i+9] == 0){
				//console.log('l',i+9,board[i+9])
				//movements['downrigh'] = n+2;
				if(rightUp(i,playerTurnID,board) && movements.indexOf(i+9) == -1){
					movements.push(i+9);
				}
			}
			//movementList.concat(movements)
			
		}
	}

	//console.log('>>',movementList)
	//var movem =  movementList[Math.floor(Math.random()*movementList.length)]
	
	//var Mkeys = Object.keys(movem);
	//key = Mkeys[Math.floor(Math.random()*Mkeys.length)]
	//value = movem[key]
	//console.log('value',movem, turn,playerTurnID)
	console.log(movements)

	return movements
}
//------------- ELECCION ALEATORIA DE MOVMIENTOS--------------------------
function getMov(board,playerTurnID){
	var movement = boardMove(board,playerTurnID)
	return movement[Math.floor(Math.random()*movement.length)]
	
}
//---------------VERIFICACIONES DE MOVMIENTOS---------------------
function verifyUp(pos,turn,board){
	var i = pos;
	
	var make = false;
	while(i<=63 && !make && board[i] != 0){
		i += 8;
		
		if(board[i] != turn){
			make = false;
		}else if(board[i] == turn){
			make = true;
		}
		
	}
	return make;
}
function verifyLeft(pos,turn,board){
	var i = pos;
	
	var make = false;
	while(i<=63 && !make && board[i] != 0){
		i += 1;
		
		if(board[i] != turn){
			make = false;
		}else if(board[i] == turn){
			make = true;
		}
		
	}
	return make;
}
function verifyRight(pos,turn,board){
	var i = pos;
	
	var make = false;
	while(i>=0 && !make && board[i] != 0){
		i -= 1;
		
		if(board[i] != turn){
			make = false;
		}else if(board[i] == turn){
			make = true;
		}
		
	}
	return make;
}
function verifyDown(pos,turn,board){
	var i = pos;
	
	var make = false;
	while(i>=0 && !make && board[i] != 0){
		i -= 8;
		
		if(board[i] != turn){
			make = false;
		}else if(board[i] == turn){
			make = true;
		}

	}
	return make;
}
function leftUp(pos,turn,board){
	var i = pos;
	var n = 0;
	var make = false;
	while(i<=63 && !make && board[i] != 0){
		i += 9;
		//console.log(i,board[i])
		//console.log("verificaciones",i,board[i])
		if(board[i] != turn){
			make = false;
			n+=1
		}else if(board[i] == turn && n>0){
			make = true;
		}else if(board[i] == turn && n == 0){
			make = false
			n+=1
		}
	}
	return make;
}
function rightUp(pos,turn,board){
	var i = pos;
	var n = 0;
	var make = false;
	while(i<=63 && !make && board[i] != 0){
		i += 7;
		if(board[i] != turn){
			make = false;
			n+=1
		}else if(board[i] == turn && n>0){
			make = true;
		}else if(board[i] == turn && n == 0){
			make = false
			n+=1
		}
		
	}
	return make;
}
function leftDown(pos,turn,board){
	var i = pos;
	var n = 0;
	var make = false;
	while(i>=0 && !make && board[i] != 0){
		i -=7;
		
		if(board[i] != turn){
			make = false;
			n+=1;
		}else if(board[i] == turn && n>0){
			make = true;
		}else if(board[i] == turn && n == 0){
			make = false
			n+=1
		}
		
	}
	return make;
}
function rightDown(pos,turn,board){
	var i = pos;
	var n = 0;
	var make = false;
	while(i>=0 && !make && board[i] != 0){
		i -= 9;
		//console.log(i,make,board[i])
		if(board[i] != turn){
			make = false;
			n+=1
		}else if(board[i] == turn && n>0){
			//console.log('quee')
			make = true;
		}else if(board[i] == turn && n == 0){
			make = false
			n+=1
		}
		
	
	}
	return make;
}
//------------CAMBIAR EL BOARD --------------------------------

function boardchange(turn,board,mov){
	if (board[mov] == 0){
		var i = mov;
		var index = 0;
		board[mov] = turn;
		var next_turn = 0
		if(turn ==1 ){
			next_turn = 2
		}else{
			next_turn = 1
		}
		var limit = true;
		var side = [verifyUp(mov,turn,board),verifyDown(mov,turn,board),verifyLeft(mov,turn,board),verifyRight(mov,turn,board),leftUp(mov,turn,board),rightUp(mov,turn,board),leftDown(mov,turn,board),rightDown(mov,turn,board)]
		board[mov] = 0;
		console.log(side)
		if(side[0]){
			board = changeUP(board,mov,turn)
		}if(side[1]){
			board = changeDown(board,mov,turn)
		}if(side[2]){
			board = changeLeft(board,mov,turn)
		}if(side[3]){
			board = changeRight(board,mov,turn)
		}if(side[4]){
			board = changeLDown(board,mov,turn)
		}if(side[5]){
			board = changeRDown(board,mov,turn)
		}if(side[6]){
			board = changeLUp(board,mov,turn)
		}if(side[7]){
			board = changeRUp(board,mov,turn)
		}		
	}

	return board
}
//----------------------------FUNCIONES PARA CAMBIAR EL BOARD ----------------
function changeUP(board,move,turn){
	board[move] = turn;
	var i = move + 8;
	while(i<=63 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i+=8;
	}
	return board;					
}
function changeDown(board,move,turn){
	board[move] = turn;
	var i = move - 8;
	while(i>=0 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i-=8;
	}
	return board;		
}function changeLeft(board,move,turn){
	board[move] = turn;
	var i = move + 1;
	while(i<=63 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i+=1;
	}
	return board;
	
}function changeRight(board,move,turn){
	board[move] = turn;
	var i = move - 1;
	while(i>=0 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i-=1;
	}
	return board;
}function changeLDown(board,move,turn){
	board[move] = turn;
	var i = move + 9;
	while(i<=63 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i+=9;
	}
	return board;	
}function changeRDown(board,move,turn){
	board[move] = turn;
	var i = move + 7;
	while(i<=63 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i+=7;
	}
	return board;
}function changeLUp(board,move,turn){
	board[move] = turn;
	var i = move - 7;
	while(i>=0 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i-=7;
	}
	return board;	
}function changeRUp(board,move,turn){
	board[move] = turn;
	var i = move - 9;
	while(i>=0 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i -= 9;
	}
	return board;	
}
//console.log(user,port,tournamentID);
///ARBOL----------------------------------------------------------------------------
/*
console.log('finals',nodeTree(actual,1,0))
function nodeTree(board, playerTurnID,level){
	var new_board = []
	var actual_board = board.slice();
	var movs = boardMove(actual_board, playerTurnID)
	
	var childs = []
	var turn = 0
	if(playerTurnID ==1 ){
		turn = 2
		movems = []
		level+=1
		
	}else{
		movems = []
		turn = 1
		level+=1
	}
	for(var i =0;i<movs.length;i++){
		console.log('level', level)
		console.log('mov ', movs[i], movs)
		new_board = boardchange(playerTurnID,actual_board,movs[i])
		printBoard(new_board)
		actual_board = board.slice();
		if (level < 4){
			nodeTree(new_board,turn,level)
		}
		
	}
	return movems
}*/
function makeTree

