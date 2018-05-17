
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

    // console.log();
    var area = vals.reduce(function(total, n) {
      return total + n;
    });

    // All right, this is 12.5 * 12.5 * PI.... So I guess we're inputting the diameters???
    console.log(area);
    // Then we should be able to use .reduce to sum up all the 1s in the array of pixel-values.
    return area;
  };


  // takes in a 120-length string of bits, 20 angles of 6 bits each:
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


  this.checkState = function() {
    // will only call this for first leaf, otherwise we'll get exponential growth:
    if (this.state % 2 == 0) { // can change this value to alter growth speed.
      this.spawn();
    }
  };

  // no hoisting!!!
  this.spawn = function() {
    // This is the "best" version, or at least the path Nature chooses:
    nextAngle = (nextAngle + 2.4) % (2 * PI);
    // nextAngle = angle;
    var ell = new Leaf(5, 5, nextAngle);
    ellipses.push(ell);
  };


  var nextAngle = 2.4;
