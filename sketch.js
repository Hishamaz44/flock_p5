import { Boids } from './Boids.js'
let flock = []

window.setup = function() {
    createCanvas(windowWidth, windowHeight);
    initializeFlock(10)
    console.log(flock)
}

window.draw = function(){
    background(51);
    fill(255, 0, 200);
    for (let boids of flock){
        boids.update()
        boids.show()
        // boids.edges()
    }
}

function initializeFlock(){
    for (let i = 0; i < 10; i++){
        flock.push(new Boids())
    }
}







