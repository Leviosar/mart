const firstStepInstance = function(render) {

    render.setup = function() {
        const parent = document.querySelector("div.first-step-painter")
        const canvas = render.createCanvas(parent.offsetWidth, 350)
        parent.appendChild(canvas.elt)
        render.background(255)
    }
    
    
    render.draw = function() {
        if (render.mouseIsPressed) {
            render.noStroke()
            render.fill(255,0,0)
            render.ellipse(render.mouseX, render.mouseY, 10)
        }
    }
} 


new p5(firstStepInstance)