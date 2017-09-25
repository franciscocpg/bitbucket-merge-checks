// content.js

// Handler when the DOM is fully loaded

console.log("bitbucket-merge-checks - started load!");

function checkMerge() {
  //a contains all the button on the page
  var a = document.getElementsByTagName('button');
  //the button we care about is the last button on the page which is the merge button
  var button = a[a.length - 1];

  //the value of the choice can be either merge commits or squash
  var mergeStrategy = document.getElementsByClassName("select2-chosen");
  var mergeStrategyInvalid = mergeStrategy[0] === undefined || mergeStrategy[0].innerHTML !== "Squash";

  var mergeCheckslist = document.getElementsByClassName("field-value");
  var mergeCheckslistInvalid = Array.from(mergeCheckslist).filter(element => {
    return element.innerHTML.includes('aui-iconfont-warning');
  }).length > 0;

  //if it s not squash dont allow to push
  if (mergeStrategyInvalid || mergeCheckslistInvalid) {

    button.setAttribute("title", "Squash your merges");
    button.setAttribute("disabled", "false");
    button.setAttribute("style", "background-color: red;");

  } else {
    button.setAttribute("title", "It's safe to merge");
    button.setAttribute("style", "background-color: green;");
    button.removeAttribute("disabled");
  }
}

function checkMergeInterval() {
  //sets timeout since we are loading everything with AJAX so we wait a bit that everything loads
  setTimeout(checkMerge, 250);
}

document.getElementById("fulfill-pullrequest").onclick = function () {

  //sets timeout since we are loading everything with AJAX so we wait a bit that everything loads
  setTimeout(function () {
    checkMerge()
    //keep checking for changes every 0.5 second
    setInterval(checkMerge, 500);
  }, 250);

};

console.log("bitbucket-merge-checks - Loaded!");
