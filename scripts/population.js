
// Grabbing the skeleton of this logic from Coding Train's series on the genetic algorithm:
function Population(m, num, p) {
  // Population will consist of plants, each of which is an array of 20 angles.
  this.population = [];
  this.generations = 0;
  this.mutationRate = m;
  this.matingPool = [];

  // Initialize first generation randomly:
  for (var i=0; i<num; i++) {
    var angs = [];
    for (var j=0; j<20; j++) {
      var ang = Math.random() * 2 * p.PI;
      angs.push(ang);

      // Testing PHI:
      // angs.push(2.4);
    }
    this.population[i] = new Plant(angs, i, p);
  }

  // ===========================================================================================
  this.calcFitness = function() {
    for (var i=0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  };

  // ===========================================================================================
  // Mating pool becomes "huge" because we fill it out to simulate probability.
  this.naturalSelection = function() {
    this.matingPool = []; 

    var maxFitness = Math.max(...this.population.map(p => p.fitness));

    // Normalize:
    for (var j=0; j<this.population.length; j++) {
      var fitness = p.map(this.population[j].fitness, 0, maxFitness, 0, 1);
      var n = p.floor(fitness * 100);

      // Put n of those into our array, to simulate probability distribution:
      for (var k=0; k < n; k++) {
        this.matingPool.push(this.population[j]);
      }
    }
  };

  // ===========================================================================================
  // Make a new generation:
  this.generate = function() {
    for (var i=0; i<this.population.length; i++) {
      var a = p.floor(p.random(this.matingPool.length));
      var b = p.floor(p.random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate, p); // How odd that we have to pass in p here... plant.mutate cannot see it?
      this.population[i] = child;
    }
    this.generations++;
  };








  // ===========================================================================================

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
