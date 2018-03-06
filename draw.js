
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


// from stackoverflow, wow and it works!:
function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

var plant = new Plant([1, 2, 3, 4, 5, 5, 4, 3, 2]);

function Plant(angsArray) {

  var genes = [];

  this.getDna = function() {
    angsArray.forEach(function(ang) {
      // num between 0 and 63:
      var a = ang.toFixed(1) * 10;
      var bin = dec2bin(a);
      genes.push(bin);
    });

    var dna = genes.join('');
    return dna;

  };

}

// Gotta break this down:
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
    this.centerx = width/2 + Math.cos(this.a) * this.rx/2;
    this.centery = height/2 - Math.sin(this.a) * this.ry;

    var d = dist(x, y, this.centerx, this.centery);

    var m = (mouseY - this.centery) / (mouseX - this.centerx);
    var angle = Math.atan(m);
    var realAngle;
    if (mouseX > this.centerx) {
      realAngle = (2*PI - angle) % (2*PI);
    } else {
      realAngle = (PI - angle);
    }

    // not 100% sure why this works but it does:
    var realerAngle = (realAngle + this.a + PI/2) % (2*PI);
    // console.log(realerAngle);

    // These are relative to CEnter of Ellipse, orientation (X positive toward center of canvas);
    // We're almost there..!
    var pointOnEllipseX = this.rx * Math.cos(realerAngle);
    var pointOnEllipseY = this.ry * Math.sin(realerAngle);

    var realX = pointOnEllipseX;

    console.log(pointOnEllipseX, pointOnEllipseY);
  };

  // This is pretty costly, but we'll only have to run it once for each individual plant, once it's reached maturity:
  this.getArea = function() {
    var vals = [];

    for (var i=0; i < width; i++) {
      for (var j=0; j < height; j++) {
        vals[i * width + j] = 0;
        // is the linter warning meaningful? does it matter if we make this inner or outer?
        for (var k=0; k < ellipses.length; k++) {
          var ell = ellipses[k];
          if (ell.includes(i, j)) {
            vals[i * width + j] = 1;
            // will break work in a forEach? Nope!
            break;
          }
        }
      }
    }

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
