// content.js

// Handler when the DOM is fully loaded

console.log("bitbucket-merge-checks - started load!");

function disableMergeButton(button) {
  button.setAttribute("title", "Select Squash Merge strategy and check Merge checklist");
  button.setAttribute("disabled", "false");
  button.setAttribute("style", "background-color: red;");
}

function enableMergeButton(button) {
  button.setAttribute("title", "It's safe to merge");
  button.setAttribute("style", "background-color: green;");
  button.removeAttribute("disabled");
}

function checkMerge() {
  //a contains all the button on the page
  var buttons = document.getElementsByTagName('button');
  //the button we care about is the last button on the page which is the merge button
  var button = buttons[buttons.length - 1];
  // by default let's disable the merge button. 
  disableMergeButton(button);

  //the value of the choice can be either merge commits or squash
  var mergeStrategy = document.getElementsByClassName("select2-chosen");
  var mergeStrategyValid = mergeStrategy[0] !== undefined && mergeStrategy[0].innerHTML === "Squash";

  // no checklist warnings
  var mergeCheckslist = document.getElementsByClassName("field-value");
  var mergeCheckslistValid = Array.from(mergeCheckslist).filter(element => {
    return element.innerHTML.includes('aui-iconfont-warning');
  }).length === 0;

  if (mergeStrategyValid && mergeCheckslistValid) {
    enableMergeButton(button);
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
