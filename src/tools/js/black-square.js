const blackSquareInstance = function(render) {

    render.setup = function() {
        const parent = document.querySelector("div.black-square-sketch")
        const canvas = render.createCanvas(200, 200)
        parent.appendChild(canvas.elt)
        render.background(0)
    }
    
    render.draw = function() {}
} 

new p5(blackSquareInstance)