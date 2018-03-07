# Phyllotaxis and Machine Learning
The goal for this project is to simulate a growing plant (as seen from above), to let it "choose" where it places its new leaves, and to evaluate it by how much surface area is visible to the sun over time as the leaves grow and inevitably overshadow one another. Once we have this model, we should be able to run it through a genetic algorithm and hopefully vindicate Nature's conclusion that each new leaf should rotate by the [golden angle](https://en.wikipedia.org/wiki/Golden_angle).

My ulterior goal is to force myself to think carefully about the structure of the project -- how to format the data, organize the class hierarchy, properly prioritize challenges -- before diving into the code, which is often my first impulse.

We encode the angle-arrays phenotype as a string of bits, each substring of six bits representing an angle (e.g. 4.3 radians) in binary. We initialize the first generation with random angles, and then use the genetic algorithm to determine the angles each subsequent generation "chooses" based on the DNA of its parents.

Biggest challenges so far: determining whether a pixel lies within a rotated ellipse.

## Built With:
- p5.js
