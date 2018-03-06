
// What is the DNA going to be? an array of angles? Say 25 for a completed tree?
// The more we encode, the longer it will take it seems. Because 011010 won't be recognized as 25, and could just as easily be split at the end and turned into 133 or something.... but i guess it should still work????
// Let's see, if we have 25 angles, that's bits 0 through 20 if we only go up to 2 (and then multiply by PI). So that's 125-length DNA strands. Again, length shouldn't matter though, beyond computation time.

// Anyway, first step is calculating total area given an input array of angles (understood to represent the leaves seen from above, i.e. our ellipses).
// Next step will be telling it to run through that algorithm to generate a couple hundred individuals (e.g. 25-leaf plants). Then we can start implementing the genetic algorithm.
var e;
var ellipses = [];
var colors = ['tomato', 'skyblue', 'darkgreen', 'goldenrod', 'purple'];

function setup() {
  createCanvas(300, 300);
  background(100);

  noStroke();
  fill('white');
  // wait why will 50 work but 5 won't?? Because we were stretching wrong way.
  // x doesn't matter btw:
  e = new Ellipse(65, 35, 4);
  ellipses.push(e);
  // console.log(e);
  // setInterval(progress, 1000);

}

function progress() {
  ellipses.forEach(function(ell, index) {
    ell.grow();
    // Prevent exponential growth:
    if (index == 0) {
      ell.checkState();
    }
  });
}

function mouseClicked() {
  // console.log(mouseX, mouseY);
  e.includes(mouseX, mouseY);
}

function draw() {
  background(100);
  // e.a += 0.02;
  ellipse(width/2, height/2, 5);

  // This *is* necessary:
  ellipses.forEach(function(ell) {
    ell.render();
  });
  // e.grow();
}

function Ellipse(rx, ry, a) {
  // this.x = x;
  // this.y = y;
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
    ellipse(this.rx / 2, 0, this.rx, this.ry);
    rotate(- 2 * PI + this.a);
    translate(-width/2, -height/2);
  };
  // Draw on creation:
  this.render();

  // I was thinking the radial idea... But hang on, can't we just check whether |x2/a2 + y2/b2| < 1?
  this.includes = function(x, y) {
    // e.g. x is 140, y is 160:
    // var d = dist(x, y, this.rx/2, 0);

    this.centerx = width/2 + Math.cos(this.a) * this.rx/2;
    this.centery = height/2 - Math.sin(this.a) * this.ry;

    var d = dist(x, y, this.centerx, this.centery);
    console.log(d);
    // push();
    // translate(width/2, height/2);
    // rotate(2 * PI - this.a);
    // var center = {};
    // center.x = this.rx/2;
    // center.y = this.y;
    // var a = center.x;
    // var b = this.ry/2;
    // if ((Math.pow(x - center.x, 2)/Math.pow(a, 2) + Math.pow(y - center.y, 2)/Math.pow(b, 2)) < 1) {
    //   pop();
    //   return true;
    // } else {
    //   pop();
    //   return false;
    // }
  };

  this.checkState = function() {
    // will only call this for first leaf, otherwise we'll get exponential growth:
    if (this.state % 2 == 0) {
      this.spawn();
    }
  };

  // no hoisting!!!
  this.spawn = function() {
    var angle = Math.random() * 2 * PI;
    var ell = new Ellipse(5, 5, angle);
    ellipses.push(ell);
  };

  this.grow = function() {
    this.state ++;
    this.rx *= 1.13;
    this.ry *= 1.1;
  };


}
