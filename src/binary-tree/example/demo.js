import React, { Component } from 'react';
import zrender from 'zrender';

import Tree from '../tree';

import './style';

const RADIUS = 15;

export default class TreeEle extends Component {
  static defaultProps = {
    lineType: 'straight'
  }
  constructor(props){
    super(props);
    this.zr = null;
    this.tree = new Tree([500]);
  }
  componentDidMount() {
    this.zr = zrender.init(this.treeEle);   
    this.start();
  }
  start = () => {
    this.interval = setInterval(this.add, 20)
  }
  pause = () => {
    clearInterval(this.interval);
    this.interval = null
  }
  handleReset = () => {
    this.pause();
    this.tree = new Tree([500]);  
    this.start();
  }
  add = () => {
    this.tree.insert(parseInt(Math.random() * 1000));
    this.draw();
  }
  handleClick = () => {
    if (this.interval) {
      this.pause();
    } else {
      this.start();
    }
  }
  draw = () => {
    const { lineType } = this.props;
    this.zr.clear();
    const width = this.zr.getWidth();
    const height = this.zr.getHeight();
    this.tree.travLevel((nodes, i) => {
      nodes.map(n => {
        const parent = n.parent;
        let type = i === 0 ? 'root' : (n.value < parent.value ? 'left' : 'right');
        if (i === 0) {
          //根节点在中心
          n.cx = width / 2;
          n.cy = RADIUS;
        } else {
          //各节点相对父级偏移，左节点偏移量为当前节点右子树的大小
          n.cx = type === 'left' ? (parent.cx - RADIUS * 1.5 * (n.rightSize + 1)) : (parent.cx + RADIUS * 1.5 * (n.leftSize + 1) );
          n.cy = parent.cy + RADIUS * 4;
        }
        if (n.cx < 50 || n.cx > (width - 50) || n.cy > height) {
          this.pause();
        }
        const circle = new zrender.Circle({
          shape: {
            cx: n.cx, cy: n.cy, r: RADIUS
          },
          style: {
            fill:  type === 'left' ? 'red' : '#000',
            stroke: '#000',
            text: `${n.value}`,
            textFill: '#fff'
          }
        })
        this.zr.add(circle);
        if (type === 'root') {
          return;
        }
        const startX = lineType === 'straight' ? parent.cx : (type === 'left' ? (parent.cx - RADIUS) : (parent.cx + RADIUS));
        const startY = parent.cy;
        const endX = n.cx;
        const endY = lineType === 'straight' ? n.cy : (n.cy - RADIUS) ;
        const middleX = endX;
        const middleY = startY;
        const line = new zrender.Polyline({
          shape: {
            points: lineType === 'straight' ? [[startX, startY], [endX, endY]] : [[startX, startY], [middleX, middleY], [endX, endY]],
            smooth: 0
          },
          style: {
            stroke: '#000'
          }
        })
        this.zr.add(line);
      })
    })
  }
  render() {
    return [
      <div className="tree" ref={r => this.treeEle = r}/>,
      <div className="btn">
        <span onClick={this.handleClick}>暂停</span>
        <span onClick={this.handleReset}>重置</span>
        <span onClick={this.add}>加1</span>
      </div>
    ]
  }
}