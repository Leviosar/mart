const maxIterations = 200

const range = {
    min: -2,
    max: 2,
}

const mandelbrotInstance = function(render) {

    render.setup = function() {
        const canvas = render.createCanvas(300, 300)
    
        document.querySelector('div.mandelbrot-canvas').appendChild(canvas.elt)
        
        document.querySelector('input#max-range').addEventListener('input', (ev) => {
            range.max = (ev.target.value / 100)
            range.min = - (ev.target.value / 100)
        })

        render.pixelDensity(1)
    }
    
    render.draw = function() {
        render.loadPixels()
    
        for (let x = 0; x < render.width; x++) {
            for (let y = 0; y < render.height; y++) {
    
                let a = render.map(x, 0, render.width, range.min, range.max)
                let b = render.map(y, 0, render.height, range.min, range.max)
                let originalA = a
                let originalB = b
                let pix = (x + y * render.width) * 4
    
                let n = 0
    
                while (n < maxIterations) {
                    let real = a * a - b * b
                    let imaginary = 2 * a * b
                
                    a = real + originalA
                    b = imaginary + originalB
    
                    if (render.abs(real + imaginary) > 2) break
    
                    n++
                }
    
                let bright = render.map(n, 0, maxIterations, 0, 255)
    
                if (n === maxIterations) {
                    bright = 0
                }
    
                render.pixels[pix + 0] = bright
                render.pixels[pix + 1] = bright
                render.pixels[pix + 2] = bright
                render.pixels[pix + 3] = 255
            }
        }

        
        render.updatePixels()
    }

} 

const mandelbrotCanvas = new p5(mandelbrotInstance)