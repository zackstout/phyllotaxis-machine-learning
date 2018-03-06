
var e;
var ellipses = [];
var colors = ['tomato', 'skyblue', 'maroon', 'goldenrod', 'lilac'];

function setup() {
  createCanvas(100, 100);
  background(100);

  noStroke();
  fill('white');
  // wait why will 50 work but 5 won't?? Because we were stretching wrong way.
  e = new Ellipse(5/2, 0, 5, 5, 4);
  ellipses.push(e);
  console.log(e);
  setInterval(progress, 3000);
}

function progress() {
  ellipses.forEach(function(ell) {
    ell.grow();
  });
}

function draw() {
  background(100);
  // e.a += 0.02;
  // This *is* necessary:
  ellipses.forEach(function(ell) {
    ell.render();
  });
  // e.grow();
}

function Ellipse(x, y, rx, ry, a) {
  this.x = x;
  this.y = y;
  this.rx = rx;
  this.ry = ry;
  this.a = a;
  this.state = 0;
  var ran = Math.floor(Math.random() * colors.length);
  this.color = colors[ran];

  this.render = function() {
    translate(width/2, height/2);
    rotate(2 * PI - this.a);
    fill(this.color);
    ellipse(this.rx / 2, this.y, this.rx, this.ry);
    rotate(- 2 * PI + this.a);
    translate(-width/2, -height/2);
  };
  // Draw on creation:
  this.render();

  this.includes = function(x, y) {

  };

  // no hoisting!!!
  this.spawn = function() {
    // console.log('spawnin');
    var angle = Math.random() * 2 * PI;
    var ell = new Ellipse(5/2, 0, 5, 5, angle);
    ellipses.push(ell);
  };

  this.grow = function() {
    this.state ++;
    // console.log(this.state);
    // will only call this for first leaf, otherwise we'll get exponential growth:
    if (this.state % 2 == 0) {
      // console.log('ahoy');
      this.spawn();
    }
    this.rx *= 1.5;
    this.ry *= 1.2;
    translate(width/2, height/2);
    rotate(2 * PI - this.a);
    // console.log(this.rx, this.ry);
    // OOOoh interesting, we don't even have to call it here, which i guess we should have known from angle example:
    // ellipse(Math.cos(this.a) * this.rx, Math.sin(this.a * this.rx), this.rx, this.ry);
    rotate(- 2 * PI + this.a);
    translate(-width/2, -height/2);
  };


}
