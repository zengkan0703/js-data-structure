import React, { Component } from 'react';

import Tree from './tree';

import './style';

export default class TreeEle extends Component {
  constructor(props){
    super(props);
    this.tree = new Tree(new Array(10).fill().map(d => parseInt(Math.random() * 100)));
    // this.tree.travLevel((arr, i) => {
    //   arr.map(d => d.level = i)
    // })
    this.renderEle = this.renderEle.bind(this);
  }
  renderEle() {
    let i = 0;
    const loop = (node, type) => {
      i ++;
      return (
        <div className="node" key={i} className={type} style={{
          width: (node.size + 1) * 50,
          height: 100
        }}>
          {
            node.left && loop(node.left, 'left')
          }
          <span className="value">{node.value}</span>
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
    console.log(this.tree, 'this.tree 5555555')
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
          // new Array(height).fill().map((h, i, all) => {
          //   const nodes = this.tree.getBySth('height', all.length - i);
          //   const eles = [];
          //   new Array(size).fill().map((s, j) => {
          //     eles.push(
          //       <div className="cell" key={`${i}${j}`}></div>
          //     )
          //   })
          //   nodes.map(n => {
          //     eles.push(
          //       <div 
          //         className="block"
          //         style={{
          //           width: n.size * 50,
          //           height: 50,
          //           top: i * 50
          //         }}
          //       >
          //         {n.value}
          //       </div>
          //     )
          //   })
          //   return eles;
          // })
        }
        {
          this.renderEle()
        }
      </div>
    )
  }
}