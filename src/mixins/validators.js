function require(value) {
  return minLength(1)(value);
}
function number(value) {
  return !require(value) || (!isNaN(parseFloat(value)) && isFinite(value));
}
function min(minValue) {
  return function(value) {
    return !require(value) || parseFloat(value) >= minValue;
  };
}
function max(maxValue) {
  return function(value) {
    return !require(value) || parseFloat(value) <= maxValue;
  };
}
function between(minValue, maxValue) {
  const minFn = min(minValue);
  const maxFn = max(maxValue);
  return function(value) {
    return !require(value) || (minFn(value) && maxFn(value));
  };
}
function length(length) {
  return function(value) {
    return value.toString().length === length;
  };
}
function minLength(min) {
  return function(value) {
    return value.toString().length >= min;
  };
}
function maxLength(max) {
  return function(value) {
    return value.toString().length <= max;
  };
}
function hashIpfs(value) {
  return !require(value) || length(46)(value);
}
function email(value) {
  const re = /\S+@\S+\.\S+/;
  return re.test(value);
}

export default {
  require,
  number,
  min,
  max,
  between,
  length,
  minLength,
  maxLength,
  hashIpfs,
  email
};
