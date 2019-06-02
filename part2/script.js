var matrix = [];
var n=prompt("Input row");
var m=prompt("Input column");
n=parseInt(n);
m=parseInt(m);
for(var y=0;y<m;y++)
{
    matrix[y]=[];
    for(var x=0;x<n;x++)
    {
        var a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 15) {
        matrix[y][x] = 0;
        }
        if (a >= 15 && a < 60) {
        matrix[y][x] = 1;
        }
        else if (a >= 60 && a < 80) {
        matrix[y][x] = 2;
        }
        else if (a >= 80 && a < 90) {
        matrix[y][x] = 3;
        }
        else if (a >= 90 && a < 95) {
        matrix[y][x] = 4;
        }
        else if (a >= 95 && a < 100) {
        matrix[y][x] = 5; 
        }
    }
}
var GrassArr = [];
var EaterArr = [];
var AnimalArr= [];
var AllArr= [];
var EleArr= [];
var side = 10;


function setup() {
    noStroke();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 5) {
                var el = new Ele(x, y, 5);
                EleArr.push(el);
            }
            else if (matrix[y][x] == 4) {
                var al = new All(x, y, 4);
                AllArr.push(al);
            }
            else if (matrix[y][x] == 3) {
                var an = new Animal(x, y, 3);
                AnimalArr.push(an);
            }
            else if (matrix[y][x] == 2) {
                var et = new Eater(x, y, 2);
                EaterArr.push(et);
            }
            else if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                GrassArr.push(gr);
            }
        }
    }
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            
        }
    }
    for (var i in GrassArr) {
        GrassArr[i].mul();
    }
    for (var i in EaterArr) {
        EaterArr[i].eat();
        EaterArr[i].mul();
        EaterArr[i].die();
    }
    for (var i in AnimalArr) {
        AnimalArr[i].eat();
        AnimalArr[i].mul();
        AnimalArr[i].die();
    }
    for (var i in AllArr) {
        AllArr[i].eat();
        AllArr[i].mul();
        AllArr[i].die();
    }
    for (var i in EleArr) {
        EleArr[i].eat();
        EleArr[i].mul();
        EleArr[i].die();
    }
    console.log(AnimalArr);
}