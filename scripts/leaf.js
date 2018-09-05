
// Gotta break this down:
function Leaf(rx, ry, a, p, plantNo) {
  this.rx = rx;
  this.ry = ry;
  this.a = a;
  this.plantNo = plantNo;
  this.state = 0; // for keeping track of growth

  var ran = Math.floor(Math.random() * colors.length);
  this.color = colors[ran];

  this.render = function() {
    // console.log('renderin');
    const DIM = 250;
    const X_POS = this.plantNo % 3;
    const Y_POS = p2.floor(this.plantNo / 3);
    const X_CTR = X_POS * DIM + DIM / 2;
    const Y_CTR = Y_POS * DIM + DIM / 2;

    p2.push();
    p2.translate(X_CTR, Y_CTR);
    p2.rotate(2 * p2.PI - this.a);
    p2.scale(0.35);
    p2.fill(this.color);
    p2.ellipse(this.rx / 2, 0, this.rx, this.ry);
    p2.pop();
  };

  this.includes = function(point) {
    // will need slope to find pixel-locations for 2 foci:
    var slope = p.tan(this.a); // seen geometrically

    var maj_axis = this.rx/2;
    var min_axis = this.ry/2;
    var focus_to_center = Math.pow(maj_axis * maj_axis - min_axis * min_axis, 0.5);
    // for finding the pixel-locations of the 2 foci:
    var edge_to_f1 = maj_axis - focus_to_center;
    var edge_to_f2 = maj_axis + focus_to_center;

    var f1 = {
      x: p.width/2 + p.cos(this.a) * edge_to_f1,
      y: p.height/2 - p.sin(this.a) * edge_to_f1 // needs to be minus because of canvas's orientation
    };
    var f2 = {
      x: p.width/2 + p.cos(this.a) * edge_to_f2,
      y: p.height/2 - p.sin(this.a) * edge_to_f2
    };

    var double_major = this.rx; // this is the distance to which we must compare our sum.
    var sum_of_distances = getDistance(point, f1) + getDistance(point, f2);

    return sum_of_distances < double_major;
  };

  this.grow = function() {
    this.state ++;
    this.rx *= 1.13;
    this.ry *= 1.1;
  };
}
