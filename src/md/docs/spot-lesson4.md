# Lesson 4. GraphNav Service

In the fourth lesson you will learn how to record and play autonomous missions with GraphNav service.

## Requirements

Before this lesson go through [Lesson 0](/#/lesson/spot-lesson0) to setup your connection (if you haven't done it before).

> Don't forget to run Yggdrasil if you use macOS:
> ```bash
> sudo yggdrasil -useconffile /etc/yggdrasil.conf
> ```

## Documentation

The Spot SDK includes APIs, client libraries, and examples that support the development of autonomous navigation behaviors for the Spot robot. Collectively, this service is referred to as GraphNav. Maps are recorded and saved and later can be replayed with any robot in your fleet. During the map recording process, you can assign actions and API callbacks to waypoints along the map route.

Read [GraphNav Tech Summary](https://dev.bostondynamics.com/docs/concepts/autonomy/graphnav_tech_summary) to learn how it works. [Initialisation](https://dev.bostondynamics.com/docs/concepts/autonomy/initialization) is also important part, it will be usefull in this lesson.

> You can view recorded maps with [View Map](https://github.com/boston-dynamics/spot-sdk/tree/master/python/examples/graph_nav_view_map) example.

## Task

You need to record a map avoiding obstacles and make spot go from start point to end point.

Look at the examples of [recording and playing missions](https://github.com/boston-dynamics/spot-sdk/tree/master/python/examples/graph_nav_command_line).
