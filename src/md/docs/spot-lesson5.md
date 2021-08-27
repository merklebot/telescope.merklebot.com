# Lesson 5. Mission Service

In the fifth lesson you will create autonomous mission with behavior tree structure.

## Requirements

Before this lesson go through [Lesson 0](/#/lesson/spot-lesson0) to setup your connection (if you haven't done it before).

> Don't forget to run Yggdrasil if you use macOS:
> ```bash
> sudo yggdrasil -useconffile /etc/yggdrasil.conf
> ```

## Documentation

The Mission Service is a way for API clients to specify high level autonomous behaviors for Spot using behavior trees. Read more about behavior trees in [Mission Service](https://dev.bostondynamics.com/docs/concepts/autonomy/missions_service) page.

You can find information about Node types in [Behavior Tree Node Types](/#/lesson/spot-behavior-tree-node-types) page.

## Task

You need to create autonomous mission for Spot using behavior trees. In the mission Spot must:
1. Stand up.
2. Ask operator what waypoint should it go to.
3. Go to choosen waypoint.
4. At the waypoint repeat steps 2 and 3.
5. During all mission monitor the battery status and if battery power is lower than the value from task, ask operator if Spot shoul stop mission or continue.
6. If the answer will be `Stop`, spot must take a battery change pose.

> Use the mission from previous lesson or if you haven't saved it use mission from the task folder.

The example of how to ask and answer thw questions you can find in [mission_question_answerer](https://github.com/boston-dynamics/spot-sdk/tree/master/python/examples/mission_question_answerer).
