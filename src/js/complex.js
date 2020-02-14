function setup() {
    const parent = document.querySelector("div.complex-plane")
    const canvas = createCanvas(parent.offsetWidth, 350)
    parent.appendChild(canvas.elt)

    background(255)
    drawGrid()
    drawAxis()
    drawPoint(120,90)
    drawGuides(120,90)
}

function draw(){
    background(255)
    let planeX = (mouseX - width/2)
    let planeY = (mouseY - height/2)  
    document.querySelector('code#complex-number').innerText = `(${parseInt(planeX)}, ${parseInt(- planeY)}i)`
    document.querySelector('code#complex-number-magnitude').innerText = `${parseInt(Math.sqrt((planeX ** 2 + planeY ** 2)))}`
    drawGrid()
    drawAxis()
    drawPoint(mouseX, mouseY)
    drawGuides(mouseX, mouseY)
}

function drawAxis() {
    stroke(0)
    line(width/2, 0, width/2, height)
    line(0, height/2, width, height/2)
}

function drawGrid() {
    const halfRows = (height / 2) / 30
    const halfColumns = (width / 2) / 30

    stroke(200)
    strokeWeight(1)
    
    for (let i = 0; i < halfRows; i++) {
        line(0, height/2 + (30 * i), width, height/2  + (30 * i))
        line(0, height/2 - (30 * i), width, height/2  - (30 * i))
    }
    
    for (let i = 0; i < halfColumns; i++) {
        line(width/2 + (30 * i), 0, width/2 + (30 * i), height)
        line(width/2 - (30 * i), 0, width/2 - (30 * i), height)
    }
}

function drawPoint(x, y) {
    translate(width/2, height/2)
    fill(0)
    stroke(0)
    ellipse((x - width/2), ((y - height/2)), 4)
    noStroke()
    translate(-width/2, -height/2)
}

function drawGuides(x, y) {
    translate(width/2, height/2)
    let planeX = (x - width/2)
    let planeY = (y - height/2)  
    stroke(255, 0, 0)
    line(planeX, 0, planeX, planeY)
    line(0, planeY, planeX, planeY)
    stroke(0, 0, 255)
    line(0,0, planeX, planeY)
    translate(-width/2, -height/2)
}