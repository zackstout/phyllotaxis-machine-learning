
// Grabbing most of this logic from Coding Train's series on the genetic algorithm:
function Population(m, num) {
  // Population will consist of plants, each of which is an array of 20 angles.
  this.population = [];
  this.generations = 0;
  // this.finished = false;
  // this.target = p;
  this.mutationRate = m;
  // this.perfectScore = 1;
  this.matingPool = [];
  // this.best = "";


  // Initialize first generation randomly:
  for (var i=0; i<num; i++) {
    var angs = [];
    for (var j=0; j<20; j++) {
      // var ang = Math.random() * 2 * PI;
      // angs.push(ang);

      // Testing PHI:
      angs.push(2.4);
    }
    this.population[i] = new Plant(angs);
  }


  this.calcFitness = function() {
    for (var i=0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  };

  this.naturalSelection = function() {
    this.matingPool = [];

    // find generation's max fitness:
    var maxFitness = 0;
    for (var i=0; i<this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    // normalize:
    for (var j=0; j<this.population.length; j++) {
      var fitness = map(this.population[j].fitness, 0, maxFitness, 0, 1);
      var n = floor(fitness * 100);

      // put n of those into our array, to simulate probability distribution:
      for (var k=0; k < n; k++) {
        this.matingPool.push(this.population[j]);
      }
    }

  };

  // make a new generation:
  this.generate = function() {
    for (var i=0; i<this.population.length; i++) {
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
    // console.log(this.generations);
  };


  this.getBest = function() {
    return this.best; // generated in this.evaluate:
  };


  this.evaluate = function() {
    var worldrecord = 0.0;
    var index = 0;
    for (var i=0; i< this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    //oooh need this:
    this.best = this.population[index].getPhrase();

    // I don't think we'll be doing this..... let's just go for like 100 generations or something, yeah?
    if (worldrecord == this.perfectScore) {
      this.finished = true;
    }
  };

  // because we don't have data-binding, we need this stuff:
  this.isFinished = function() {
    return this.finished;
  };

  this.getGenerations = function() {
    return this.generations;
  };

  this.getAverageFitness = function() {
    var total = 0;
    for (var i=0; i < this.population.length; i++) {
      // console.log(this.population[i].fitness);
      total += this.population[i].fitness;
    }
    // console.log(total);
    return total / this.population.length;
  };


}
