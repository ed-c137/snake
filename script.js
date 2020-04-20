var ctx, canv;
var leveldiff = 13;
window.onload = function(){
    canv = document.getElementById("gc");
    console.log(canv);
    ctx = canv.getContext("2d");
    
    document.addEventListener("keydown", keyPush);
    //setInterval(game, 1000/leveldiff);
    difficultylevel(leveldiff);

    
}

xv =1; yv = 0;//player velocity and direction
gs= tc = 20;//grid size and tile count
ax = ay = 15 //apple x and apple y
trail = [];
tail = 5;
score = 0;
life = 1;
var scoreelm = document.getElementsByClassName("scorecount")[0];
var lifeelm = document.getElementsByClassName("lifecount")[0];
scoreelm.textContent = score;
lifeelm.textContent = life;
var screen_refresh;
var scorelev = 5;



px = py = 10; //player postion

function difficultylevel(leveldiff){
    let interv = 1000/leveldiff;
    if(leveldiff == 13){
        screen_refresh = setInterval(game, interv);
    }else{
        //console.log(screen_refresh);
        clearInterval(screen_refresh);
        //console.log("intevalcleared");
        if(life )
        screen_refresh = setInterval(game, interv); 
    }
   
    
}

function game(){
    if(score == scorelev){
        leveldiff++;
        scorelev += 5;
        console.log("difficulty level:", leveldiff);
        difficultylevel(leveldiff);
    }
    px += xv;
    py += yv;
    if (px < 0){
        px = tc - 1;
    }
    if (px > tc-1){
        px = 0;
    }
    if (py < 0){
        py = tc - 1;
    }
    if (py > tc-1){
        py = 0;
    }
    ctx.fillStyle= "black";
    ctx.fillRect(0, 0,canv.width, canv.height);

    ctx.fillStyle="lime";
    for(var i=0; i < trail.length; i++){
        ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
        if(trail[i].x==px && trail[i].y==py){
            tail = 5;
            score = 0;
            //life--;
            if(life>0){
                life--;
            }else if(life <= 0){
                console.log("game over");
                clearInterval(screen_refresh);
            }
            message = "Opps you bit your tail";
            scoreelm.textContent = score;
            lifeelm.textContent = life;
        }
    }

    trail.push({x:px, y:py});//object instiation of object literal
    while (trail.length>tail){
        trail.shift();
    }
    if(ax==px && ay==py){
        tail++;
        score++;
        ax = Math.floor(Math.random()*tc);
        ay = Math.floor(Math.random()*tc);
        scoreelm.textContent = score;//update the score in the dom
        document.getElementsByClassName("scorecount")[0].classList.add("font-animate");
        const animated = document.querySelector('.font-animate');
            animated.addEventListener('animationend', () => {
            //console.log('Animation ended');
            document.getElementsByClassName("scorecount")[0].classList.remove("font-animate");
            });
    }
    ctx.fillStyle= "red";
    ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);
 
    //console.log(score);
}
var keyarr = [];
function keyPush(evt) {
    //console.log(evt.keyCode);
    let rkey = evt.keyCode;
    if(keyarr.length < 1 ){
        //prevkey = rkey;
        keyarr.push(rkey);
        keyCode(keyarr[0], 0);
    } else if (keyarr.length == 1){
        //key = rkey
        keyarr.unshift(rkey);
        allowedkey(keyarr[0]);
    }   else if (keyarr.length == 2){
        keyarr.pop();
        keyarr.unshift(rkey);
        allowedkey(keyarr[0]);
    }
    function allowedkey(key){
        //prevents the snake going back the same direction it came from.
        if(37 == keyarr[1] && key != 39 && key != 37){
            keyCode(key);
        }else if(38 == keyarr[1] && key != 40 && key != 38){
            keyCode(key);
        }else if(39 == keyarr[1] && key != 37 && key != 39){
            keyCode(key);
        }else if(40 == keyarr[1] && key != 38 && key != 40){
            keyCode(key);
        }

    }
    function keyCode(key){
        
        switch(key){
            case 37:
                //left
                xv = -1; yv = 0;
            
                break;
            case 38:
                //up
                xv = 0; yv = -1;
                break;
            case 39:
                //right
                xv = 1; yv = 0;
                break;
            case 40:
                //down
                xv = 0; yv = 1;
                break;
        }

    }
}