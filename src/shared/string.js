function pad(s, len) {
  s = String(s || "");
  while (s.length < len) {
    s = " " + s;
  }
  return s;
}

function squash(s, len) {
  if (s.length < len) {
    return s;
  }
  var mid = (len - 3) / 2;
  s = s.substring(0, mid) + "..." + s.substring(s.length - mid);
  return s;
}

module.exports = {
  pad: pad,
  squash: squash
};
