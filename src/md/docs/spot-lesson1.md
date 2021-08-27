# Lesson 1. Robot Services

Welcome to the first lesson!
During this lesson you will learn how to authorize yourself as a user, get motor power control and send basic commands to Spot.

https://youtu.be/qdk7BjWJprc

## Requirements

Before this lesson go through [Lesson 0](/#/lesson/spot-lesson0) to setup your connection (if you haven't done it before).

> Don't forget to run Yggdrasil if you use macOS:
> ```bash
> sudo yggdrasil -useconffile /etc/yggdrasil.conf
> ```

## Connection

To control Spot you need to connect to Spot Core. You can do that using ssh, in the terminal:
```bash
ssh <username>@200:2fba:a23a:9d37:7e2b:3303:ca4e:208f
```
Where `<username>` is the username you've got after booking lesson.

> Also you can see what the robot is doing in real-time <a href="http://200:7938:167:4f0a:e7f4:196c:6585:52ad]:8081/?action=stream">livestream</a>.

Username and password that you need to use in your python code for authorisation you can find in `~/credentials` file.

## Documentation

Read [Understanding Spot Programming](https://dev.bostondynamics.com/docs/python/understanding_spot_programming) page in spot-sdk documentation and follow the steps.

For Spot authentication use the same username and password as for Core. Spot address is `192.168.50.3`.

> Use `python3` instead of `python`

> In [Taking ownership of Spot (Leases)](https://dev.bostondynamics.com/docs/python/understanding_spot_programming#taking-ownership-of-spot-leases) section use `lease = lease_client.acquire()` before `lease_keep_alive = bosdyn.client.lease.LeaseKeepAlive(lease_client)`

You can find more detailed information for this lesson in [Base Services](https://dev.bostondynamics.com/docs/concepts/base_services), [Geometry and Frames](https://dev.bostondynamics.com/docs/concepts/geometry_and_frames), [Robot Services](https://dev.bostondynamics.com/docs/concepts/robot_services) and [E-Stop](https://dev.bostondynamics.com/docs/concepts/estop_service) sections of spot-sdk documentation.

## Task

In the first lesson you need to change Spot's body position to make it trace your initials with it's face. For that, you will have to experiment with different body positions. The range of Pitch, Yaw and Roll is from -0.5 to 0.5

## Results

We'll send the rosbag file to your e-mail.
