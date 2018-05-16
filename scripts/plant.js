
function Plant(angsArray) {
  var genes = [];

  this.getDna = function() {
    angsArray.forEach(function(ang) {
      // num between 0 and 63:
      var a = ang.toFixed(1) * 10;
      var bin = dec2bin(a);
      // console.log("angle", a, "  bin", bin);
      genes.push(bin);
    });

    var dna = genes.join('');
    return dna;
  };

  this.progress = function() {
    if (ellipses.length < 20) {
      ellipses.forEach(function(ell, index) {
        ell.grow();
        // Prevent exponential growth (i.e. only let one leaf be a spawner at a time):
        if (index == 0) {
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
      // console.log(vals);
      clearInterval(interval);
    }

  };



  // Borrowing from Coding Train's genetic algorithm tutorial:

  this.getPhrase = function() {
    return this.genes.join("");
  };

  this.calcFitness = function(target) {
    var score = 0;
    for (var i=0; i <this.genes.length; i++) {
      if (this.genes[i] == target.charAt(i)) {
        score++;
      }
    }
    this.fitness = score / target.length;
    this.fitness = pow(this.fitness, 4);
  };


  this.crossover = function(partner) {
    var child = new DNA(this.genes.length);

    var midpoint = floor(random(this.genes.length));

    for (var i=0; i<this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  };

  this.mutate = function(mutationRate) {
    for (var i=0; i< this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  };

}
