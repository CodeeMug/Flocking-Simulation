// Boid class
class Boid {
    
    
    // Setup variables
    constructor (karguments) {
        
        // Position instances
        this.position = karguments["XY"];
        this.angle = 0;
        this.size = 10;
        
        this.width = karguments["WH"][0];
        this.height = karguments["WH"][1];
        
        // Physic instances
        this.acceleration = karguments["acceleration"];
        this.velocity = karguments["velocity"];
        
        // Color instances
        this.R = round(random(150, 220));
        this.G = round(random(150, 220));
        this.B = round(random(150, 220));

        // Make adjustments
        this.velocity.setMag(10.5);
    }
    
    
    // Calcule functions
    calcule (boids) {
        
        // Calcule new position and velocity
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.adjustPosition();
        
        // - BOIDS RULES - 
        this.boidsRules(boids);
    }
    
    
    // Calcule boids rules
    boidsRules (boids) {
        
        // Create adjust vector & rules dependencies
        let adjust = createVector();
        let velocitySum = createVector();
        let positionSum = createVector();
        let differanceSum = createVector();
        
        let quantity = 0
        
        // Get current boid position
        let thisX = this.position.x;
        let thisY = this.position.y;
        
        // Iterate throw the array
        for (let item of boids) {
            
            // Get item position
            let itemX = item.position.x;
            let itemY = item.position.y;
            
            // Get distance between boids
            let distance = dist(
                thisX,
                thisY,
                itemX,
                itemY);
            
            if (item != this && distance < rangeSlider.value()) {
                quantity++;
                
                // Alingment
                velocitySum.add(item.velocity);
                
                // Cohesion
                positionSum.add(item.position);
                
                // Separation
                let differance = p5.Vector.sub(this.position, item .position);
                differance.div(distance);
                differanceSum.add(differance);
            }
        }
        
        // Calcule adjust
        let aling = this.aling(quantity, velocitySum);
        let cohesion = this.cohesion(quantity, positionSum);
        let separation = this.separation(quantity, differanceSum);
        
        adjust.add(aling);
        adjust.add(cohesion);
        adjust.add(separation);
        
        this.acceleration = adjust;
    }

    
    aling (quantity, velocitySum) {
        
        // Setup alingment variables
        let newAcceleration = velocitySum;
        
        // Calcule and setup alingment
        if (quantity > 0) {
            newAcceleration.div(quantity);
            newAcceleration.setMag(maxVelocitySlider.value());
            newAcceleration.sub(this.velocity);
            newAcceleration.limit(maxAccelerationSlider.value());
        }
            
        return newAcceleration.mult(alingSlider.value());
    }
    
    
    cohesion (quantity, positionSum) {
        
        // Setup alingment variables
        let newAcceleration = positionSum;
        
        // Calcule and setup alingment
        if (quantity > 0) {
            newAcceleration.div(quantity);
            newAcceleration.sub(this.position);
            newAcceleration.setMag(maxVelocitySlider.value());
            newAcceleration.sub(this.velocity);
            newAcceleration.limit(maxAccelerationSlider.value());
        }
            
        return newAcceleration.mult(cohesionSlider.value());
    }
    
    
    separation (quantity, differanceSum) {
        
        // Setup alingment variables
        let newAcceleration = differanceSum;
        
        // Calcule and setup alingment
        if (quantity > 0) {
            newAcceleration.div(quantity);
            newAcceleration.setMag(maxVelocitySlider.value());
            newAcceleration.sub(this.velocity);
            newAcceleration.limit(maxAccelerationSlider.value());
        }
            
        return newAcceleration.mult(separationSlider.value());
    }
    
    
    // Auxiliar functions
    adjustPosition () {
                 
        // Setup position variables
        let X = this.position.x;
        let Y = this.position.y;
        let newX = X;
        let newY = Y;

        // Calcule X
        if (X + this.size < 0) {
            newX = this.width + this.size;
        } else if (X - this.size > this.width) {
            newX = 0 - this.size;
        }

        // Calcule Y
        if (Y + this.size < 0) {
            newY = this.height + this.size;
        } else if (Y - this.size > this.height) {
            newY = 0 - this.size;
        }
        
        this.position = createVector(newX, newY);
    }
    
    
    // Display object at window
    show () {
        
        // Get theta
        let angle = this.velocity.heading() - radians(90);
        
        // Draw ellipse
        push();
        
        noFill();
        stroke(this.R, this.G, this.B);
        strokeWeight(2);
        
        translate(this.position.x, this.position.y);
        rotate(angle)
        
        triangle(
            -this.size/2, 
            -this.size/1.5,
            this.size/2 + 2, 
            -this.size/1.5,
            0, 
            this.size)
        
        pop()
    }
}
