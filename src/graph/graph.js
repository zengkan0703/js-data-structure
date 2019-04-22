const DISCOVERED = 'DISCOVERED';
const UNDISCOVERED = 'UNDISCOVERED';
const VISITED = 'VISITED';
const UNDETERMINED = 'UNDETERMINED';
class Vertex {
  constructor(key) {
    this.key = key;
    this.inDegree = 0;
    this.outDegree = 0;
    this.status = UNDISCOVERED;
  }
}
class Edge {
  constructor(key, weight = 0) {
    this.key = key;
    this.weight = weight;
    this.status = UNDETERMINED;
  }
}

//用邻接矩阵实现的图
class Graph2 {
  constructor() {
    this.vertexs = [];
    this.edges = [];
  }
  _reset () {

  }
  insertVertex (key) {
    const vertex = new Vertex(key);
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
  insertEdge (key, weight, i, j) {
    if (this.exist(i, j)) {
      return;
    }
    const length = this.vertexs.length;
    if (i > length || j > length) {
      return;
    }
    this.edges[i][j] = new Edge(key, weight);
    this.vertexs[i].outDegree ++;
    this.vertexs[j].inDegree ++;
  }
  removeEdge (i, j) {
    if (!this.exist(i, j)) {
      return;
    }
    const length = this.vertexs.length;
    if (i > length || j > length) {
      return;
    }
    this.edges[i][j] = null;
    this.vertexs[i].outDegree --;
    this.vertexs[j].inDegree --;
  }
}


export default class Graph {
  constructor() {
    this.vertexs = [];
  }
  //重置所有边和顶点的状态
  reset() {
    this.vertexs.map(v => {
      v.status = UNDISCOVERED,
      v.edges.map(e => {
        e.status = UNDETERMINED;
      })
    })
  }
  insertVertex(key) {
    if (this.vertexs.find(d => d.key === key)) {
      return false;
    }
    const vertex = new Vertex(key);
    vertex.edges = [];
    this.vertexs.push(vertex);
    return vertex;
  }
  removeVertex(key) {
    this.vertexs = this.vertexs.filter(d => d.key !== key);
    this.vertexs.map(d => {
      d.edges = d.edges.filter(e => e.target !== key);
      if (d.edges.find(e => e.target === key)) {
        d.outDegree --;
      }
    })
  }
  findEdge(i, j) {
    try {
      return this.vertexs.find(v => v.key === i).edges.find(e => e.target === j);
    } catch (error) {
      return false
    }
  }
  insertEdge(key, weight, i, j) {
    if (this.findEdge(i, j)) {
      return false;
    }
    const start = this.vertexs.find(v => v.key === i);
    const target = this.vertexs.find(v => v.key === j);
    if (! start || ! target) {
      return false;
    }
    start.outDegree ++;
    target.inDegree ++;
    const edge = new Edge(key, weight);
    edge.target = j;
    start.edges.push(edge);
    return edge;
  }
  removeEdge(i, j) {
    if (!this.findEdge(i, j)) {
      return false;
    }
    const start = this.vertexs.find(v => v.key === i);
    const target = this.vertexs.find(v => v.key === j);
    if (! start || ! target) {
      return false;
    }
    start.outDegree --;
    target.inDegree --;
    start.edges = start.edges.filter(e => e.target !== 'j');
    return start;
  }
  bfs(callback) {
    this.reset();
    this.vertexs.map(v => {
      if (v.status === UNDISCOVERED) {
        v.depth = 0;
        this._bfs(v, callback)
      }
    })
  }
  _bfs(v, callback) {
    const array = [];
    v.status = DISCOVERED;
    array.push(v);
    while(array.length) {
      const vertex = array.pop();
      vertex.edges.map(e => {
        let target = this.vertexs.find(v => v.key === e.target);
        if (target.status === UNDISCOVERED) {
          target.depth = vertex.depth + 1
          target.status = DISCOVERED;
          array.push(target);
          target.parent = vertex;
          console.log(`${v.key}开始到${e.target}的深度是：${target.depth}`);
          const arr = [];
          while(target) {
            arr.push(target.key);
            target = target.parent;
          }
          console.log(`${v.key}开始到${e.target}的最短路径是: ${arr.reverse().join('=>')}`)
        }
      })
      vertex.status = VISITED;
      callback && callback(vertex);
    }
  }
  dfs(callback) {
    this.reset();
    this.vertexs.map(v => {
      if (v.status === UNDISCOVERED) {
        this._dfs(v, callback)
      }
    })
  }
  _dfs(v, callback) {
    v.status = DISCOVERED;
    callback && callback(v);
    console.log(v.key, 'key 555')
    v.edges.map(e => {
      const target = this.vertexs.find(v => v.key === e.target);
      if (target.status === UNDISCOVERED) {
        this._dfs(target, callback);
      };
    })
    v.status = VISITED;
  }
}
