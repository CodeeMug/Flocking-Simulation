// Setup global variables
let boids = [];

let width = 800;
let height = 650;

let alingSlider;
let cohesionSlider;
let separationSlider;
let rangeSlider;
let maxVelocitySlider;
let maxAccelerationSlider;


// Setup environment
function setup() {
    
    // Initialize canvas
    let X = (windowWidth - width) / 2;
    let Y = (windowHeight - height) / 2;
	let canvas = createCanvas(width, height);
    canvas.position(X, Y)
    
    background(40);
    
    // Initialize sliders
    alingSlider = createSlider(0, 2.5, 1.0, 0.05);
    cohesionSlider = createSlider(0, 2.5, 1, 0.05);
    separationSlider = createSlider(0, 2.5, 1.2, 0.05);
    rangeSlider = createSlider(0, 150, 50, 0.5);
    maxVelocitySlider = createSlider(0, 10, 6, 0.1);
    maxAccelerationSlider= createSlider(0, 5, 1, 0.1);
    
    // Initialize text
    let alingment = createDiv('Alingment');
    let cohesion = createDiv('Cohesion');
    let separation = createDiv('Separation');
    let range = createDiv('Range');
    let maxVelocity = createDiv('Maximum velocity');
    let maxAccelaration = createDiv('Maximum acceleration')
    
    // Set position
    alingSlider.position(20, (height / 2) - 50);
    cohesionSlider.position(20, (height / 2));
    separationSlider.position(20, (height / 2) + 50);
    rangeSlider.position(20, (height / 2) + 100);
    maxVelocitySlider.position(20, 70);
    maxAccelerationSlider.position(20, 120);
    
    alingment.position(35, (height / 2) - 70);
    cohesion.position(35, (height / 2)- 20);
    separation.position(35, (height / 2) + 30);
    range.position(35, (height / 2) + 80);
    maxVelocity.position(35, 50);
    maxAccelaration.position(35, 100);
    
    // Create boids
    for (let i = 0; i < 100; i++) {
        
        // Create arguments
        let X = random(width)
        let Y = random(height)
        
        let arguments = {
            WH: [width, height],
            XY: createVector(X, Y),
            velocity: p5.Vector.random2D(),
            acceleration: createVector(),
            };
        
        // Create boid object
        let boid = new Boid(arguments);
        boids.push(boid)
    }
}


// Draw elements on window
function draw() {
    
    // Draw background
    background(40, 120);
    
    // Draw boids
    boids.forEach( function (item, index, array) {
        item.calcule(array)
        item.show()
    })
}