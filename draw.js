
// What is the DNA going to be? an array of angles? Say 25 for a completed tree?
// The more we encode, the longer it will take it seems. Because 011010 won't be recognized as 25, and could just as easily be split at the end and turned into 133 or something.... but i guess it should still work????
// Let's see, if we have 25 angles, that's bits 0 through 20 if we only go up to 2 (and then multiply by PI). So that's 125-length DNA strands. Again, length shouldn't matter though, beyond computation time.

// Anyway, first step is calculating total area given an input array of angles (understood to represent the leaves seen from above, i.e. our ellipses).
// Next step will be telling it to run through that algorithm to generate a couple hundred individuals (e.g. 25-leaf plants). Then we can start implementing the genetic algorithm.
var e;
var ellipses = [];
var colors = ['tomato', 'skyblue', 'darkgreen', 'goldenrod', 'purple'];
var plant = new Plant([1, 2, 3, 4, 5, 5, 4, 3, 2]);
var interval;

function setup() {
  createCanvas(300, 300);
  background(100);
  noStroke();
  fill('white');

  // create
  var angles = [];

  for (var i=0; i < 20; i++) {
    angles.push(Math.random() * 2 * PI);
  }

  console.log(angles);

  var p = new Plant(angles);

  console.log(p.getDna());

  // e = new Ellipse(65, 25, 4);

  // this seems to be diameters, not radii:
  e = new Ellipse(25, 25, 4);
  ellipses.push(e);
  interval = setInterval(progress, 400);

}

function draw() {
  background(100);
  // e.a += 0.02;
  // Center:
  ellipse(width/2, height/2, 5);

  // This *is* necessary:
  ellipses.forEach(function(ell) {
    ell.render();
  });
  // e.grow();
}




function progress() {

  if (ellipses.length < 18) {
    ellipses.forEach(function(ell, index) {
      ell.grow();
      // Prevent exponential growth (i.e. only let one leaf be a spawner at a time):
      if (index == 0) {
        ell.checkState();
      }
    });
  } else {
    console.log( ellipses );
    // Plant is fully constructed -- calculate its area:
    var vals = [];

    for (var i=0; i < width; i++) {
      for (var j=0; j < height; j++) {
        vals[i * width + j] = 0;
        for (var k=0; k < ellipses.length; k++) {
          if (ellipses[k].includes({x: i, y: j})) {
            vals[i * width + j] = 1;
            break;
          }
        }
      }
    }

    var area = vals.reduce(function(total, n) {
      return total + n;
    });

    console.log(area);
    console.log(vals);
    clearInterval(interval);
  }

}

function mouseClicked() {
  console.log(e.includes({x: mouseX, y: mouseY}));
}

// Oh it's really nice that we can use these functions in ellipse and plant, even though they're sourced in first. Hmm I wonder how it does that. Sets up some linkage between the two files when one sources the other in?
function dec2bin(dec){
  var res = (dec >>> 0).toString(2);
  while (res.length < 6) {
    res = '0' + res;
  }
  return res;
}

// I wonder if this will prevent us from calling this from other file -- nope!
const bin2dec = (bin) => parseInt(bin, 2);

const getDistance = (a, b) => Math.pow((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y), 0.5);
