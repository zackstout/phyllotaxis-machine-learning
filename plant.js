
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



}
