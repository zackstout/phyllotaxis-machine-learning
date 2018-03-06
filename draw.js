
var e;

function setup() {
  createCanvas(100, 100);
  background(100);

  // push();
  // translate(width/2, height/2);
  noStroke();
  fill('white');
  e = new Ellipse(15/2, 0, 15, 5, 1);
  // ellipse(5, 0, 5);
  // pop();
  console.log(e);
}

function draw() {
  background(100);
  e.a += 0.02;
  e.render();
  // console.log(e);
}

function Ellipse(x, y, rx, ry, a) {
  this.x = x;
  this.y = y;
  this.rx = rx;
  this.ry = ry;
  this.a = a;

  this.render = function() {
    translate(width/2, height/2);
    rotate(2 * PI - this.a);
    ellipse(this.x, this.y, this.rx, this.ry);
    rotate(- 2 * PI + this.a);
    translate(-width/2, -height/2);
  };
  // Draw on creation:
  this.render();

  this.includes = function(x, y) {

  };

}
