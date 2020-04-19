const width = 500;
const height = 500;

const dt = 1;
const G = 1E-1;

function Orbit(m, p, v, a){
    this.m = m != null ? m : 1;
    this.p = p != null ? p : [width / 2, height / 2];
    this.v = v != null ? v : [0, 0];
    this.a = a != null ? a : [0, 0];

    this.show = () => {
        noStroke();
        fill(255);
        circle(this.p[0], this.p[1], this.m)
    }

    this.move = () => {
        for(let i = 0; i < 2; i++) this.p[i] += this.v[i] * dt
        for(let i = 0; i < 2; i++) this.v[i] += this.a[i] * dt;
    }
}

const o1 = new Orbit(10, [200, 250], [0, 4.5 * ((G * 10) / (2 * 100)) ** 0.5]);
const o2 = new Orbit(10, [300, 250], [0, - 4.5 * (((G * 10) / (2 * 100)) ** 0.5)]);

const calculateAcc = (orbit1, orbit2) => {
    const dx = orbit2.p[0] - orbit1.p[0];
    const dy = orbit2.p[1] - orbit1.p[1];
    const r2 = dx ** 2 + dy ** 2; 
    const r = r2 ** 0.5;

    const sin = dy / r;
    const cos = dx / r;

    const force = G * (orbit1.m * orbit2.m) / r2;

    let a1 = force / orbit1.m;
    let a2 = force / orbit2.m;
    
    a1 = [a1 * cos, a1 * sin];
    a2 = [a2 * -cos, a2 * -sin];

    return [a1, a2];
}

function setup(){
    createCanvas(width, height);
}

function draw(){
    background(0);

    o1.show();
    o1.move();
    o2.show();
    o2.move();
    
    const a = calculateAcc(o1, o2);
    o1.a = o1.a.map((n, i) => n + a[0][i]);
    o2.a = o2.a.map((n, i) => n + a[1][i]);
}

function Snake(){
    this.x = 100;
    this.y = 100;
    this.len = 2;
    this.pos = [];

    this.dir = [1, 0];

    this.show = () => {
        noStroke();
        fill(255);
        this.pos.forEach(n => rect(n[0], n[1], scale, scale))
    }

    this.update = () => {
        this.x += this.dir[0] * scale;
        this.y += this.dir[1] * scale;

        this.pos.unshift([this.x, this.y]);
        this.pos.length > this.len ? this.pos.pop() : null;
    }

    this.check = () => {
        let crashed = false;
        this.pos.forEach((n, i) => i != 0 && n[0] == this.x && n[1] == this.y ? crashed = true : null)
        crashed ? this.dir = [0, 0] : null;
    }
}
