# Conjunto de Mandelbrot

Pode ser que você já tenha ouvido falar do conjunto de Mandelbrot (Mandelbrot set), de fato ele é bem famoso e utilizado por jovens usuários de psicoativos devido a sua beleza e diferentes padrões que surgem ao darmos "zoom" nesse conjunto. Mas matemáticamente, como podemos definir o conjunto de Mandelbrot?

## Números complexos na verdade são bem simples

Antes de tudo, vamos lembrar o que são números complexos. Um número complexo (péssimo nome pra se dar a um conjunto) é qualquer número que possa ser escrito na forma `a + bi` ou `(a, bi)`, onde `a` e `b` são números reais e `i` é um número tal que `i² = -1`, ou seja, temos que o único valor possível para `i` é `√-1`.

Se você nunca estudou números complexos pode estar confuso com `√-1`, muitos professores de ensino fundamental e médio costumam falar que não existem raízes quadradas de números negativos, entretanto uma correção a essa sentença seria de que não existem raízes quadradas _reais_ para números negativos. O conjunto dos números complexos são um superconjunto dos números reais, isso significa que TODOS os números reais são números complexos, porém nem todos os números complexos são reais, quer que eu te prove?

Vamos primeiro provar que todos os números reais são complexos, como eu disse antes, números complexos são números que podem ser escritos na forma `a + bi` ou `(a, bi)`, para escrever qualquer número real como um complexo, simplesmente adotamos para `b` o valor 0, dessa forma temos que o conjunto dos números reais puros é descrito como `{(a, 0i) | a ∈ R}`.

Com o mesmo pensamento porém indo na outra direção, podemos encontrar números dentro do conjunto dos complexos que não são reais, basta assumirmos para `a` o valor 0 e para `b` o valor de todos os reais, assim temos que o conjunto dos números imaginários puros é descrito como `{(0, bi) | b ∈ R}`.

<div align="center">
    <img src="./../assets/venn.svg" alt="Diagrama de Venn dos números complexos" width="500"/>
</div>

## A magnitude de um número complexo

Assim como costumamos representar pontos em um plano cartesiano, podemos também representar os números complexos no chamado plano de Argand-Gauss, que possui o eixo `X` como eixo real e o `Y` como eixo imaginário, formando as duas componentes necessárias para representarmos um número complexo `z` da forma `(a, bi)`. No gráfico abaixo está representado o número (4, 3i), descomposto em cada eixo pelas retas vermelhas e uma outra reta azul, representando a magnitude de um número complexo.

<div align="center">
    <img src="./../assets/4.png" alt="Representação de (4, 3i) no plano complexo" width="300"/>
</div>

Geométricamente a magnitude de um número complexo é dada pela distância do número em relação a origem do sistema, com a notação de `|a + bi|` sendo usada para denotar a magnitude no número `a + bi`. Você pode encontrar a magnitude tanto usando a fórmula de distância entre dois pontos quanto pelo teorema de Pitágoras. Como eu não sou bobo escolhi um número que forma o triângulo mais clássico possível, e temos que o valor da hipotenusa (que também é o valor da magnitude desse complexo) é 5.

## Voltando ao conjunto de Mandelbrot

Agora que já passamos por esse nem um pouco dolorosa revisão sobre números complexos, chegou a hora de definirmos matemáticamente (e com um pouco de sorte quem sabe até construirmos nossa própria visualização) do conjunto de Mandelbrot, que aqui chamarei de M. Por enquanto vamos dizer que `M = {c | c atende ao caso 2}`. O que é `c`? O que é o caso 2?

Vamos começar supondo um número complexo qualquer `c`, esse número que depois será parte (ou não) do nosso conjunto. A função `f(z) = z² + c` possui dois comportamentos possíveis para diferentes valores de `c` quando aplicados iterativamente começando pelo valor 0. 

### Primeiro caso (aquele que não faz parte do conjunto)

Para o primeiro caso, vamos exemplificar utilizando o valor 1 para `c`. Como provado antes, 1 é um número complexo que pode ser representado como `1 + 0i`, mas no momento apenas 1 ja é o suficiente para nós. Se aplicarmos 0 a função `f(z) = z² + 1` teremos algo como:

```
f(0) = 0² + 1 = 1
f(1) = 1² + 1 = 2
f(2) = 2² + 1 = 5
f(5) = 5² + 1 = 26
f(26) = 26² + 1 = 677
f(676) = 676² + 1 = 458330
.
.
.
```

Basicamente, quando a distância entre os números complexos gerador por essa função (gerada utilizando o valor de `c` como uma constante e como variável uma iteração sobre resultados a partir de 0) e a origem do plano Argand-Gauss for crescendo ao infinito, dizemos que `c` não satisfaz a regra de formação do conjunto M.

### Segundo caso (aquele que faz parte do conjunto)

Agora, curiosamente podemos exemplificar essa dicotomia utilizando um caso oposto, `c` = -1, obtendo uma função `f(z) = z² - 1`, e ao aplicarmos a mesma iteração aplicada a função anterior, talvez sua mente exploda um tantinho:

```
f(0) = 0² - 1 = -1
f(-1) = (-1)² - 1 = 0
f(0) = 0² - 1 = -1
f(-1) = (-1)² - 1 = 0
f(0) = 0² - 1 = -1
f(-1) = (-1)² - 1 = 0
.
.
.
```

Os valores da iteração começaram a se repetir, e vão continuar esse repetição infinitamente, mas isso não é o importante, o segundo caso (e ganhador do nosso concurso de quem quer ser um Mandelbrot) é descrito como uma aplicação onde a distância entre o complexo gerado e a origem nunca ultrapassa o valor 2.