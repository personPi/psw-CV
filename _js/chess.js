/**
 * Created by Administrator on 2016/10/13.
 */
var me=true;
var over=false;
var chessBorad=[];
var wins=[];
var computerwins=[];
var myWin=[];

for(var i=0;i<15;i++){
    chessBorad[i]=[];
    for(var j=0;j<15;j++){
        chessBorad[i][j]=0;
    }
}
for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}


var count=0;
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i][j+k][count]=true;
        }
        count++;
    }
}

for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[j+k][i][count]=true;
        }
        count++;
    }
}

for(var i=0;i<11;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}


for(var i=0;i<11;i++){
    for(var j=14;j>3;j--){
        for(var k=0;k<5;k++){
            wins[i+k][j-k][count]=true;
        }
        count++;
    }
}

for(var i=0;i<count;i++){
    myWin[i]=0;
    computerwins[i]=0;
}

var chess=document.getElementById("chess");
var context=chess.getContext("2d");
context.strokeStyle="#bfbfbf";
var logo=new Image();
logo.src="../img/9.png";
logo.onload=function(){

    //context.drawImage(logo,0,0,450,450);
    drawChess();
}
function drawChess() {
    for (var i = 0; i < 15; i++) {
        //画线
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();

        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }}

function oneStep(i,j,me){
    context.beginPath();
    context.arc(30*i+15,15+j*30,13,0 ,2*Math.PI);
    var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,30*i+15,15+j*30,5);
    if(me){
    gradient.addColorStop(0,"#0a0a0a");
    gradient.addColorStop(1,"#636766");}
    else{
        gradient.addColorStop(0,"#d1d1d1");
        gradient.addColorStop(1,"#f9f9f9");
    }
    context.fillStyle=gradient;
    context.closePath();
    context.fill();
}

chess.onclick=function(e){
if(over) {
    return ;
}
    if(!me){
        return;
    }
    var x= e.offsetX;
    var y= e.offsetY;
    var i=parseInt(x/30);
    var j=parseInt(y/30);
    if(chessBorad[i][j]==0) {
        oneStep(i, j, me);
        chessBorad[i][j] = 1;
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
             myWin[k]++;
                computerwins[k]=6;
                if(myWin[k]==5){
                    window.alert("you win");
                    over=true;
                }
            }
        }
        if(!over){
            me = !me;
            ConputerWin()
        }
    }
}
function ConputerWin(){
    var myScore=[];
    var ComputerScroe=[];
    var max=0;
    var u= 0,v=0;
    for(var i=0;i<15;i++){
        myScore[i]=[];
        ComputerScroe[i]=[];
        for(var j=0;j<15;j++){
            myScore[i][j]=0;
            ComputerScroe[i][j]=0;
        }
    }
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBorad[i][j]==0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] ==2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }
                        if (computerwins[k] == 1) {
                            ComputerScroe[i][j] += 220;
                        } else if (computerwins[k] == 2) {
                            ComputerScroe[i][j] += 420;
                        } else if (computerwins[k] == 3) {
                            ComputerScroe[i][j] += 2100;
                        }
                        else if (computerwins[k] == 4) {
                            ComputerScroe[i][j] += 20000;
                        }

                    }

                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (ComputerScroe[i][j] > ComputerScroe[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (ComputerScroe[i][j] > max) {
                    max = ComputerScroe[i][j];
                    u = i;
                    v = i;
                } else if (ComputerScroe == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;

                    }
                }
            }
        }
    }
   oneStep(u,v,false);
    chessBorad[u][v]=2;
    for(var k=0;k<count;k++) {
        if (wins[u][v][k]) {
            computerwins[k]++;
            myWin[k] = 6;
            if (computerwins[k]== 5) {
                window.alert("�����Ӯ��");
                over = true;
            }
        }
    }
        if(!over){
            me = !me;
        }
    }

