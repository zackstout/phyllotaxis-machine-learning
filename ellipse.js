
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

  this.includes = function(x, y) {

    var slope = tan(this.a); // seen geometrically

    var maj_axis = this.rx/2;
    var min_axis = this.ry/2;
    var focus_to_center = Math.pow(maj_axis * maj_axis - min_axis * min_axis, 0.5);
    // for finding the pixel-locations of the 2 foci:
    var edge_to_f1 = maj_axis - focus_to_center;
    var edge_to_f2 = maj_axis + focus_to_center;

    // this is right:
    console.log(edge_to_f1, edge_to_f2);

    var f1 = {
      x: width/2 + cos(this.a) * edge_to_f1,
      y: height/2 - sin(this.a) * edge_to_f1
    };

    var f2 = {
      x: width/2 + cos(this.a) * edge_to_f2,
      y: height/2 - sin(this.a) * edge_to_f2
    };

    var clicked = {
      x: mouseX,
      y: mouseY
    };

    // great, this is working:
    console.log(getDistance(clicked, f1), getDistance(clicked, f2));

    var double_major = this.rx; // this is the distance to which we must compare our sum.

    var sum_of_distances = getDistance(clicked, f1) + getDistance(clicked, f2);

    return sum_of_distances < double_major;
  };

  // Wait we'll want this in the Plant constructor, not Leaf:
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
      // a good test will be to see if we can generate this angle based on random DNA:
      // var angle = Math.random() * 2 * PI;

      // This is the "best" version, or at least the path Nature chooses:
      nextAngle = (nextAngle + 2.4) % (2 * PI);
      // nextAngle = angle;
      var ell = new Ellipse(5, 5, nextAngle);
      ellipses.push(ell);
    };

    this.grow = function() {
      this.state ++;
      this.rx *= 1.13;
      this.ry *= 1.1;
    };


}


var nextAngle = 2.4;
