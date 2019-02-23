const DomNodeCollection = require("./dom_node_collection");

import _ from 'lodash';

// function component() {
//   let element = document.createElement('div');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   return element;
// }

// document.body.appendChild(component());

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
  if (typeof arg === "string") {
    const nodes = document.querySelectorAll(arg); 
    const nodesA = Array.from(nodes); 
    return new DomNodeCollection(nodesA); 
  } else if (typeof arg === "HTMLElement") {
    return new DomNodeCollection([arg]); 
  } else if (typeof arg === "function") {
    if (!_docReady) {
      _docReadyCallbacks.push(arg); 
    } else {
      arg(); 
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true; 
  _docReadyCallbacks.forEach(func => func()); 
}); 


// toQueryString = (obj) => {
//   let result = "";
//   for (const prop in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, prop)) {
//       result += `${prop}=${obj[prop]}&`;
//     }
//   }
//   return result.substring(0, result.length - 1);
// };




// window.$l = $l;


