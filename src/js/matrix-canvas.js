const instance = function(render) {

    render.setup = function() {
        const canvas = render.createCanvas(300, 300)
        document.querySelector('div.matrix-canvas').appendChild(canvas.elt)
        render.pixelDensity(1)
    }
    
    
    render.draw = function() {
        render.loadPixels()
    
        for (let x = 0; x < render.width; x++) {
            for (let y = 0; y < render.height; y++) {
                let currentPixel = (x + y * render.width) * 4
                if (x == y) {
                    render.pixels[currentPixel + 0] = 222
                    render.pixels[currentPixel + 1] = 147
                    render.pixels[currentPixel + 2] = 95
                    render.pixels[currentPixel + 3] = 255
                } else if (x + y == render.width + 1) {
                    render.pixels[currentPixel + 0] = 178
                    render.pixels[currentPixel + 1] = 148
                    render.pixels[currentPixel + 2] = 187
                    render.pixels[currentPixel + 3] = 255
                } else {
                    render.pixels[currentPixel + 0] = 29
                    render.pixels[currentPixel + 1] = 31
                    render.pixels[currentPixel + 2] = 33
                    render.pixels[currentPixel + 3] = 255
                }
            }
        }
    
        render.updatePixels()
    }
} 

const matrixCanvas = new p5(instance)