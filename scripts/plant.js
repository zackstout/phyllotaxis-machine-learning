
function Plant(angsArray) {
  var genes = [];
  this.dna = '';
  this.angles = angsArray;
  this.ellipses = [];
  this.fitness = 0;
  this.state = 0;
  this.count = 0;

  // Takes in string of binary, outputs array of angles:
  this.interpretDna = function(dna) {
    var genes = [];
    while (dna.length > 0) {
      var gene = dna.splice(0, 6);
      var bin = gene.join('');
      var dec = bin2dec(bin);
      genes.push(dec);
    }
    // console.log(genes);
    return genes; // yeah...was forgetting to return
  };

  // Takes in array of angles, outputs binary string:
  this.getDna = function() {
    angsArray.forEach(function(ang) {
      // num between 0 and 63:
      var a = ang.toFixed(1) * 10;
      var bin = dec2bin(a);
      genes.push(bin);
    });

    this.dna = genes.join('');
    return this.dna;
  };

  this.getDna(); // get the dna on creation so other functions can use it


  // Generate a 20-leaf plant:
  this.makeLeaves = function() {
    // Create first leaf:
    if (this.ellipses.length === 0) {
      var leaf = new Leaf(5, 5, 0);
      this.ellipses.push(leaf);
      this.prevAngle = 0;
      this.state++;
    } else {
      // Every other step, spawn a new leaf:
      if (this.state % 2 === 0) {
        var newAngle = (this.prevAngle + this.angles[this.count]) % (2*PI);
        var nextLeaf = new Leaf(5, 5, newAngle);
        this.ellipses.push(nextLeaf);
        this.prevAngle = newAngle;
        this.count++;
      }
      this.ellipses.forEach(leaf => {
        leaf.grow();
      });
      this.state++;
    }
  };

  // Helper function for calculating plant's fitness:
  this.getArea = function() {
    var vals = [];

    // Loop through every pixel:
    for (var i=0; i < width; i++) {
      for (var j=0; j < height; j++) {
        vals[i * width + j] = 0;

        // Check whether any ellipse (leaf) includes that pixel:
        for (var k=0; k < this.ellipses.length; k++) {
          var ell = this.ellipses[k];
          var point = {x: i, y: j}; // this was the issue, had to wrap it in object.
          if (ell.includes(point)) {
            vals[i * width + j] = 1;
            break;
          }
        }
      }
    }

    // Sum up all pixels that are included in some leaf to get plant's total surface area:
    var area = vals.reduce(function(total, n) {
      return total + n;
    });

    // console.log(area);
    return area;
  };

  // Borrowing the skeleton from Coding Train's genetic algorithm tutorial:
  this.calcFitness = function() {
    // Give each plant 20 leaves based on angles (from DNA):
    while (this.ellipses.length < 20) {
      this.makeLeaves();
    }

    // Will have to come back to the rendering idea ... with way more canvases:
    // this.ellipses.forEach( ell => ell.render() ); // Super helpful: lets us see that things are actually working.

    var area = this.getArea();
    var percentCover = area / (width * height);
    this.fitness = percentCover.toFixed(3);
  };


  this.crossover = function(partner) {
    var childDna = [];
    var midpoint = floor(random(this.dna.length));

    for (var i=0; i<this.dna.length; i++) {
      if (i > midpoint) childDna[i] = this.dna[i];
      else childDna[i] = partner.dna[i];
    }

    var childAngs = this.interpretDna(childDna);
    var child = new Plant(childAngs);
    return child;
  };

  this.mutate = function(mutationRate) {
    for (var i=0; i < this.dna.length; i++) {
      if (random(1) < mutationRate) {
        this.dna[i] = this.dna[i] == '1' ? '0' : '1'; // swap 0 and 1
      }
    }
  };

}
