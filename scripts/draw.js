
// what are these for?
var e;
var ellipses = [];
var interval;

var colors = ['tomato', 'skyblue', 'darkgreen', 'goldenrod', 'purple'];
var pop1;

var p2; // Ahhhh this is all we needed, never needed to pass them around!

// Order is important here:
new p5(btmSketch, 'btm');
new p5(topSketch, 'top');

function topSketch(p) {
  p.setup = function() {
    p.createCanvas(300, 300);
    // createCanvas(750, 1250);
    p.background(100);
    p.noStroke();
    p.fill('white');

    pop1 = new Population(0.01, 15, p); // Size of 15
    console.log(pop1);

    // for (let i=0; i<17; i++) {
      pop1.calcFitness(); // Triggers the drawing
      pop1.naturalSelection(); // Interesting that this creates a variable-length array...Makes sense, because each initial population is random.
      pop1.generate();

      console.log(pop1);
    // }

    // pop1.calcFitness();

    // console.log(pop1);
  };
}

function btmSketch(p) {
  p2 = p;
  p.setup = function() {
    p.createCanvas(750, 1250);
    p.background(100);
    // We had noStroke but I think i prefer it with stroke.
  };
}


//   // Testing testing 1 2 3:
//   // for (var i=0; i < 10; i++) {
//   //   pop1.calcFitness(); // each plant calculates its own fitness.
//   //   pop1.naturalSelection(); // creates a mating pool.
//   //   pop1.generate(); // iterate through population, replacing each element with a child (calling crossover and mutate)
//   //   // pop1.evaluate();
//   // }


// Oh it's really nice that we can use these functions in ellipse and plant, even though they're sourced in first.
// Hmm I wonder how it does that. Sets up some linkage between the two files when one sources the other in?

const bin2dec = (bin) => parseInt(bin, 2);

const getDistance = (a, b) => Math.pow((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y), 0.5);

function dec2bin(dec){
  var res = (dec >>> 0).toString(2);
  while (res.length < 6) {
    res = '0' + res;
  }
  return res;
}

//

// What is the DNA going to be? an array of angles? Say 25 for a completed tree?
// The more we encode, the longer it will take it seems. Because 011010 won't be recognized as 25, and could just as easily be split at the end and turned into 133 or something.... but i guess it should still work????
// Let's see, if we have 25 angles, that's bits 0 through 20 if we only go up to 2 (and then multiply by PI). So that's 125-length DNA strands. Again, length shouldn't matter though, beyond computation time.

//
