class DomNodeCollection{
  constructor(nodes) {
    this.nodes = nodes; 
  }

  find(selector) {
    let foundNodes = [];
    this.each((node) => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    });
    return new DomNodeCollection(foundNodes);
  }
}

module.exports = DomNodeCollection;