// calling the <canvas> element from index.html
const canvas = document.querySelector('canvas');

// "c" = context
const c = canvas.getContext('2d');

// define canvas width & height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// "Boundary" class definition
class Boundary {
    static width = 40;
    static height = 40;
    constructor({ position }) {
        this.position = position;
        this.width = 40;
        this.height = 40;
    }

    // draw method
    draw() {
        c.fillStyle = 'blue';
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
    }
};

// "Player" class definition
class Player {
    // prototype
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
    }

    draw() {
        // start line
        c.beginPath();

        // curve
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2,
        )

        // paint
        c.fillStyle = 'yellow';
        c.fill();

        // end line
        c.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// declare boundaries array
const boundaries = [];

// player instance of "Player" class
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});

// level map
// ! ! ! remember the change map variable to "level"
const map = [

    ['-', '-', '-', '-', '-', '-',],
    ['-', ' ', ' ', ' ', ' ', '-',],
    ['-', ' ', '-', '-', ' ', '-',],
    ['-', ' ', ' ', ' ', ' ', '-',],
    ['-', '-', '-', '-', '-', '-',],
    
]

// "i" = first 'index'
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i,
                        }
                    })
                )
            break;
        }
    })
});

function animate() {
    // frame function
    requestAnimationFrame(animate)
    // clear canvas
    c.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
    )
    // render walls
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    // render pacman
    player.update();
};

// activate 'animate' function
animate();

// map WSAD buttons
window.addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'w':
    // ↑ up
            player.velocity.y = -5;
        break
        
        case 'a':
    // ← left
            player.velocity.x = -5;
        break
        
        case 's':
    // ↓ down
            player.velocity.y = 5;
        break
        
        case 'd':
    // → right
            player.velocity.x = 5;
        break
    }

    console.log(player.velocity)
})

// velocity == 0 (when WSAD buttons r released)
window.addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'w':
    // ↑ up
            player.velocity.y = 0;
        break

        case 'a':
    // ← left
            player.velocity.x = 0;
        break
        
        case 's':
    // ↓ down
            player.velocity.y = 0;
        break
        
        case 'd':
    // → right
            player.velocity.x = 0;
        break
    }

    console.log(player.velocity)
})
