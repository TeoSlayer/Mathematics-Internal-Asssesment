p5.disableFriendlyErrors = true;
let population = [];
let populationTotal = 0;
let infectedFromStart = 0;
let iteration = 0;

let HEIGHT = 0;
let WIDTH_POPULATION = 0;
let WIDTH_GRAPH = 0;

const SCALE = 3;
const TIME_SCALE = 8;

function setup() {
    HEIGHT = windowHeight - 5;
    WIDTH_POPULATION = windowWidth / 2 - 2;
    WIDTH_GRAPH = windowWidth / 2 - 2;
    populationTotal = HEIGHT * SCALE;
    zombiesFromStart = 10;
    for (let i = 0; i < zombiesFromStart; i++) {
        population.push(new Individual(WIDTH_POPULATION, HEIGHT, Individual.ZOMBIES));
    }
    for (let i = 0; i < populationTotal - zombiesFromStart; i++) {
        population.push(new Individual(WIDTH_POPULATION, HEIGHT, Individual.SUSCEPTIBLE));
    }
    createCanvas(WIDTH_POPULATION + WIDTH_GRAPH, HEIGHT);
    textSize(18);
    background(180);
    text(`${HEIGHT * SCALE}`, WIDTH_POPULATION + 10, 25);
    text('0', WIDTH_POPULATION + 10, HEIGHT - 10);
}

function draw() {
    stroke('black');
    fill(180);
    rect(0, 0, WIDTH_GRAPH + 2, HEIGHT);
    strokeWeight(3);
    let susceptible = filterByStatus(Individual.SUSCEPTIBLE);
    let BITTEN = filterByStatus(Individual.BITTEN);
    let ZOMBIES = filterByStatus(Individual.ZOMBIES);
    let DEAD = filterByStatus(Individual.DEAD);
    stroke('yellow');
    susceptible.forEach(individual => {
        point(individual.posX, individual.posY);
        individual.update();
    });
    stroke('red');
    BITTEN.forEach(individual => {
        point(individual.posX, individual.posY);
        individual.update();
    });
    stroke('green');
    ZOMBIES.forEach(individual => {
        point(individual.posX, individual.posY);
        population
            .filter(candidate => Math.abs(individual.posX - candidate.posX) <= 2 && Math.abs(individual.posY - candidate.posY) <= 2)
            .forEach(candidate => candidate.infect());
        individual.update();
    });
    stroke('black');
    DEAD.forEach(individual => {
        point(individual.posX, individual.posY);
    });
    fill(0);
    stroke('black');
    strokeWeight(0.5);
    text(`Susceptible: ${susceptible.length}`, 10, 25);
    text(`Bitten: ${BITTEN.length}`, 10, 45);
    text(`Zombies: ${ZOMBIES.length}`, 10, 65);
    text(`Dead: ${DEAD.length}`, 10, 85);
    drawGraph(susceptible.length, BITTEN.length, ZOMBIES.length, DEAD.length)
}

function filterByStatus(status) {
    return population.filter(individual => individual.status == status);
}

function drawGraph(susceptible, BITTEN, ZOMBIES, DEAD) {
    translate(0, HEIGHT);
    strokeWeight(2);
    stroke('green');
    point(iteration / TIME_SCALE + WIDTH_POPULATION, -ZOMBIES / SCALE);
    stroke('black');
    point(iteration / TIME_SCALE + WIDTH_POPULATION, -DEAD / SCALE);
    stroke('yellow');
    point(iteration / TIME_SCALE + WIDTH_POPULATION, -susceptible / SCALE);
    stroke('red');
    point(iteration / TIME_SCALE + WIDTH_POPULATION, -BITTEN / SCALE);
    iteration++;
}