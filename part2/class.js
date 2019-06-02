class Newperson {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]; 
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

}





class Grass extends Newperson {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy=0;
    }
    mul() {
        this.energy++;
        var newCell = random(this.chooseCell(0));
        console.log(newCell, this.energy);
        if (this.energy >= 4 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            GrassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.energy = 0;
        }
    }
    
}


class Eater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;

        }

    }
    eat() {
        var newCell = random(this.chooseCell(1));
        this.energy--;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in GrassArr) {
                if (newX == GrassArr[i].x && newY == GrassArr[i].y) {
                    GrassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }
        else {
            this.move();
        }
    }
    mul() {

        var newCell = random(this.chooseCell(0));
        if (this.energy >= 10 && newCell) {
            var newEater = new Eater(newCell[0], newCell[1], this.index);
            EaterArr.push(newEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in EaterArr) {
                if (this.x == EaterArr[i].x && this.y == EaterArr[i].y) {
                    EaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Animal {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
        }


        this.y = newY;
        this.x = newX;


    }
    eat() {
        var newCell = random(this.chooseCell(2));
        this.energy -= 2;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in EaterArr) {
                if (newX == EaterArr[i].x && newY == EaterArr[i].y) {
                    EaterArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 4;

        }
        else {
            this.move();
        }
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 15 && newCell) {
            var newAnimal = new Animal(newCell[0], newCell[1], this.index);
            AnimalArr.push(newAnimal);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 10;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in AnimalArr) {
                if (this.x == AnimalArr[i].x && this.y == AnimalArr[i].y) {
                    AnimalArr.splice(i, 1);
                    break;
                }
                if(this.x==undefined ||this.y==undefined)
                {
                    AnimalArr.splice(i, 1);
                }
            }
        }
        for (var i in AnimalArr) {
            if(this.x==undefined ||this.y==undefined)
            {
                AnimalArr.splice(i, 1);
            }
        }
    }
}
class All {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character, character1, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0, -1, -2));
        var newX = newCell[0];
        var newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = this.index;


        this.y = newY;
        this.x = newX;

    }
    eat() {
        var newCell = random(this.chooseCell(1, 2, 3));
        this.energy--;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            for (var i in GrassArr) {
                if (newX == GrassArr[i].x && newY == GrassArr[i].y) {
                    GrassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in EaterArr) {
                if (newX == EaterArr[i].x && newY == EaterArr[i].y) {
                    EaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in AnimalArr) {
                if (newX == AnimalArr[i].x && newY == AnimalArr[i].y) {
                    AnimalArr.splice(i, 1);
                    break;
                }
            }
            this.energy += 3;
            this.y = newY;
            this.x = newX;

        }
        else {
            this.move();
        }
        console.log(newCell, this.energy);
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 25 && newCell) {
            var newAll = new All(newCell[0], newCell[1], this.index);
            AllArr.push(newAll);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in AllArr) {
                if (this.x == AllArr[i].x && this.y == AllArr[i].y) {
                    AllArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
class Ele {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 5, this.y - 5],
            [this.x, this.y - 5],
            [this.x + 5, this.y - 5],
            [this.x - 4, this.y - 4],
            [this.x, this.y - 4],
            [this.x + 4, this.y - 4],
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 5, this.y],
            [this.x - 4, this.y],
            [this.x - 3, this.y],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 5, this.y],
            [this.x + 4, this.y],
            [this.x + 3, this.y],
            [this.x + 2, this.y],
            [this.x + 1, this.y],
            [this.x - 5, this.y + 5],
            [this.x, this.y + 5],
            [this.x + 5, this.y + 5],
            [this.x - 4, this.y + 4],
            [this.x, this.y + 4],
            [this.x + 4, this.y + 4],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
        }


        this.y = newY;
        this.x = newX;

    }
    eat() {
        var newCell = random(this.chooseCell(1));
        this.energy--;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            for (var i in GrassArr) {
                if (newX == GrassArr[i].x && newY == GrassArr[i].y) {
                    GrassArr.splice(i, 1);
                    this.energy += 2;
                    break;
                }
            }

            this.y = newY;
            this.x = newX;

        }
        else {
            this.move();
        }
        //console.log(newCell, this.energy);
    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 25 && newCell) {
            var newEle = new Ele(newCell[0], newCell[1], this.index);
            EleArr.push(newEle);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 8;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in EleArr) {
                if (this.x == EleArr[i].x && this.y == EleArr[i].y) {
                    EleArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}