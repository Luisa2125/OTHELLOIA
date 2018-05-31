
var TreeNode = require('treenode').TreeNode;
var readline = require('readline-sync');
var user = readline.question('ingrese el nombre que quiera: ');
var port = 4000
var tournamentID = 142857
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var socket = require('socket.io-client')("http://192.168.1.142:"+ port +"");

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
var used = []
var f = 0
socket.on('ready', function(data){
  
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var board = data.board;
  var i=0;
  printBoard(board)
  //var mov = getMov(board,playerTurnID);
  var mov = getMoveMM(board,playerTurnID)
  used.push(mov)
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
});/*
var actual = [
0 , 0 , 0 , 0 , 0 , 0 , 0 , 0,
0 , 0 , 0 , 0 , 0 , 0 , 0 , 0,
0 , 0 , 0 , 0 , 0 , 0 , 0 , 0,
0 , 0 , 0 , 2 , 1 , 0 , 0 , 0,
0 , 0 , 0 , 1 , 2 , 0 , 0 , 0,
0 , 0 , 0 , 0 , 0 , 0 , 0 , 0,
0 , 0 , 0 , 0 , 0 , 0 , 0 , 0,
0 , 0 , 0 , 0 , 0 , 0 , 0 , 0,
]
*/
//printBoard(actual)
//console.log(boardMove(actual,2))
//console.log(getMoveMM(actual,1))
//console.log(board[28])
//var playerTurnID = 1


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
				//console.log('> ',i-1,' ',verifyLeft(i,playerTurnID,board),'-->',i)
				if(verifyLeft(i,playerTurnID,board) && movements.indexOf(i-1) == -1){
					movements.push(i-1);
				}
			}
			if(board[i-8]==0){
				//console.log('l',i-8,board[i-8])
				//movements['up'] = i-8;
				//console.log('> ',i-8,' ',verifyUp(i,playerTurnID,board),'-->',i)
				if(verifyUp(i,playerTurnID,board) && movements.indexOf(i-8) == -1){
					movements.push(i-8);
				}
				
			}
			var n = i-9
			if(board[i-9] == 0){
				//console.log('l',i-9,board[i-9])
			//	movements['upleft'] = n;
				//console.log('> ',i-9,' ',leftUp(i,playerTurnID,board),'-->',i)
				if(leftUp(i,playerTurnID,board) && movements.indexOf(i-9) == -1){
					movements.push(i-9);
				}
			}
			if(board[i-7] == 0){
				//console.log('l',i-7,board[i-7]) 
				//movements['upright'] = n+2;
				//console.log('> ',i-7,' ',rightUp(i,playerTurnID,board),'-->',i)
				if(rightUp(i,playerTurnID,board) && movements.indexOf(i-7) == -1){
					movements.push(i-7);
				}
			}
			if(board[i+1]==0){
				//console.log('l',i+1,board[i+1])
				//movements['righ'] = i+1;
				//console.log('> ',i+1,' ',verifyRight(i,playerTurnID,board),'-->',i)
				if(verifyRight(i,playerTurnID,board) && movements.indexOf(i+1) == -1){
					movements.push(i+1);
				}
			}
			if(board[i+8]==0){
				//console.log('l',i+8,board[i+8])
				//movements['down'] = i+8;
				//console.log('> ',i+8,' ',verifyDown(i,playerTurnID,board),'-->',i)
				if(verifyDown(i,playerTurnID,board) && movements.indexOf(i+8) == -1){
					movements.push(i+8);
				}
			}
			if(board[i+7] == 0){
				//console.log('l',i+7,board[i+7])
			//	movements['downleft'] = n;
				//console.log('> ',i+7,' ',leftDown(i,playerTurnID,board),'-->',i)
				if(leftDown(i,playerTurnID,board) && movements.indexOf(i+7) == -1){
					movements.push(i+7);
				}
			}
			if(board[i+9] == 0){
				//console.log('l',i+9,board[i+9])
				//movements['downrigh'] = n+2;
				//console.log('> ',i+9,' ',rightDown(i,playerTurnID,board),'-->',i)
				if(rightDown(i,playerTurnID,board) && movements.indexOf(i+9) == -1){
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
	//console.log(movements)
	
		//console.log(movements)
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
		//console.log('hey',i)
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
		//console.log('dentro',pos,make)
	
	//console.log('fuera',pos,make)
	return make;
}
function rightDown(pos,turn,board){
	var i = pos;
	var n = 0;
	var make = false;
	while(i>=0 && !make && board[i] != 0){
		i -= 9;
		//console.log(pos,i,make,board[i])
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

function boardchange(turn,bboard,mov){
	var board = bboard.slice()
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
		//console.log(side)
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
function changeUP(bboard,move,turn){
	var board = bboard.slice()
	board[move] = turn;
	var i = move + 8;
	while(i<=63 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i+=8;
	}
	return board;					
}
function changeDown(bboard,move,turn){
	var board = bboard.slice()
	board[move] = turn;
	var i = move - 8;
	while(i>=0 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i-=8;
	}
	return board;		
}function changeLeft(bboard,move,turn){
	var board = bboard.slice()
	board[move] = turn;
	var i = move + 1;
	while(i<=63 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i+=1;
	}
	return board;
	
}function changeRight(bboard,move,turn){
	var board = bboard.slice()
	board[move] = turn;
	var i = move - 1;
	while(i>=0 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i-=1;
	}
	return board;
}function changeLDown(bboard,move,turn){
	var board = bboard.slice()
	board[move] = turn;
	var i = move + 9;
	while(i<=63 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i+=9;
	}
	return board;	
}function changeRDown(bboard,move,turn){
	var board = bboard.slice()
	board[move] = turn;
	var i = move + 7;
	while(i<=63 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i+=7;
	}
	return board;
}function changeLUp(bboard,move,turn){
	var board = bboard.slice()
	board[move] = turn;
	var i = move - 7;
	while(i>=0 && board[i]!=turn){
		//console.log('b',board[i]);
		board[i]=turn;
		i-=7;
	}
	return board;	
}function changeRUp(bboard,move,turn){
	var board = bboard.slice()
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
var arbol ={}
var tableros = {}
tableros[0] = actual
var node_num = 0
var childs = []
n = 0
console.log('finals',nodeTree(actual,1,0,tableros,childs))
function nodeTree(board, playerTurnID,level,tableros,childs){
	var new_board = []

	var actual_board = board.slice();
	var movs = boardMove(actual_board, playerTurnID)
	
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

		//console.log('level', level)
		//console.log('mov ', movs[i], movs)
		new_board = boardchange(playerTurnID,actual_board,movs[i])
		//printBoard(new_board)
		//console.log(node_num)
		//console.log('h',i,childs)
		node_num += 1
		childs.push(node_num)
		if(i == movs.length -1){
			arbol[n] = childs
			n+=1
			var childs = []
		}
		//console.log('childs',childs)
		//console.log('this',node_num)
		tableros[node_num] = new_board
		actual_board = board.slice();
		if (level < 2){
			nodeTree(new_board,turn,level,tableros,childs)
		}
		
	}
	


	return movems
}

//console.log(tableros)
console.log(node_num)
console.log(arbol)
*/


function makeTree(node,n){
	n=1
	
	var turn = node.data.turn
	var op = 0

	if(turn == 1){
		op = 2
	}else{
		op = 1
	}
	//console.log('TURN',turn)
	for(var i = 0;i<node.data.movements.length;i++){
		var board = boardchange(turn,node.data.board,node.data.movements[i])
		//console.log('before')
		//printBoard(node.data.board)
		var movements = boardMove(board, op)
		var name  = "node "+i+"-"+node.data.movements[i]
		//console.log('n',n)
		var new_node = node.addChild({id:n, name: name,board:board,movements:movements,turn:turn,value:0,actualM:node.data.movements[i]})
		//console.log('after',new_node.data.id)
		//printBoard(new_node.data.board)

	}

	if(turn == 1){
		turn = 2
		op = 1
	}else{
		turn = 1
		op = 2
	}
	//console.log('------------------------------------------------------------')
	//console.log('TURN',turn)
	n+=1
	node.forEach(function(element) {
		if(element.data.id ==1 && element.data.actualM != 'no'){ 
			for(var i = 0;i<element.data.movements.length;i++){
				var board = boardchange(turn,element.data.board,element.data.movements[i])
				//console.log('before')
				//printBoard(element.data.board)
				var movements = boardMove(board, op)
				var name  = "node "+i+"-"+element.data.movements[i]
				var new_node = element.addChild({id:n, name: name,board:board,movements:movements,turn:turn,value:0,actualM:element.data.movements[i]})
				//console.log('after', new_node.data.id)
				//printBoard(new_node.data.board)

			} 
			//console.log(element.data.name,element.numChildren())
		}
			
 	})
 	if(turn == 1){
		turn = 2
		op = 1
	}else{
		turn = 1
		op = 2
	}
	//console.log('------------------------------------------------------------')
	//console.log('TURN2',turn)
	n+=1
	node.forEach(function(element) {
		if(element.data.id ==2 && element.data.actualM != 'no'){
			 
			for(var i = 0;i<element.data.movements.length;i++){
				var board = boardchange(turn,element.data.board,element.data.movements[i])
				//console.log('before')
				//printBoard(element.data.board)
				var movements = boardMove(board, op)
				var name  = "node "+i+"-"+element.data.movements[i]
				var new_node = element.addChild({id:n, name: name,board:board,movements:movements,turn:turn,value:0,actualM:element.data.movements[i]})
				//console.log('after', new_node.data.id)
				//printBoard(new_node.data.board)

			} 
			//console.log(element.data.name,element.numChildren())
		}
		
	})
	if(turn == 1){
		turn = 2
		op = 1
	}else{
		turn = 1
		op = 2
	}
	//console.log('------------------------------------------------------------')
	//console.log('TURN2',turn)
	n+=1
	node.forEach(function(element) {
		if(element.data.id ==3 && element.data.actualM != 'no'){
			 
			for(var i = 0;i<element.data.movements.length;i++){
				var board = boardchange(turn,element.data.board,element.data.movements[i])
				//console.log('before')
				//printBoard(element.data.board)
				var movements = boardMove(board, op)
				var name  = "node "+i+"-"+element.data.movements[i]
				var new_node = element.addChild({id:n, name: name,board:board,movements:movements,turn:turn,value:0,actualM:element.data.movements[i]})
				//console.log('after', new_node.data.id)
				//printBoard(new_node.data.board)

			} 
			//console.log(element.data.name,element.numChildren())
		}
		
	})
	if(turn == 1){
		turn = 2
		op = 1
	}else{
		turn = 1
		op = 2
	}
	//console.log('------------------------------------------------------------')
	//console.log('TURN2',turn)
	n+=1
	node.forEach(function(element) {
		if(element.data.id ==4 && element.data.actualM != 'no'){
			 
			for(var i = 0;i<element.data.movements.length;i++){
				var board = boardchange(turn,element.data.board,element.data.movements[i])
				//console.log('before')
				//printBoard(element.data.board)
				var movements = boardMove(board, op)
				var name  = "node "+i+"-"+element.data.movements[i]
				var new_node = element.addChild({id:n, name: name,board:board,movements:movements,turn:turn,value:0,actualM:element.data.movements[i]})
				//console.log('after', new_node.data.id)
				//printBoard(new_node.data.board)

			} 
			//console.log(element.data.name,element.numChildren())
		}
		
	})
	
	//console.log('num',tree.numChildren())

}


function poda_alfa_beta(level,root,turn){
	var move = -1
	var actual_best = -1
	root.forEach(function(element){
		if(element.data.id == level){
			var value_move = Value(element.data.board,element.data.turn)
			//console.log(actual_best,value_move)
			if(value_move>actual_best){
				actual_best = value_move
				element.data.value = value_move
			}else{
				element.data.value = 'x'
			}
			
			//console.log('value',level,"--",element.data.value)
		}
	})
	level -=1
	console.log('best',actual_best)
	while(level>=0){
		root.forEach(function(element){
			if(element.data.id == level){
				var value_move = Value(element.data.board,element.data.turn)
				//console.log(actual_best,value_move)
				if(level%2 == 0){
					if(value_move>actual_best){
						actual_best = value_move
						element.data.value = value_move
					}else{
						element.data.value = 'x'
					}
				}else{
					if(value_move<actual_best){
						actual_best = value_move
						element.data.value = value_move
					}else{
						element.data.value = 'x'
					}
				}
				
				
				//console.log('value',level,"--",element.data.value)
			}

		})
		level-=1
		console.log('best',actual_best)
	}
	root.forEach(function(element){
		if(element.data.id == 1 ){
			console.log(element.data.actualM)
			if(root.data.value == element.data.value){
				move = element.data.actualM
			}
		}
	})

	console.log('move',move)
	if(move == -1){
		move = getMov(root.data.board,root.data.playerTurnID)
	}
	return move;
	
}
function getMoveMM(board,playerTurnID){
	var movs = boardMove(board, playerTurnID)
	//printBoard(board)
	var tree = new TreeNode({id:0, name:'root',board:board,movements:movs,turn:playerTurnID,value:0,actualM:-1})
	var n = 0
	var level = 0

	makeTree(tree,n,level)
	var count  = 0
	var level = 0
	tree.forEach(function(element) {
		count+=1
		level = element.data.id
	});

	console.log('count ',count,' level ',level)
	//return poda_alfa_beta(level,tree,tree.data.turn)
	return MinMax(level,tree,1)

}
function MinMax(level,root,turn){
	var move = -1
	root.forEach(function(element){
		if(element.data.id == level){
			var value_move = Value(element.data.board,element.data.turn)
			element.data.value = value_move
			//console.log('value',level,"--",element.data.value)
		}
	})
	level -= 1
	while(level>=0){
		root.forEach(function(element){
			if(element.data.id == level){
				var value_move = 0
				//console.log(level%2)
				if(level%2 == 0){
					value_move = MaxMove(element,level)
				}else{
					value_move = MinMove(element,level)
				}

				element.data.value = value_move
				//console.log('value',level,"--",element.data.value)
			}
		})
		level-=1
	}
	root.forEach(function(element){
		if(element.data.id == 1 ){

			console.log(element.data.actualM)
			if(root.data.value == element.data.value){
				move = element.data.actualM
			}
		}
	})
	console.log(move)
	return move
}
function MinMove(this_node,level){
	var value = 0
	this_node.forEach(function(element){
		if(element.data.id == level+1){
			//console.log('min ',element.data.value)
			if(value == 0){
				value = element.data.value
			}else
			if(element.data.value < value){
				value = element.data.value
			}
		}
	})
	return value
}
function MaxMove(this_node,level){
	var value = 0
	this_node.forEach(function(element){
		if(element.data.id == level+1){
			//console.log('max ',element.data.value)
			if(value == 0){
				value = element.data.value
			}else
			if(element.data.value > value){
				value = element.data.value
			}
		}
	})
	return value
}
function Value(board,turn){
	return heuristica_esquinas(board,turn) + heuristica_count(board,turn)
}
function heuristica_esquinas(board,turn){
	var count = 0;
	if(board[0] == turn){
		count +=1;
	}if(board[7] == turn){
		count +=1;
	}if(board[63] == turn){
		count +=1
	}if(board[56] == turn){
		count +=1
	}
	return count;
}
function heuristica_count(board,turn){
	var count = 0;
	for(var i = 0;i<board.length;i++){
		if(board[i] == turn){
			count +=1
		}
	}
	return count;
}

//console.log('heuristica esquinas',heuristica_esquinas(actual,1),' heuristica count',heuristica_count(actual,1))


/*  function MinMax(game){
 	return MaxMove(game)
 }
 function MaxMove(game){
 	//console.log('max',game[1])
 	//printBoard(game[0])
 	if(GameEnded(game)){
 		return EvalGameState(game);
 	}else{
 		var best_move = [];
 		var moves = GenerateMoves(game);
 		//console.log(moves)
 		for(var i = 0;i<moves.length;i++){
 			game[2] = moves[i]
 			var applyMove = ApplyMove(game);
 			var move = MinMove(applyMove);
 			if (Value(move) > Value(best_move)){
 				best_move = move;
 			}
 		}
 		return best_move;
 	}
 }
 function MinMove(game){
 	//console.log('min',game[1])
 	//printBoard(game[0])
 	var best_move = [];
 	var moves = GenerateMoves(game)
 	//console.log(moves)
 	for(var i = 0;i<moves.length;i++){
		var applyMove = ApplyMove(game);
		var move = MaxMove(applyMove);
		if (Value(move) > Value(best_move)){
			best_move = move;
		}
	}
	return best_move;
 }
 var game = [actual,playerTurnID,0]
 function GenerateMoves(game){
 	return boardMove(game[0], game[1])
 }
 function ApplyMove(game){
 	if(game[1] == 1){
		game[1] = 2
	}else{
		game[1] = 1

	}
 	var move = [boardchange(game[1],game[0],game[2]),game[1],game[2]]
 	return move
 }
 function GameEnded(game){
 	if(boardMove(game[0], game[1]) == null){
 		return true
 	}else{
 		return false
 	}
 }
 function EvalGameState(game){
 	var one = 0
 	var two = 0
 	for(var i = 0;i<game[0].length;i++){
 		if(game[0][i] == 1){
 			one += 1
 		}if(game[0][i] == 1){
 			two += 1
 		}
 	}
 	if(one>two){
 		game[1] = 1
 	}else{
 		game[1] = 2
 	}
 	game[2] = 'finish'
 	//console.log(game[2])
 	//console.log('player ',game[1],' won')
 	//printBoard(game[0])
 	return game 
 }
 function Value(move){
 	return 1
 }
 var fin = MinMax(game)*/
