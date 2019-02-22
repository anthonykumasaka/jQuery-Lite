class DomNodeCollection{
  constructor(nodes) {
    this.nodes = nodes; 
  }

  each(cb) {
    // Our each passes in the node and index in traditional 'forEach' order,
    // jquery passes in index first and binds the call to the element.
    this.nodes.forEach(cb);
  }

  html(html) {
    if (typeof html === "string") {
      this.each((node) => {
        node.innerHTML = html
      }); 
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML; 
    }
  }

  empty() {
    this.html(''); 
  }

  append(children) {
    if (this.nodes.length === 0) return; 

    if (typeof children === 'object' && !(children instanceof DomNodeCollection)) {
      children = $1(children); 
    }

    if (typeof children === "string") {
      this.each((node) => {
        node.innerHTML += children; 
      }); 
    } else if (children instanceof DomNodeCollection) {
      this.each((node) => {
        children.each((childNode) => {
          node.appendChild(childNode.cloneNode(true)); 
        });
      });
    }
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.each(node => node.setAttribute(key, val));  
    } else {
      return this.nodes[0].getAttribute(key); 
    }
  };

  addClass(newClass) {
    this.each(node => node.classList.add(newClass)); 
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass)); 
  } 

  children() {
    let childNodes = []; 
    this.each((node) => {
      const childNodeList = node.children; 
      childNodes = childNodes.concat(Array.from(childNodeList)); 
    });
    return new DomNodeCollection(childNodes); 
  }

  parent() {
    let parentNodes = []; 
    this.each(({parentNode}) => {
      if (!parentNode.visited) {
        parentNodes.push(parentNode); 
        parentNode.visited = true; 
      }
    });

    parentNodes.forEach((node) => {
      node.visited = false; 
    }); 

    return new DomNodeCollection(parentNodes); 
  }

  find(selector) {
    let foundNodes = []; 
    this.each((node) => {
      const nodeList = node.querySelectorAll(selector); 
      foundNodes = foundNodes.concat(Array.from(nodeList)); 
    }); 
    return new DomNodeCollection(foundNodes); 
  }; 
  remove; 
}

module.exports = DomNodeCollection;