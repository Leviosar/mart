const thirdStepInstance = function(render) {

    render.setup = function() {
        const parent = document.querySelector("div.third-step-painter")
        const canvas = render.createCanvas(parent.offsetWidth, 350)
        
        parent.appendChild(canvas.elt)
        parent.style.border = "1px solid black"
        
        render.background(255)
        render.colorMode(render.HSL)
        render.drawColorPicker()
    }
    
    render.draw = function() {
        
        if (render.mouseIsPressed && render.mouseY > 30) {
            render.noStroke()
            render.fill(render.pencil.color.hue, render.pencil.color.saturation, render.pencil.color.lightness)
            render.ellipse(render.mouseX, render.mouseY, 10)
        }

    }

    render.mouseClicked = function() {
        if (render.mouseY < 30) {
            render.pencil.color.hue = render.mouseX / 2
        } 
    }

    render.colors = {
        hue: 0,
        saturation: 100,
        lightness: 50
    }

    render.pencil = {
        color: {
            hue: 0,
            saturation: 100,
            lightness: 50
        }
    }
    
    render.drawColorPicker = function() {
        let x = 0
        render.noStroke()
        
        while (render.colors.hue < 360) {
            render.fill(render.colors.hue, render.colors.saturation, render.colors.lightness)
            render.rect(x, 0, 2, 30)
            render.colors.hue++
            x += 2
        }
        
        render.fill(360, 0, 100)
        render.rect(x, 0, render.width - x, 15)
        render.fill(360, 0, 0)
        render.rect(x, 15, render.width - x, 15)
    }
} 


new p5(thirdStepInstance)