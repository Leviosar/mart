<script src="./../js/p5.min.js"></script>
<script src="./../js/matrix-canvas.js"></script>
<script src="./../js/mandelbrot.js"></script>

# Visualizando o conjunto de Mandelbrot

Nessa altura do campeonato você já deve ter imaginado que vamos criar uma visualização simples do conjunto usando p5.js, a primeira coisa que temos que ter em mente é como vamos decidir se um número complexo é ou não parte do nosso conjunto. Computacionalmente isso é um pouco nebuloso, já que na teoria teríamos que visualizar o comportamente da iteração vista no capítulo anterior com infinitas repetições. E se tem algo que aprendi em todos esse anos nessa indústria vital é: computadores não lidam bem com coisas infinitas.

"Ok, entendi, não podemos usar o infinito, mas então o que vamos fazer? Usar um valor real arbitrário? Isso parece idiota."

É exatamente isso que vamos fazer, e nem é tão idiota assim, não estamos tentando achar uma prova matemática inédita e elaborada que precise de corretude completa, isso aqui é muito mais lúdico. Vamos começar criando nosso sketch base para uma aplicação p5, junto com a constante de iterações máximas.

```javascript
// Essa constante é criada fora das funções para estar acessível em ambas
const maxIterations = 100

function setup() {
    // Vai ficar melhor se for um quadrado, confia em mim
    createCanvas(window.innerHeight, window.innerHeight)
    // Como vamos mexer diretamente com os pixels da tela
    // melhor ter certeza sobre a densidade do nosso sketch
    pixelDensity(1)
}


function draw() {}
```

Como eu disse ali nos comentários (você deveria mesmo ler os comentários), vamos mexer diretamente nos pixels do nosso sketch, isso porque queremos ter controle total sobre todos os valores que vão ser mostrados na tela. Pra isso, vamos usar as funções `loadPixels()` e `updatePixels()` do p5 e um `for loop` aninhado para iterarmos a matrix de pixels.

```javascript
const maxIterations = 100

function setup() {
    createCanvas(window.innerHeight, window.innerHeight)
    pixelDensity(1)
}

function draw() {
    loadPixels()

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // Esse 4 se refere aos 4 valores que cada pixel possui
            // um para cada canal RGBA (red, green, blue, alpha)
            // em currentPixel temos o index inicial do nosso pixel atual
            let currentPixel = (x + y * width) * 4
        }
    }

    updatePixels()
}
```

Esse processo de "descobrir" os valores certos de cada pixel correspondente é bem comum quando se trabalha com manipulação de imagens já que elas são guardadas em memória em um array de pixels unidimensional. Antes de continuarmos, vamos dar uma brincada com esse quadro antes, se eu me lembro bem, a diagonal principal de uma matriz é verificada por `i == j`, no nosso caso `x == y`, enquanto a secundária `i + j == n + 1`, sendo `n` o grau da matriz. Vamos desenhar duas retas nessas diagonais.

```javascript
const maxIterations = 100

function setup() {
    createCanvas(window.innerHeight, window.innerHeight)
    pixelDensity(1)
}

function draw() {
    loadPixels()

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let currentPixel = (x + y * width) * 4
        
            // Dentro de um bloco de loadPixels() e updatePixels()
            // podemos acessar e modificar o array p5.pixels que contém todos
            // os pixels do frame atual.

            if(x == y) {
                pixels[currentPixel + 0] == 255
                pixels[currentPixel + 1] == 0
                pixels[currentPixel + 2] == 0
                pixels[currentPixel + 3] == 255
            } else if (x + y == width + 1) {
                pixels[currentPixel + 0] == 0
                pixels[currentPixel + 1] == 255
                pixels[currentPixel + 2] == 0
                pixels[currentPixel + 3] == 255
            } else {
                pixels[currentPixel + 0] == 0
                pixels[currentPixel + 1] == 0
                pixels[currentPixel + 2] == 0
                pixels[currentPixel + 3] == 255
            }
        }
    }

    updatePixels()
}
```

Cada pixel dessa imagem foi calculado e desenhado "manualmente" pelo nosso código, podemos usar esse tipo de técnica para desenhar virtualmente qualquer coisa.

<div class="matrix-canvas" style="width: 100%; display: flex; justify-content: center"></div>

Voltando da nossa brincadeira, tudo que precisamos fazer agora é assumir que cada pixel é um ponto no plano complexo com valor correspondente a um complexo que será mapeado para criarmos um range. Depois de fazer isso podemos calcular se aquele ponto pertence ou não ao conjunto de Mandelbrot e colorir o ponto conforme o resultado.

Vamos aos cálculos, a função que temos que aplicar é `f(z) = z² + c`, resolver `z²` é um produto notável, `(a + bi) * (a + bi)`, abrindo isso temos `a² + abi + abi + b²i²`. Se lembrarmos que `i` é igual a `sqrt(-1)`, então `i²` é `-1`. Simplifcando a expressão de antes temos `a² + 2abi - b²`, separando as partes reais e imaginárias seria `a² - b² + 2abi`.

Apagando aquele exemplo com as diagonais da matriz e adicionando um `while loop` com nossos cálculos o código deve estar mais ou menos assim


```javascript
const maxIterations = 100

function setup() {
    createCanvas(window.innerHeight, window.innerHeight)
    pixelDensity(1)
}

function draw() {
    loadPixels()

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let currentPixel = (x + y * width) * 4
            
            // escolhi um range arbitrário (mas não tanto)
            // de -2 a 2, já que assim podemos ver o conjunto completo
            // a função map recebe dois ranges e um valor que está dentro
            // do range inicial, ela retorna o valor correspondente no range final 
            let a = map(x, 0, width, -2, 2)
            let b = map(y, 0, height, -2, 2)
            
            // Vamos precisar do valor original de a e b
            // já que essas variáveis vão ser modificadas no while
            let originalA = a
            let originalB = b

            let n = 0
            while (n < maxIterations) {
                // a² - b² 
                let real = (a * a) - (b * b)
                // 2abi
                let imaginary = 2 * a * b
            
                // fazemos as operações sempre separando as partes
                // reais das imaginárias, então (a + bi) + (c + di) 
                // é [(a + c) + (b + d)i], por isso aqui adicionamos
                // os valores de a e b originais separadamente
                a = real + originalA
                b = imaginary + originalB

                n++
            }
        }
    }

    updatePixels()
}
```

Até agora nosso algoritmo apenas faz as operações necessárias pra verificarmos se um número faz ou não parte do conjunto, nos falta checar os resultados dessa operação. Basicamente queremos criar um `break` para parar a execução do nosso `while` quando o número atual ultrapassar algum inteiro que iremos escolher, além disso precisamos diferenciar visualmente os pontos que fazem ou não parte do conjunto.

```javascript
const maxIterations = 100

function setup() {
    createCanvas(window.innerHeight, window.innerHeight)
    pixelDensity(1)
}

function draw() {
    loadPixels()

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let currentPixel = (x + y * width) * 4

            let a = map(x, 0, width, -2, 2)
            let b = map(y, 0, height, -2, 2)
            let originalA = a
            let originalB = b

            let n = 0
            while (n < maxIterations) {
                let real = (a * a) - (b * b)
                let imaginary = 2 * a * b
                a = real + originalA
                b = imaginary + originalB

                // O valor 2 é parcialmente arbitrário
                // você pode tentar com outros valores 
                // e ver como fica visualmente 
                if (abs(real + imaginary) > 2) break

                n++
            }

            // Vamos mapear o número de iterações a um range de 0,255
            // Esse são os valores inteiros possíveis pra um tom de cinza em RGB
            let bright = map(n, 0, maxIterations, 0, 255)

            // Ao acessar o pixel correspondente a esse ponto
            // modificamos o valor da cor dele para uma escala de cinza
            // obtida na última operação de mapeamento
            pixels[pix + 0] = bright
            pixels[pix + 1] = bright
            pixels[pix + 2] = bright

        }
    }

    updatePixels()
}
```

E voilá, nosso conjunto já está sendo plotado no gráfico, você pode pensar em outras maneiars de colorir e a partir daqui fazer sua própria expressão do conjunto. Você também pode alterar o zoom alterar o range minimo e máximo (aqueles valores de -2 e 2), no exemplo abaixo eu criei dois inputs sliders pra controlar os ranges, mas o nosso querido browser provavelmente vai travar bastante tentando calcular e renderizar todos esses pixels.


<style>
    .slidecontainer {
        width: 100%;
    }

    .slider {
        -webkit-appearance: none;
        width: 300px;
        height: 25px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        margin-top: 25px;
    }

    .slider:hover {
        opacity: 1;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        background: #de935f;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        background: #de935f;
        cursor: pointer;
    }

    section.mandelbrot-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>

<section class="mandelbrot-section">
    <div class="mandelbrot-canvas" style="width: 100%; display: flex; justify-content: center">
    </div>
    <div class="input-group">
        <input value="200" class="slider" id="max-range" type="range" min="0" max="500">
    </div>
</section>

