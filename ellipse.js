
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

  // I was thinking the radial idea... But hang on, can't we just check whether |x2/a2 + y2/b2| < 1?
  // WAIT! We already have everythign we need!!! just nee dto compare 2 distances.

  // Ok it's working....but only for circles....:
  this.includes = function(x, y) {
    // this.centerx = width/2 + Math.cos(this.a) * this.rx/2;
    // this.centery = height/2 - Math.sin(this.a) * this.ry/2;
    //
    // var dis = dist(x, y, this.centerx, this.centery);
    // // var dis = dist(mouseX, mouseY, this.centerx, this.centery);
    //
    // var m = (y - this.centery) / (x - this.centerx);
    //
    // // var m = (mouseY - this.centery) / (mouseX - this.centerx);
    // var angle = Math.atan(m);
    // var realAngle;
    //
    // if (x > this.centerx) {
    //   realAngle = (2*PI - angle) % (2*PI);
    // } else {
    //   realAngle = (PI - angle);
    // }
    //
    //
    // // if (mouseX > this.centerx) {
    // //   realAngle = (2*PI - angle) % (2*PI);
    // // } else {
    // //   realAngle = (PI - angle);
    // // }
    //
    // // not 100% sure why this works but it does:
    // var realerAngle = (realAngle + this.a + PI/2) % (2*PI);
    // // console.log(realerAngle);
    //
    // // These are relative to CEnter of Ellipse, orientation (X positive toward center of canvas);
    // // We're almost there..!
    // var pointOnEllipseX = this.rx * Math.cos(realerAngle);
    // var pointOnEllipseY = this.ry * Math.sin(realerAngle);
    //
    // // var realX = pointOnEllipseX;
    //
    // push();
    // translate(this.centerx, this.centery);
    // var dista = dist(0, 0, pointOnEllipseX, pointOnEllipseY);
    // pop();
    //
    // // console.log(pointOnEllipseX, pointOnEllipseY, dista);
    // // console.log(this.centerx, this.centery);
    // // console.log(dis);
    // return 2 * dis < dista ? true : false;
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

  };

  this.checkState = function() {
    // will only call this for first leaf, otherwise we'll get exponential growth:
    if (this.state % 2 == 0) {
      this.spawn();
    }
  };

  // no hoisting!!!
  this.spawn = function() {
    // a good test will be to see if we can generate this angle based on random DNA:
    var angle = Math.random() * 2 * PI;

    // This is the "best" version, or at least the path Nature chooses:
    // var angle = (nextAngle + 2.4) % (2 * PI);
    // nextAngle = angle;
    var ell = new Ellipse(5, 5, angle);
    ellipses.push(ell);
  };

  this.grow = function() {
    this.state ++;
    this.rx *= 1.13;
    this.ry *= 1.1;
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
}

var nextAngle = 2.4;
