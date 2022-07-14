import { Labyrinth } from "./Labyrinth.js";


const btn = document.getElementById('btn')
const l = new Labyrinth(20)
btn.addEventListener('click',()=>{
    l.start()
})

