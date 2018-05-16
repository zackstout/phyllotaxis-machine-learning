
function setup() {
  createCanvas(300, 300);
  background(100);
  noStroke();
  fill('white');

  // create
  var angles = [];

  for (var i=0; i < 20; i++) {
    angles.push(Math.random() * 2 * PI);
  }

  // console.log(angles);

  var p = new Plant(angles);

  console.log(p.getDna());

  e = new Ellipse(65, 25, 4);

  // this seems to be diameters, not radii:
  e = new Leaf(1, 1, 4);
  ellipses.push(e);
  interval = setInterval(p.progress, 400);
}

function draw() {
  background(100);
  // e.a += 0.02;
  // Center:
  ellipse(width/2, height/2, 5);

  // This *is* necessary:
  ellipses.forEach(function(ell) {
    ell.render();
  });
  e.grow();
}
