
import React, { Component } from 'react';
import { Input, Button, message } from 'antd';

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

    graph.insertEdge('edge1', 1, 'A', 'B');
    graph.insertEdge('edge2', 1, 'C', 'D');
    graph.insertEdge('edge3', 1, 'B', 'C');
    graph.insertEdge('edge4', 1, 'A', 'D');
    this.state = {
      graph,
      addVerKey: void 0,
      addEdgeStart: void 0,
      addEdgeTarget: void 0,
      reVerKey: void 0,
      reEdgeStart: void 0,
      reEdgeTarget: void 0,
    }
  }
  handleInput = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }
  handleAddVertex = () => {
    const { graph, addVerKey } = this.state;
    if (addVerKey !== void 0) {
      graph.insertVertex(addVerKey);
      this.setState({
        graph,
        addVerKey: void 0
      })
    }
  }
  handleAddEdge = () => {
    const { graph, addEdgeStart, addEdgeTarget } = this.state;
    if (addEdgeStart !== void 0 && addEdgeTarget !== void 0) {
      const success = graph.insertEdge('边', 1, addEdgeStart, addEdgeTarget);
      if (!success) {
        message.error('请输入正确的顶点');
        return ;
      }
      this.setState({
        graph,
        addEdgeStart: void 0,
        addEdgeTarget: void 0,
      })
    }
  }
  handleRemoveVertext = () => {
    const { graph, reVerKey } = this.state;
    if (reVerKey !== void 0) {
      graph.removeVertex(reVerKey);
      this.setState({
        graph,
        reVerKey: void 0
      })
    }
  }
  handleRemoveEdge = () => {
    const { graph, reEdgeStart, reEdgeTarget } = this.state;
    if (reEdgeStart !== void 0 && reEdgeTarget !== void 0) {
      const success = graph.removeEdge(reEdgeStart, reEdgeTarget);
      if (!success) {
        message.error('请输入正确的顶点');
        return ;
      }
      this.setState({
        graph,
        reEdgeStart: void 0,
        reEdgeTarget: void 0,
      })
    }
  }
  render() {
    const { graph } = this.state;
    const { vertexs } = graph;
    const { addVerKey, addEdgeStart, addEdgeTarget, reVerKey, reEdgeStart, reEdgeTarget } = this.state;
    return (
      <div className="adjacency-matric">
        <h2 className="title">邻接表--表示图</h2>
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
                  const edge = graph.findEdge(v1.key, v2.key);
                  content = edge ? edge.weight : ''
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
            <Input placeholder="顶点名称" value={addVerKey} onChange={(e) => this.handleInput(e, 'addVerKey')}/>
            <Button type="primary" onClick={this.handleAddVertex}>添加顶点</Button>
          </div>
          <div>
            <Input placeholder="起始点" value={addEdgeStart} onChange={(e) => this.handleInput(e, 'addEdgeStart')}/>
            <Input placeholder="终止点" value={addEdgeTarget} onChange={(e) => this.handleInput(e, 'addEdgeTarget')}/>
            <Button type="primary" onClick={this.handleAddEdge}>添加边</Button>
          </div>
          <div>
            <Input placeholder="顶点名称"  value={reVerKey} onChange={(e) => this.handleInput(e, 'reVerKey')}/>
            <Button type="primary" onClick={this.handleRemoveVertext}>删除顶点</Button>
          </div>
          <div>
            <Input placeholder="起始点" value={reEdgeStart} onChange={(e) => this.handleInput(e, 'reEdgeStart')}/>
            <Input placeholder="终止点" value={reEdgeTarget} onChange={(e) => this.handleInput(e, 'reEdgeTarget')}/>
            <Button type="primary" onClick={this.handleRemoveEdge}>删除边</Button>
          </div>
        </div>
      </div>
    )
  }
}