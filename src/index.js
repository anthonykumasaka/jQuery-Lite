const DomNodeCollection = require("./dom_node_collection");

import _ from 'lodash';

// function component() {
//   let element = document.createElement('div');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   return element;
// }

// document.body.appendChild(component());

window.$l = (arg) => {
  let nodeLists = document.querySelectorAll(arg); 
  return Array.from(nodeLists); 
};

function order() {
  console.log("hello world"); 
}

order(); 


window.$l = $l;



getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DomNodeCollection(nodesArray);
};

