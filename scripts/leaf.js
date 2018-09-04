
// Gotta break this down:
function Leaf(rx, ry, a, p) {
  this.rx = rx;
  this.ry = ry;
  this.a = a;
  // console.log('angle', a);
  this.state = 0; // What is this for?
  var ran = Math.floor(Math.random() * colors.length);
  this.color = colors[ran];

  this.render = function() {
    // dude use push/pop instead:
    console.log('render');
    p.push();
    p.translate(p.width/2, p.height/2);
    p.rotate(2 * p.PI - this.a);
    p.fill(this.color);
    p.ellipse(this.rx / 2, 0, this.rx, this.ry);
    // rotate(- 2 * PI + this.a);
    // translate(-width/2, -height/2);
    p.pop();
  };

  // Draw on creation:
  // this.render();

  this.includes = function(point) {
    // console.log(point);
    // will need slope to find pixel-locations for 2 foci:
    var slope = p.tan(this.a); // seen geometrically

    var maj_axis = this.rx/2;
    var min_axis = this.ry/2;
    var focus_to_center = Math.pow(maj_axis * maj_axis - min_axis * min_axis, 0.5);
    // for finding the pixel-locations of the 2 foci:
    var edge_to_f1 = maj_axis - focus_to_center;
    var edge_to_f2 = maj_axis + focus_to_center;

    var f1 = {
      x: width/2 + p.cos(this.a) * edge_to_f1,
      y: height/2 - p.sin(this.a) * edge_to_f1 // needs to be minus because of canvas's orientation
    };
    var f2 = {
      x: width/2 + p.cos(this.a) * edge_to_f2,
      y: height/2 - p.sin(this.a) * edge_to_f2
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
