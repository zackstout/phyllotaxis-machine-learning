
function Plant(angsArray) {
  var genes = [];
  this.dna = '';

  this.fitness = 0;

  this.interpretDna = function(dna) {
    var genes = [];
    // console.log(dna);
    while (dna.length > 0) {
      var gene = dna.splice(0, 6);
      var bin = gene.join('');
      var dec = bin2dec(bin);
      genes.push(dec);
    }

    console.log(genes);
  };

  this.getDna = function() {
    angsArray.forEach(function(ang) {
      // num between 0 and 63:
      var a = ang.toFixed(1) * 10;
      var bin = dec2bin(a);
      // console.log("angle", a, "  bin", bin);
      genes.push(bin);
    });

    this.dna = genes.join('');
    return this.dna;
  };

  this.getDna(); // get the dna so other functions can use it

  this.progress = function() {
    if (ellipses.length < 20) {
      ellipses.forEach(function(ell, index) {
        ell.grow();
        if (index == 0) { // Prevent exponential growth (i.e. only let one leaf be a spawner at a time)
          ell.checkState();
        }
      });
    } else {
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
    }
  };


  // Borrowing from Coding Train's genetic algorithm tutorial:

  this.calcFitness = function() {
    // var score = 0;
    // for (var i=0; i <this.genes.length; i++) {
    //   if (this.genes[i] == target.charAt(i)) {
    //     score++;
    //   }
    // }
    // this.fitness = score / target.length;
    // this.fitness = pow(this.fitness, 4);
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
        this.dna[i] = !this.dna[i]; // swap 0 and 1
      }
    }
  };

}
