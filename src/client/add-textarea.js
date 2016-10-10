/* eslint-env browser */
var makePostData = require("./beacon").makePostData;

module.exports = function addTextArea(origin, resources, session, tag, addTo) {
  var data = makePostData(origin, resources, session, tag);

  var div = document.createElement("div");

  var btn = document.createElement("button");
  btn.innerHTML = "Copy the JSON then click to close";
  btn.addEventListener("click", function click() {
    btn.removeEventListener("click", click, false);
    div.parentElement.removeChild(div);
  }, false);

  var ta = document.createElement("textarea");
  ta.value = JSON.stringify(data);
  div.appendChild(ta);
  div.appendChild(btn);

  if (addTo) {
    addTo.appendChild(div);
  } else {
    document.body.insertBefore(div, document.body.firstChild);
  }
};
