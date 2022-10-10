// Each rain drop
class matrixRain
{
    constructor(x, y, speed, first)
    {
        this.x = x;
        this.y = y;
        this.character;
        this.speed = speed;
        this.delay = round(random(5, 20));
        this.first = first;
    }

    RandomCharacterGenerator()
    {
        if(frameCount % this.delay == 0)
        {
            this.character = String.fromCharCode(0x3040 + round(random(0, 86)));
        }
    }

    // render for each matrix rain drop
    render()
    {
        if(this.y >= height)
        {
            this.y = 0;
        }
        else
        {
            this.y += this.speed;
        }
    }
}

// one stream of matrix rain
class matrixRains
{
    constructor()
    {
        this.characters = [];
        this.numberOfCharacter = round(random(5, 30));
        this.speed = round(random(5, 15));
    }

    RandomCharacters(x, y)
    {
        var first = round(random(0, 1)) == 1;
        for(var i = 0; i <= this.numberOfCharacter; i++)
        {
            var char = new matrixRain(x, y, this.speed, first);
            char.RandomCharacterGenerator();
            this.characters.push(char);
            y -= characterSize;
            first = false;
        }
    }

    Render()
    {
        this.characters.forEach(function(char)
        {
            if(char.first)
            {
                fill(200, 255, 200);
            }
            else
            {
                if(char.speed <= 8)
                {
                    fill(0, 150, 0);
                }
                else
                {
                    fill(0, 255, 70);
                }
            }
            text(char.character, char.x, char.y);
            char.render();
            char.RandomCharacterGenerator();
        })
    }
}


var rainArr = [];
var characterSize = 20;

function setup()
{
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);

    var x = 0;
    for(var i = 0; i < width / characterSize; i++)
    {
        var rain = new matrixRains();
        rain.RandomCharacters(x, round(random(-500, 0)));
        rainArr.push(rain);
        x += characterSize;
    }

    textSize(characterSize);
}

function draw()
{
    // change the opacity level
    background(0, 150);
    rainArr.forEach(function(rain)
    {
        rain.Render();
    })
}