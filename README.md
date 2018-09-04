# Phyllotaxis and Machine Learning
The goal for this project is to simulate a growing plant (as seen from above), to let it "choose" where it places its new leaves, and to evaluate it by how much surface area is visible to the sun over time as the leaves grow and inevitably overshadow one another. Once we have this model, we should be able to run it through a genetic algorithm and hopefully vindicate Nature's conclusion that each new leaf should rotate by the [golden angle](https://en.wikipedia.org/wiki/Golden_angle).

My ulterior goal is to force myself to think carefully about the structure of the project -- how to format the data, organize the class hierarchy, properly prioritize challenges -- before diving into the code, which is often my first impulse.

We encode the angle-arrays phenotype as a string of bits, each substring of six bits representing an angle (e.g. 4.3 radians) in binary. We initialize the first generation with random angles, and then use the genetic algorithm to determine the angles each subsequent generation "chooses" based on the DNA of its parents.

Biggest challenges so far: determining whether a pixel lies within a rotated ellipse.

I can't remember: is it normalized so that Phi gives fitness 1.0?

## Screenshot:
Here are some sample "plants" seen from above:

![screen shot 2018-09-04 at 6 26 43 pm](https://user-images.githubusercontent.com/29472568/45062769-1a5e1800-b070-11e8-942b-15ea1711c480.png)

Here are a few shown with their fitness value:

![screen shot 2018-09-04 at 6 34 13 pm](https://user-images.githubusercontent.com/29472568/45062981-2c8c8600-b071-11e8-8d88-999b57254bf2.png)


## Built With:
- p5.js

## Next Steps:
- [x] Change angles so that they add to previous angle, not start from 0.
- [x] Generate starting population randomly (100 plants?).
- [x] Give each plant the ability to calculate its own area.
- [x] Write the fitness function (capping at ~70% coverage, which is golden ratio's result).
- [x] Copy pasta in the logic-skeleton for selection, inheritance, mutation.
- [ ] Build a nice display (animating plants as the generations change?)
