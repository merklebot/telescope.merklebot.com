# Behavior Tree Node Types

## Node

Type `Node`:

Arguments:

- `impl`, type: `google.protobuf.Any` or `node_reference`, type: `string` - implementation of this node or unique identifier of another node. If this is filled out, rather than the "impl", then the referenced node will be used in place of this one
- `name`, type: `string` - human-readable name of this node
- `user_data`, type: `UserData` - collection of user data associated with this node
- `reference_id`, type: `string` - reference identifier of this node. Set iff another node references this one
- `parameter_values`, type: `repeated KeyValue` - defines parameters, used by this node or its children. The "key" in KeyValue is the name of the parameter being defined. The value can be a constant or another parameter value
- `overrides`, type: `repeated KeyValue` - overwrites a protobuf field in this node's implementation. The "key" in KeyValue is the name of the field to override. The value to write can be sourced from a constant, or a parameter value
- `parameters`, type: `repeated VariableDeclaration` - declares parameters needed at compile time by this node, or children of this node. This is a way for a node to communicate what parameters its implementation and/or children require, without unpacking the entire subtree

Type `KeyValue`:

- `key`, type: `string`
- `value`, type: `Value`

Type `Value`:

- `constant`, type: `ConstantValue`- a constant value
- `runtime_var`, type: `VariableDeclaration` - look up a variable provided at run-time
- `parameter`, type `VariableDeclaration` - look up a Node Parameter

Type `VariableDeclaration`:

- `name`, type: `String` - name of the variable
- `type`, type: `Type` - type that this variable is expected to have. Supported types: `TYPE_UNKNOWN`, `TYPE_FLOAT`, `TYPE_STRING`, `TYPE_INT`, `TYPE_BOOL`, `TYPE_MESSAGE`

## Sequence

Specify a list of actions for the robot to perform.

Arguments:

- `always_restart`, type: `bool` - forces the execution to always begin with the first child.  If false, and the Sequence ran last tick, it will continue with the node it was ticking.
- `children`, type: `repeated Node` - list of all children to iterate through

## Selector

Run all children in order until a child succeeds.

Arguments:

- `always_restart`, type: `bool` - forces the execution to always begin with the first child.  If false, and the Sequence ran last tick, it will continue with the node it was ticking.
- `children`, type: `repeated Node` - list of all children to iterate through

## Repeat

Loop a subtree a certain number of times.

Arguments:

- `max_starts`, type: `int32` - start the child node exactly this many times
- `child`, type: `Node` - child to repeate max_starts times
- `start_counter_state_name`, type: `string` - if set, the node will write the start index to the blackboard

## Retry

Retry a child node until it succeeds, or exceeds a number of attempts.

Arguments:

- `max_attempts`, type: `int32` - only allow this many attempts
- `child`, type: `Node` - child to retry up to max_attempts
- `attempt_counter_state_name`, type: `string` - if set, the node will write the attempt index to the blackboard

## ForDuration

Run this child for a maximum amount of mission execution time. Will exit with child's status if the child finishes early, FAILURE if the child remains in RUNNING state for too long.

Arguments:

- `duration`, type: `google.protobuf.Duration` - maximum duration of mission execution time
- `child`, type: `Node` - child to execute for the duration

## SimpleParallel

Run two child nodes together, returning the primary child's result when it completes.

Arguments:

- `primary`, type: `Node` - primary node, whose completion will end the execution of SimpleParallel
- `secondary`, type: `Node` - secondary node, which will be ticked as long as the primary is still running

## Condition

Checks a simple comparison statement.

Arguments:

- `lhs`, type: `Operand` - left-hand side of the comparison
- `rhs`, type: `Operand` - right-hand side of the comparison
- `operation`, type: `Compare` - comparison operator to compare lhs and rhs
- `handle_staleness`, type: `HandleStaleness` - when comparing runtime values in the blackboard, some values might be "stale" (i.e too old). This defines how the comparator should behave when a read value is stale.

Type `Operand`:

- `var`, type: `VariableDeclaration` - reference an existing variable
- `const`, type: `ConstantValue` - use a constant value

Type `ConstantValue`:

- Supported values: double float_value; string string_value; int64 int_value; bool bool_value; google.protobuf.Any msg_value;

Type `Compare`:

- `COMPARE_UNKNOWN` - invalid, do not use
- `COMPARE_EQ` - equal
- `COMPARE_NE` - not equal
- `COMPARE_LT` - less than
- `COMPARE_GT` - greater than
- `COMPARE_LE` - less than or equal
- `COMPARE_GE` - greater than or equal

Type `HandleStaleness`:

- `HANDLE_STALE_UNKNOWN` - acts like READ_ANYWAY for backwards compatibility
- `HANDLE_STALE_READ_ANYWAY` - ignore how stale this data is
- `HANDLE_STALE_RUN_UNTIL_FRESH` - return the RUNNING status until the data being read is not stale
- `HANDLE_STALE_FAIL` - return FAILURE status if stale data is read

## BosdynRobotState

Get state from the robot.

Arguments:

- `service_name`, type: `string` - name of the service to use (robot-state)
- `host`, type: `string` - host machine the service is running on (localhost)
- `child`, type: `Node` - child node. Children will have access to the state gathered by this node
- `state_name`, type: `string` - name of the bosdyn.api.RobotState object in the blackboard. For example, if this is set to "robot", children can look up "robot.power_state.motor_power_state" in the blackboard

## RemoteGrpc

Call out to another system using the RemoteMission service.

Arguments:

- `host`, type: `string` - host that is running the directory server. Usually, this is just the robot
- `service_name`, type: `string`: name of the service in the directory
- `timeout`, type: `float` - timeout of any single RPC. If the timeout is exceeded, the RPC will fail
- `lease_resources`, type: `string` - resources that we will need leases on
- `inputs`, type: `KeyValue` - the list of variables the remote host should receive

## Sleep

When started, begins a sleep timer for X seconds. Returns "success" after the timer elapses, "running" otherwise.

Arguments:

- `seconds`, type: `float` - number of seconds to sleep for
- `restart_after_stop`, type: `bool` - if this node is stopped, should it restart the timer?

## Prompt

Prompt the world at large to answer a question. This node represents a request for information from ANY listeners that may be out there.

Arguments:

- `always_reprompt`, type: `bool` - should we always re-prompt when this node is started? If false, this node will only ever prompt if it is started and its question is unanswered. If true, this node will prompt whenever it is started.
- `text`, type: `string` - the text of the question itself
- `source`, type: `string` - the answer will be written into the state blackboard with this as the variable name
- `options`, type: `repeated Option` - data about the options to choose from
- `child`, type: `Node` - child node, run after the prompt has been responded to. Children will have access to the answer code provided by the response
- `for_autonomous_processing`, type: `bool` - hint that Question posed by this Prompt is meant to be answered by some automated system

Type `Option`:

- `text`, type: `string` - text associated with this option. Should be displayed to the user
- `answer_code`, type: `int64` - numeric code corresponding to this option. Passed as part of the answer

## BosdynRobotCommand

Execute a RobotCommand. These nodes will "succeed" once a feedback response is received indicating success. Any commands that require an "end time" will have that information set based on the end time of the mission.

Arguments:

- `service_name`, type: `string` - name of the service to use (robot-command)
- `host`, type: `string` - host machine the directory is running on (localhost)
- `command`, type: `RobotCommand` - the command to execute

## BosdynPowerRequest

Make a robot power request.

Arguments:

- `service_name`, type: `string` - name of the service to use (power)
- `host`, type: `string` - host machine the directory is running on (localhost)
- `request`, type: `bosdyn.api.PowerCommandRequest.Request` - the request to make

## BosdynNavigateTo

Tell the robot to navigate to a waypoint.

Arguments:

- `service_name`, type: `string` - name of the service to use (graph-nav)
- `host`, type: `string` - host machine the directory is running on (localhost)
- `destination_waypoint_id`, type: `string` - ID of the waypoint to go to
- `route_gen_params`, type: `bosdyn.api.graph_nav.RouteGenParams` - preferences on how to pick the route
- `travel_params`, type: `bosdyn.api.graph_nav.TravelParams` - parameters that define how to traverse and end the route

## BosdynGraphNavState

Get GraphNav state from the robot and save it to the blackboard.

Arguments:

- `service_name`, type: `string` - name of the service to use (graph-nav)
- `host`, type: `string` - host machine the directory is running on (localhost)
- `child`, type: `Node` - child node. Children will have access to the state gathered by this node
- `state_name`, type: `string` - name of the bosdyn.api.GetLocalizationStateResponse object in the blackboard. For example, if this is set to "nav", children can look up "nav.localization.waypoint_id" in the blackboard to get the waypoint the robot is localized to
- `waypoint_id`, type: `string` - id of the waypoint that we want the localization to be relative to. If this is empty, the localization will be relative to the waypoint that the robot is currently localized to

## BosdynGraphNavLocalize

Tell GraphNav to re-localize the robot using a SetLocalizationRequest. This overrides whatever the current localization is. This can be useful to reinitialize the system at a known state.

Arguments:

- `service_name`, type: `string` - name of the service to use (graph-nav)
- `host`, type: `string` - host machine the directory is running on (localhost)
- `localization_request`, type: `osdyn.api.graph_nav.SetLocalizationRequest` - if no localization_request is provided, the default options used are FIDUCIAL_INIT_NEAREST (the system will initialize to the nearest fiducial). Otherwise, the options inside the set_localization_request will be used

## DefineBlackboard

Defines new blackboard variables within the scope of the child. Shadows blackboard variables in the parent scope.

Arguments:

- `blackboard_variables`, type: `repeated KeyValue` - the list of variables that should be defined for this subtree, with initial values
- `child`, type: `Node` - the blackboard variables will only persist in the subtree defined by this child node. The child's tick() will be called on the child until it returns either SUCCESS or FAILURE

## SetBlackboard

Sets existing blackboard variables within this scope to specific values, returning SUCCESS.

Arguments:

- `blackboard_variables`, type: `repeated KeyValue` - the key of the KeyValue is the name of the blackboard variable. The value will be dereferenced and converted into a value type at runtime inside this node's tick function. For example, if the value is a runtime variable, that variable will be evaluated at tick time, and then stored into the blackboard. If the value is another blackboard variable, that blackboard variable's value will be copied into the variable specified by the key

## FormatBlackboard

Sets a blackboard variable to a formatted string, reading from other blackboard vars.

Arguments:

- `key`, type: `string` - the key of the variable that will be written
- `format`, type: `string` - define a format string that will be used together with the blackboard to generate string value.  Values from the blackboard will replace the keys in braces {}. Example: "telop-{date}", where "date" is a blackboard variable. Example: "{date}_loop_{loop_counter}", where "loop_counter" is a blackboard variable from a Repeat

## DateToBlackboard

Record a datetime string into the blackboard. Writes the date according to ISO8601 format.

Arguments:

- `key`, type: `string` - the key of the variable that will be written
