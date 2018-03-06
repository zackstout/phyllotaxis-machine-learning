
var e;
var ellipses = [];

function setup() {
  createCanvas(100, 100);
  background(100);

  // push();
  // translate(width/2, height/2);
  noStroke();
  fill('white');
  e = new Ellipse(50/2, 0, 50, 5, 1);
  ellipses.push(e);
  // ellipse(5, 0, 5);
  // pop();
  console.log(e);
  setInterval(progress, 1000);
}

function progress() {
  ellipses.forEach(function(ell) {
    // this.state ++;
    ell.grow();
  });
}

function draw() {
  background(100);
  // e.a += 0.02;
  e.render();
  // e.grow();
  // console.log(e);
}

function Ellipse(x, y, rx, ry, a) {
  this.x = x;
  this.y = y;
  this.rx = rx;
  this.ry = ry;
  this.a = a;
  this.state = 0;

  this.render = function() {
    translate(width/2, height/2);
    rotate(2 * PI - this.a);
    ellipse(this.rx / 2, this.y, this.rx, this.ry);
    rotate(- 2 * PI + this.a);
    translate(-width/2, -height/2);
  };
  // Draw on creation:
  this.render();

  this.includes = function(x, y) {

  };

  this.grow = function() {
    this.state ++;
    this.rx *= 1.2;
    this.ry *= 1.5;
    translate(width/2, height/2);
    rotate(2 * PI - this.a);
    console.log(this.rx, this.ry);
    // OOOoh interesting, we don't even have to call it here:
    // ellipse(Math.cos(this.a) * this.rx, Math.sin(this.a * this.rx), this.rx, this.ry);
    rotate(- 2 * PI + this.a);
    translate(-width/2, -height/2);
  };

}
