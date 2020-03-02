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
    this.clear = false;
    this.promiseIdx = 0;
    this.state = {
      values: [],
      nodes: []
    }
  }
  componentDidMount() {
    this.zr = zrender.init(this.treeEle);   
    this.start();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.nodes !== this.state.nodes) {
      this.updateValues();
    }
  }
  start = () => {
    this.interval = setInterval(this.add, 20)
  }
  pause = () => {
    clearInterval(this.interval);
    this.interval = null
  }
  handleClear = () => {
    this.clear = true;
    this.pause();
    this.tree = new Tree(); 
    this.draw(); 
    this.setState({
      values: []
    })
    this.promiseIdx = 0;
  }
  add = () => {
    if (this.clear) {
      this.clear = false
    }
    this.tree.insert(parseInt(Math.random() * 1000));
    this.draw();
  }
  handleCreate = () => {
    this.handleClear();
    this.start();
  }
  //获取起点终点连线的参数
  getLineParams = (start, end) => {
    //y = kx + b;
    const k = (start[0] - end[0]) / (start[1] - end[1]);
    const b = start[1] - k * start[0];
    const angle = Math.atan(-k);
    return { k, b, angle };
  }
  //起点终点落在圆的周围
  getStartEnd = (start, end) => {
    const {angle } = this.getLineParams(start, end);
    const realStartX = start[0] - Math.sin(angle) * RADIUS;
    const realStartY = start[1] + Math.cos(angle) * RADIUS;
    const realEndX = end[0] +  Math.sin(angle) * RADIUS;
    const realEndY = end[1] -  Math.cos(angle) * RADIUS;
    return [[realStartX, realStartY], [realEndX, realEndY]];
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
          n.cy = parent.cy + RADIUS * 6;
        }
        if (n.cx < 50 || n.cx > (width - 50) || n.cy > height) {
          this.pause();
        }
        const circle = new zrender.Circle({
          shape: {
            cx: n.cx, cy: n.cy, r: RADIUS
          },
          style: {
            // fill:  type === 'left' ? 'red' : '#000',
            fill: 'transparent',
            text: `${n.value}`,
            textFill: '#000',
            stroke: '#000'
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
            points: lineType === 'straight' ? this.getStartEnd([startX, startY], [endX, endY]) : [[startX, startY], [middleX, middleY], [endX, endY]],
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
  highLightNode = (nodes) => {
    nodes = Array.isArray(nodes) ? nodes : [nodes];
    nodes.map(node => {
      const circle = new zrender.Circle({
        shape: {
          cx: node.cx, cy: node.cy, r: RADIUS + 5
        },
        style: {
          fill:  '#23c132',
          text: `${node.value}`,
        }
      })
      circle.animateTo({
        shape: {
          cx: node.cx, cy: node.cy, r: 0
        }
      }, 300, 200, () => {
        circle.style.text = "";
      })
      this.zr.add(circle);
    })
  }  
  updateValue = (node, idx) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 如果当前 promise 的 idx 和 this.promiseIdx，表示已经出现新的遍历，此次遍历已经失效
        if (this.promiseIdx !== idx) {
          reject();
        }
        this.highLightNode(node)
        this.setState((state) => ({
          values: [...state.values, ...(Array.isArray(node) ? node.map(d => d.value) : [node.value])]
        }), resolve)
      }, 300)
    })
  }
  updateValues = async () => {
    this.promiseIdx++;
    let promise = null;
    const { nodes } = this.state;
    ;((idx) => {
      // 形成局部作用域，避免多次遍历时候 idx 混淆，让 idx 准确表示当前的操作是在哪次遍历
      for (let i = 0, length = nodes.length; i < length; i++) {
        promise = promise ? promise.then(() => {
          return this.updateValue(nodes[i], idx)
        }) : this.updateValue(nodes[i], idx)
      }
    })(this.promiseIdx);
    promise.catch(() => {
      console.log("catch")
    });
  }
  trav = async (type) => {
    const nodes = [];
    this.tree[type](node => nodes.push(node))
    this.setState({
      nodes,
      values: []
    })
  }
  travPre = () => {
    this.trav("travPre")
  }
  travIn = () => {
    this.trav("travIn")
  }
  travPost = () => {
    this.trav("travPost")
  }
  travLevel = () => {
    this.trav("travLevel")
  }
  render() {
    const { values } = this.state;
    return (
      <div className="container">
        <div className="tree" ref={r => this.treeEle = r}/>
        <div className="btn">
          <span onClick={this.handleCreate}>随机生成</span>
          <span onClick={this.handleClear}>清空</span>
          <span onClick={this.add}>随机加1</span>

          <span onClick={this.travPre}>先序遍历</span>  
          <span onClick={this.travIn}>中序遍历</span>  
          <span onClick={this.travPost}>后序遍历</span>  
          <span onClick={this.travLevel}>层级遍历</span>  
        </div>
        <div className="values">{values.join()}</div>
      </div>
    )
  }
}