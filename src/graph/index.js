
import React, { Component } from 'react';
import { Input, InputNumber, Button } from 'antd';

import Graph from './graph';

import './style.scss';

export default class AdjacencyMatrix extends Component {
  constructor(props){
    super(props);
    const graph = new Graph();
    graph.insertVertex('A');
    graph.insertVertex('B');
    graph.insertVertex('C');
    graph.insertVertex('D');

    graph.insertEdge('edge1', 1, 0, 1);
    graph.insertEdge('edge2', 1, 0, 3);
    graph.insertEdge('edge3', 1, 2, 3);
    graph.insertEdge('edge4', 1, 3, 1);
    this.state = {
      graph,
      addVerData: void 0,
      addEdgeIdx1: void 0,
      addEdgeIdx2: void 0,
      reVerIdx: void 0,
      reEdgeIdx1: void 0,
      reEdgeIdx2: void 0,
    }
  }
  handleInput = (value, type) => {
    this.setState({
      [type]: value
    })
  }
  handleAddVertex = () => {
    const { graph, addVerData } = this.state;
    graph.insertVertex(addVerData);
    this.setState({
      graph,
      addVerData: void 0
    })
  }
  handleAddEdge = () => {
    const { graph, addEdgeIdx1, addEdgeIdx2 } = this.state;
    graph.insertEdge('边', 1, addEdgeIdx1, addEdgeIdx2);
    this.setState({
      graph,
      addEdgeIdx1: void 0,
      addEdgeIdx2: void 0,
    })
  }
  handleRemoveVertext = () => {
    const { graph, reVerIdx } = this.state;
    graph.removeVertex(reVerIdx);
    this.setState({
      graph,
      reVerIdx: void 0
    })
  }
  handleRemoveEdge = () => {
    const { graph, reEdgeIdx1, reEdgeIdx2 } = this.state;
    graph.removeEdge(reEdgeIdx1, reEdgeIdx2);
    this.setState({
      graph,
      reEdgeIdx1: void 0,
      reEdgeIdx2: void 0,
    })
  }
  render() {
    const { graph } = this.state;
    const { vertexs, edges } = graph;
    const { addVerData, addEdgeIdx1, addEdgeIdx2, reVerIdx, reEdgeIdx1, reEdgeIdx2 } = this.state;
    return (
      <div className="adjacency-matric">
        <h2 className="title">邻接矩阵表示图</h2>
        <div className="matrix" style={{
          width: (vertexs.length + 1) * 50
        }}>
          {
            [void(0), ...vertexs].map((v1, i) => {
              return [void(0), ...vertexs].map((v2, j) => {
                let content;
                const isVertex = (i === 0 || j === 0) && !(i === 0 && j === 0);
                if (i === 0) {
                  content = v2 ? v2.key : 0
                } else if (j === 0) {
                  content = v1 ? v1.key : 0
                } else {
                  content = graph.exist(i - 1, j - 1) ? edges[i - 1][j - 1].weight : ''
                }
                return (
                  <div className="cell" key={`${i}${j}`} style={{
                    color: isVertex ? '#fff' : '#333',
                    background: isVertex ? '#000' : '#fff',
                  }}>{content}</div>
                )
              })
            })
          }
        </div>
        <div className="action">
          <div>
            <Input placeholder="顶点名称" value={addVerData} onChange={(e) => this.handleInput(e.target.value, 'addVerData')}/>
            <Button type="primary" onClick={this.handleAddVertex}>添加顶点</Button>
          </div>
          <div>
            <InputNumber placeholder="起始点索引" min={0} max={vertexs.length - 1} value={addEdgeIdx1} onChange={(value) => this.handleInput(value, 'addEdgeIdx1')}/>
            <InputNumber placeholder="终止点索引" min={0} max={vertexs.length - 1} value={addEdgeIdx2} onChange={(value) => this.handleInput(value, 'addEdgeIdx2')}/>
            <Button type="primary" onClick={this.handleAddEdge}>添加边</Button>
          </div>
          <div>
            <InputNumber placeholder="顶点索引" min={0} max={vertexs.length - 1}  value={reVerIdx} onChange={(value) => this.handleInput(value, 'reVerIdx')}/>
            <Button type="primary" onClick={this.handleRemoveVertext}>删除顶点</Button>
          </div>
          <div>
            <InputNumber placeholder="起始点索引" min={0} max={vertexs.length - 1} value={reEdgeIdx1} onChange={(value) => this.handleInput(value, 'reEdgeIdx1')}/>
            <InputNumber placeholder="终止点索引" min={0} max={vertexs.length - 1} value={reEdgeIdx2} onChange={(value) => this.handleInput(value, 'reEdgeIdx2')}/>
            <Button type="primary" onClick={this.handleRemoveEdge}>删除边</Button>
          </div>
        </div>
      </div>
    )
  }
}