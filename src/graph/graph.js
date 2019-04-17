class Vertex {
  constructor(data) {
    this.data = data;
    this.inDegree = 0;
    this.outDegree = 0;
    this.status = 'UNDISCOVERED';
  }
}
//用邻接矩阵实现的图
class Edge {
  constructor(data, weight = 0) {
    this.data = data;
    this.weight = weight;
    this.status = 'UNDETERMINED';
  }
}

class Graph {
  constructor() {
    this.vertexs = [];
    this.edges = [];
  }
  _reset () {

  }
  insertVertex (data) {
    const vertex = new Vertex(data);
    this.edges.push(this.vertexs.map(v => 0));
    this.edges.map(e => {
      e.push(0)
    })
    this.vertexs.push(vertex);
    return this.vertexs.length - 1;
  }
  removeVertex (idx) {
    this.vertexs.splice(idx, 1);
    this.edges.splice(idx, 1);
    this.edges.map(e => {
      e.splice(idx, 1)
    })
  }
}