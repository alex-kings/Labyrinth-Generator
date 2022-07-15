const BOARD_SIZE = 1000
const GAP_SPACE = 10

class Cell{
    constructor(id){
        this.id = id
        this.visited = false

        // Walls
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true,
        }
    }
}

export class Labyrinth{
    constructor(){

        this.cellNumber = 20
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')
        this.cellSize = BOARD_SIZE/this.cellNumber
        this.canvas.width = `${BOARD_SIZE}`
        this.canvas.height = `${BOARD_SIZE}`
        this.cells = []
    
        this.start(10)
    }
    
    start(n){
        this.cellNumber = n
        this.cellSize = BOARD_SIZE/this.cellNumber
        this.reset()
        this.depthFirstSearch(this, 0, 0)
        this.printBoard()
    }

    reset(){
        // Makes background black
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)

        this.cells = []
        // Create cells, unvisited by default
        for(let i = 0; i < this.cellNumber; i++){
            let row = []
            for(let j = 0; j < this.cellNumber; j++){
                row.push(new Cell(j + i*this.cellNumber))
            }
            this.cells.push(row)
        }
    }

    // Carves the labyrinth using the depth first search algorithm
    depthFirstSearch(self, startX, startY, from){

        let cell = self.cells[startX][startY]

        if(from === 'l') cell.walls.right = false
        else if(from === 'r') cell.walls.left = false
        else if(from === 't') cell.walls.bottom = false
        else if(from === 'b') cell.walls.top = false

        // Sets the cell as visited
        cell.visited = true

        // Finds the adjacent cells
        let adjCoord = self.getAdjacent(self, startX, startY)

        // Randomly choose an adjacent cell
        if(adjCoord.length === 0) return false

        let r = Math.floor(Math.random()*adjCoord.length)
        let picked = adjCoord[r]

        // Finds the direction pointing to the next cell
        let to = ''
        if(picked[0] - startX === 1){ // Going right
            cell.walls.right = false
            to = 'r'
        } 
        else if(picked[0] - startX === -1){ // Going left
            cell.walls.left = false
            to = 'l'
        } 
        else if(picked[1] - startY === 1) { // Going down
            cell.walls.bottom = false
            to = 'b' 
        }
        else if(picked[1] - startY === -1){ // Going up
            cell.walls.top = false
            to = 't'
        } 

        // Recursively carves the labyrinth
        if(self.depthFirstSearch(self, picked[0], picked[1], to) === false){
            adjCoord = self.getAdjacent(self, startX, startY)
            
            // Check if there are adjacent cells left
            if(adjCoord.length === 0){
                return false
            }
            else{
                return self.depthFirstSearch(self, startX, startY)
            }
        }
    }

    // Finds the adjacent unvisited cells coordinates
    getAdjacent(self, startX, startY){
        let adjCoord = []
        
        if(startX != 0 && !self.cells[startX - 1][startY].visited){  // Left cell
            adjCoord.push([startX - 1, startY])
        }
        if(startX != self.cellNumber - 1 && !self.cells[startX + 1][startY].visited){  // Right cell
            adjCoord.push([startX + 1, startY])
        }
        if(startY != 0 && !self.cells[startX][startY - 1].visited){  // Top cell
            adjCoord.push([startX, startY - 1])
        }
        if(startY != self.cellNumber - 1 && !self.cells[startX][startY + 1].visited){  // Bottom cell
            adjCoord.push([startX, startY + 1])
        }

        return adjCoord
    }


    printBoard(){
        this.ctx.fillStyle = 'white'
        for(let i = 0; i < this.cellNumber; i++){
            for(let j = 0; j < this.cellNumber; j++){
                let cell = this.cells[i][j]
                this.ctx.fillStyle = 'white'
                
                this.ctx.fillRect(i*this.cellSize + GAP_SPACE/2, j*this.cellSize + GAP_SPACE/2, this.cellSize - GAP_SPACE, this.cellSize - GAP_SPACE)

                // Draw openings when there are no walls
                this.ctx.fillStyle = 'white'
                if(!cell.walls.bottom){
                    this.ctx.fillRect(i*this.cellSize + GAP_SPACE/2, (j + 1)*this.cellSize - GAP_SPACE/2, this.cellSize - GAP_SPACE, GAP_SPACE/2)
                }
                if(!cell.walls.top){
                    this.ctx.fillRect(i*this.cellSize + GAP_SPACE/2, j*this.cellSize, this.cellSize - GAP_SPACE, GAP_SPACE/2)
                }
                if(!cell.walls.right){
                    this.ctx.fillRect((i+1)*this.cellSize - GAP_SPACE/2, j*this.cellSize + GAP_SPACE/2, GAP_SPACE/2, this.cellSize-GAP_SPACE)
                }
                if(!cell.walls.left){
                    this.ctx.fillRect(i*this.cellSize, j*this.cellSize + GAP_SPACE/2, GAP_SPACE/2, this.cellSize-GAP_SPACE)
                }
            }
        }
    }
}
