# Lesson 3. World Objects

In the third lesson you will learn how to find World Objects and go to them.

## Requirements

Before this lesson go through [Lesson 0](/#/lesson/spot-lesson0) to setup your connection (if you haven't done it before).

> Don't forget to run Yggdrasil if you use macOS:
> ```bash
> sudo yggdrasil -useconffile /etc/yggdrasil.conf
> ```

## Documentation

Spot has the world object service that provides a way to track and store objects detected in the world around Spot. A world object is considered a higher-level item in the scene that has some amount of semantic information associated with it. More information you can find in [Robot Services](https://dev.bostondynamics.com/docs/concepts/robot_services#world-object) tab in documentation.

Using world object service you can find fiducials near the spot.

> Spot can find objects around faster if he stands.

The example of how to find fiducial and it's coordinates is in [fiducial_follow example](https://github.com/boston-dynamics/spot-sdk/blob/7ce5c5f31f4e1e45e9ff4be29fb097e258b75919/python/examples/fiducial_follow/fiducial_follow.py#L418).

## Task

Spot is in the place with some fiducials around. You need detect at least two fiducials and come to each of them within 1 m.
