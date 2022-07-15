import { Labyrinth } from "./Labyrinth.js";

const input = document.getElementById('input')
const btn = document.getElementById('btn')

// Create labyrinth
const l = new Labyrinth()

let entered; // Number of cells

input.addEventListener('change',(e)=>{
    entered = parseInt(e.target.value)
})
btn.addEventListener('click',()=>{
    if(isNaN(entered)) {
        console.log('Invalid input')
        return
    }
    if(entered <= 1 || entered > 60){
        console.log('Number should be between 1 and 60')
        return
    }
    l.start(entered)
})
