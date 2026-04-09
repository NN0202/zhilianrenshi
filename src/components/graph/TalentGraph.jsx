import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTalentStore } from '../../store/talentStore';

// 定义节点和边颜色的映射字典
const categoryColor = {
  rd: 'var(--node-rd)',
  mfg: 'var(--node-mfg)',
  biz: 'var(--node-biz)',
  support: 'var(--node-support)',
};

export default function TalentGraph() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  
  const nodesData = useTalentStore((state) => state.nodes);
  const edgesData = useTalentStore((state) => state.edges);
  const gapFilter = useTalentStore((state) => state.gapFilter);
  const setSelectedNode = useTalentStore((state) => state.setSelectedNode);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    
    // 清空现有的 svg 内容，避免重复渲染
    d3.select(svgRef.current).selectAll('*').remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 深拷贝数据，防止 D3 直接修改 store 中的数据
    const nodes = nodesData.map(d => ({ ...d }));
    const links = edgesData.map(d => ({ ...d }));

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'radial-gradient(circle at center, #0a1628 0%, #050d1a 100%)');

    // 1. 定义滤镜和箭头标记
    const defs = svg.append('defs');
    
    // 箭头标记 - 实线边
    defs.append('marker')
      .attr('id', 'arrow-solid')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 28) // 调整箭头位置，避免被节点挡住
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'rgba(0, 200, 255, 0.5)');

    // 箭头标记 - 虚线边 (needs-skill)
    defs.append('marker')
      .attr('id', 'arrow-dashed')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 28)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'rgba(239, 68, 68, 0.6)');

    // 发光滤镜
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'blur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // 背景网格 (Dot Grid)
    const pattern = defs.append('pattern')
      .attr('id', 'dot-grid')
      .attr('width', 40)
      .attr('height', 40)
      .attr('patternUnits', 'userSpaceOnUse');
    pattern.append('circle')
      .attr('cx', 2)
      .attr('cy', 2)
      .attr('r', 1.5)
      .attr('fill', 'rgba(255, 255, 255, 0.05)');
    
    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'url(#dot-grid)');

    // 缩放容器 <g>
    const gContainer = svg.append('g');

    // 2. 初始化力导向仿真
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    // 3. 绘制边 (Links)
    const link = gContainer.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", 1.5)
      .attr("stroke", d => d.type === 'needs-skill' ? 'var(--edge-dashed)' : 'var(--edge-solid)')
      .attr("stroke-dasharray", d => d.type === 'needs-skill' ? '5,5' : 'none')
      .attr("marker-end", d => d.type === 'needs-skill' ? 'url(#arrow-dashed)' : 'url(#arrow-solid)');

    // 4. 绘制节点 (Nodes)
    const node = gContainer.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        setSelectedNode(d.id);
      })
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(150).attr("transform", `translate(${d.x},${d.y}) scale(1.2)`);
        // 简单 Tooltip 提示
        svg.append("text")
          .attr("id", "tooltip")
          .attr("x", event.offsetX + 15)
          .attr("y", event.offsetY + 15)
          .text(d.name || d.label)
          .attr("fill", "var(--text-primary)")
          .attr("font-size", "12px")
          .attr("background", "var(--bg-surface)");
      })
      .on("mouseout", function(event, d) {
        d3.select(this).transition().duration(150).attr("transform", `translate(${d.x},${d.y}) scale(1)`);
        svg.select("#tooltip").remove();
      });

    // 为不同类型的节点绘制形状
    node.each(function(d) {
      const el = d3.select(this);
      
      // 节点透明度过滤逻辑（联动：缺口高亮）
      let opacity = 1;
      if (gapFilter === 'high') {
        if (d.type === 'talent' && (d.category !== 'biz' && d.category !== 'support')) {
          opacity = 0.2;
        } else if (d.type !== 'talent') {
          opacity = 0.2; // 暂将技能节点也变暗
        }
      }
      el.style('opacity', opacity);

      if (d.type === 'talent') {
        // talent: 圆形 + 外发光
        const color = categoryColor[d.category] || 'var(--accent-secondary)';
        el.append("circle")
          .attr("r", 22)
          .attr("fill", color)
          .attr("filter", "url(#glow)");
          
        el.append("text")
          .text(d.name)
          .attr("dy", 35)
          .attr("text-anchor", "middle")
          .attr("fill", "var(--text-primary)")
          .attr("font-size", "12px");
          
      } else {
        // skill-owned / skill-gap: 圆角矩形
        const isGap = d.type === 'skill-gap';
        const color = isGap ? 'var(--node-skill-gap)' : 'var(--node-skill)';
        const width = 60;
        const height = 24;
        
        el.append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("x", -width/2)
          .attr("y", -height/2)
          .attr("rx", 12)
          .attr("ry", 12)
          .attr("fill", isGap ? 'transparent' : color)
          .attr("stroke", color)
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", isGap ? "4,2" : "none");
          
        el.append("text")
          .text(d.label)
          .attr("dy", 4)
          .attr("text-anchor", "middle")
          .attr("fill", isGap ? color : '#fff')
          .attr("font-size", "11px");
      }
    });

    // 5. 仿真更新事件 (Tick)
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // 6. 添加缩放行为 (Zoom)
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        gContainer.attr("transform", event.transform);
      });
    svg.call(zoom);

    // 拖拽函数
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // 清理函数
    return () => {
      simulation.stop();
    };

  }, [nodesData, edgesData, gapFilter, setSelectedNode]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}