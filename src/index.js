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

$1.extend = (base, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    for (const prop in obj) {
      base[prop] = obj[prop]; 
    }
  });
  return base; 
}; 

$1.ajax = (options) => {
  const request = new XMLHttpRequest(); 
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET', 
    url: "", 
    success: () => {}, 
    error: () => {}, 
    data: {}
  };

  options.$1.extend(defaults, options); 
  options.method = options.method.toUpperCase(); 

  if (options.method === "GET") {
    options.url += `?${toQueryString(options.data)}`;
  }

  request.open(options.method, options.url, true); 
  request.onload = (e) => {
    if (request.status === 200) {
      options.success(request.response); 
    } else {
      options.error(request.response); 
    }
  }; 

  request.send(JSON.stringify(options.data)); 
}


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


