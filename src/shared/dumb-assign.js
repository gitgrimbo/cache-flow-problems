/**
 * Use when you don't want Object.assign semantics.
 *
 * I.e. you don't want to "copy the values of all enumerable own properties".
 */
function assign(dest, src1, src2, etc) {
  for (var i = 1; i < arguments.length; i++) {
    for (var k in arguments[i]) {
      dest[k] = arguments[i][k];
    }
  }
  return dest;
}

module.exports = assign;
