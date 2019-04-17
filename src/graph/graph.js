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
    this.edges.push(this.vertexs.map(v => null));
    this.edges.map(e => {
      e.push(null)
    })
    this.vertexs.push(vertex);
    return this.vertexs.length - 1;
  }
  removeVertex (idx) {
    this.vertexs.map((v, i)=> {
      if (this.edges[i][idx]) {
        this.vertexs[i].outDegree --;
      }
      if (this.edges[idx][i]) {
        this.vertexs[i].inDegree --;
      }
    })
    this.vertexs.splice(idx, 1);
    this.edges.splice(idx, 1);
    this.edges.map(e => {
      e.splice(idx, 1)
    })
  }
  //确认边是否存在
  exist (i, j) {
    try {
      return !!this.edges[i][j];
    } catch(err) {
      return false;
    }
  }
  insertEdge (data, weight, i, j) {
    if (this.exist(i, j)) {
      return;
    }
    const length = this.vertexs.length;
    if (i < length || j < length) {
      return;
    }
    this.edges[i][j] = new Edge(data, weight);
    this.vertexs[i].outDegree ++;
    this.vertexs[j].inDegree ++;
  }
  removeEdge (i, j) {
    if (!this.exist(i, j)) {
      return;
    }
    const length = this.vertexs.length;
    if (i < length || j < length) {
      return;
    }
    this.edges[i][j] = null;
    
  }
}