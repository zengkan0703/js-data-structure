import React, { Component } from 'react';

import Tree from './tree';

import './style';

export default class TreeEle extends Component {
  constructor(props){
    super(props);
    this.tree = new Tree(new Array(10).fill().map(d => parseInt(Math.random() * 100)));
    this.renderEle = this.renderEle.bind(this);
  }
  renderEle() {
    let i = 0;
    const loop = (node, type) => {
      i ++;
      return (
        <div className={`node ${type}`} key={i} style={{
          width: node.size * 50,
          height: 100
        }}>
          {
            node.left && loop(node.left, 'left')
          }
          <span className="value">{`值: ${node.value}/高: ${node.height}/大小: ${node.size}/层级:${node.level}`}</span>
          {
            node.right && loop(node.right, 'right')
          }
        </div>
      )
    }
    return loop(this.tree.root, 'root')
  }
  render() {
    const { size, height } = this.tree.root;
    window.tree = this.tree;
    return (
      <div 
        className="tree" 
        style={{
          width: size * 50,
          height: height * 50
        }}
      >
        {
          this.renderEle()
        }
      </div>
    )
  }
}