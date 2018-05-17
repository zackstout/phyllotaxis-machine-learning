

this.progress = function() {
  if (this.ellipses.length < 20) {
    this.ellipses.forEach(function(ell, index) {
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
        for (var k=0; k < this.ellipses.length; k++) {
          if (this.ellipses[k].includes({x: i, y: j})) {
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
