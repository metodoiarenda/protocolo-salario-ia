// const reveals = document.querySelectorAll(".reveal");

// window.addEventListener("scroll", () => {
//     reveals.forEach(el => {
//         const top = el.getBoundingClientRect().top;
//         const windowHeight = window.innerHeight;

//         if (top < windowHeight - 100) {
//             el.classList.add("active");
//         }
//     });
// });

// ANIMAÇÃO DOS CARDS
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
});


// ===== CANVAS NEON $ =====

const canvas = document.getElementById("moneyCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// PARTÍCULA $
class Dollar {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 20 + 10;

        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
    }

    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = "#00FF88";

        ctx.shadowColor = "#00FF88";
        ctx.shadowBlur = 15;

        ctx.fillText("$", this.x, this.y);

        ctx.shadowBlur = 0;
    }

    update() {
        // movimento base (leve)
        this.x += this.speedX;
        this.y += this.speedY;

        // bounce nas bordas
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // ===== ATRAÇÃO SUAVE AO MOUSE =====
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // raio de influência maior
            if (distance < 180) {

                // força suave (quanto mais perto, maior)
                let force = (180 - distance) / 180;

                // suaviza MUITO a velocidade
                this.x += dx * force * 0.02;
                this.y += dy * force * 0.02;
            }
        }
    }
}

let dollars = [];

function init() {
    dollars = [];
    for (let i = 0; i < 25; i++) {
        dollars.push(new Dollar());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dollars.forEach(d => {
        d.update();
        d.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();