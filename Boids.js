export class Boids {
    constructor() {
        this.position = createVector(random(width), random(height))
        this.velocity = p5.Vector.random2D()
        this.velocity.setMag(random(1, 3));
        this.acceleration = createVector()
        this.maxSpeed = 4
        this.maxForce = 0.2
    }

    update(){
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)

        // resetting acceleration
        this.acceleration.mult(0)

        // wrapping code
        this.edges()
    }

    show(){
        strokeWeight(8);
        stroke(255);
        


        // rotate the background based on each boid's angle, and do that for all
        push()
        translate(this.position.x, this.position.y)
        rotate(this.velocity.heading())
        triangle(-10, -5, 10, 0, -10, 5)
        // ellipse(0, 0, 80);
        pop()
        
    }

    edges(){
        if (this.position.x > width) {
            this.position.x = 0
        } 
        if ( this.position.x < 0) {
            this.position.x = width
        }
        if ( this.position.y < 0) {
            this.position.y = height
        }
        if ( this.position.y > height) {
            this.position.y = 0
        }
    }

    // alignment logic

    alignment(){
        // create the radius for each object
        
    }

    // Create the separation logic

    separation(flock){
        let steeringVector = createVector(0,0)
        let total = 0
        const perceptionRadius = 80
        for (let other of flock){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)
            if (d > 0 && d < perceptionRadius) {
                let velocity = p5.Vector.sub(this.position, other.position)
                velocity.div(d)
                steeringVector.add(velocity)
                total++
            }
        }
        if(total != 0){
            steeringVector = steeringVector.div(total)
            steeringVector.setMag(this.maxSpeed); 
            steeringVector.sub(this.velocity);    
            steeringVector.limit(this.maxForce);  
            this.acceleration.add(steeringVector)
        }
        
    }
}