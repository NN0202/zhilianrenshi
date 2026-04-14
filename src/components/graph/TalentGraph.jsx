import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useTalentStore } from "../../store/talentStore";
import { useLanguage } from "../../i18n/LanguageContext";
import { skillLabels } from "../../i18n/translations";

const categoryColor = {
  rd: "var(--node-rd)",
  mfg: "var(--node-mfg)",
  biz: "var(--node-biz)",
  support: "var(--node-support)",
};

export default function TalentGraph() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const nodesData = useTalentStore((state) => state.nodes);
  const edgesData = useTalentStore((state) => state.edges);
  const gapFilter = useTalentStore((state) => state.gapFilter);
  const setSelectedNode = useTalentStore((state) => state.setSelectedNode);
  const { language } = useLanguage();

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) {
      return;
    }

    d3.select(svgRef.current).selectAll("*").remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const nodes = nodesData.map((node) => ({ ...node }));
    const links = edgesData.map((edge) => ({ ...edge }));

    const getNodeLabel = (node) => {
      if (node.type === "talent") {
        return node.name;
      }
      return skillLabels[node.id]?.[language] ?? node.label;
    };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style(
        "background",
        "radial-gradient(circle at top, rgba(255,255,255,0.94) 0%, rgba(245,244,237,0.98) 55%, rgba(239,235,225,1) 100%)",
      );

    const defs = svg.append("defs");

    defs
      .append("marker")
      .attr("id", "arrow-solid")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 30)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "rgba(94, 93, 89, 0.35)");

    defs
      .append("marker")
      .attr("id", "arrow-dashed")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 30)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "rgba(181, 51, 51, 0.5)");

    const filter = defs
      .append("filter")
      .attr("id", "glow")
      .attr("x", "-30%")
      .attr("y", "-30%")
      .attr("width", "160%")
      .attr("height", "160%");

    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur");
    const merge = filter.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const pattern = defs
      .append("pattern")
      .attr("id", "dot-grid")
      .attr("width", 36)
      .attr("height", 36)
      .attr("patternUnits", "userSpaceOnUse");

    pattern
      .append("circle")
      .attr("cx", 2)
      .attr("cy", 2)
      .attr("r", 1.2)
      .attr("fill", "rgba(94, 93, 89, 0.08)");

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "url(#dot-grid)");

    const gContainer = svg.append("g");

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(132))
      .force("charge", d3.forceManyBody().strength(-540))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(46));

    const link = gContainer
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", 1.5)
      .attr("stroke", (d) => (d.type === "needs-skill" ? "var(--edge-dashed)" : "var(--edge-solid)"))
      .attr("stroke-dasharray", (d) => (d.type === "needs-skill" ? "6,5" : "none"))
      .attr("marker-end", (d) => (d.type === "needs-skill" ? "url(#arrow-dashed)" : "url(#arrow-solid)"));

    const node = gContainer
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .style("cursor", "pointer")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      )
      .on("click", (_, data) => {
        setSelectedNode(data.id);
      })
      .on("mouseover", function onMouseOver(event, data) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("transform", `translate(${data.x},${data.y}) scale(1.08)`);

        const tooltip = svg
          .append("g")
          .attr("id", "tooltip")
          .attr("transform", `translate(${event.offsetX + 14}, ${event.offsetY + 16})`);

        const tooltipText = tooltip
          .append("text")
          .text(getNodeLabel(data))
          .attr("fill", "var(--text-primary)")
          .attr("font-size", "12px")
          .attr("font-family", "var(--font-body)")
          .attr("dy", "0.35em");

        const bounds = tooltipText.node().getBBox();
        tooltip
          .insert("rect", "text")
          .attr("x", bounds.x - 10)
          .attr("y", bounds.y - 8)
          .attr("width", bounds.width + 20)
          .attr("height", bounds.height + 16)
          .attr("rx", 12)
          .attr("fill", "rgba(255, 255, 255, 0.96)")
          .attr("stroke", "var(--glass-border)")
          .attr("stroke-width", 1);
      })
      .on("mouseout", function onMouseOut(_, data) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("transform", `translate(${data.x},${data.y}) scale(1)`);
        svg.select("#tooltip").remove();
      });

    node.each(function renderNode(data) {
      const element = d3.select(this);
      let opacity = 1;

      if (gapFilter === "high") {
        if (data.type === "talent" && data.category !== "biz" && data.category !== "support") {
          opacity = 0.24;
        } else if (data.type !== "talent") {
          opacity = 0.24;
        }
      }

      element.style("opacity", opacity);

      if (data.type === "talent") {
        const color = categoryColor[data.category] || "var(--accent-secondary)";

        element
          .append("circle")
          .attr("r", 24)
          .attr("fill", "rgba(255, 255, 255, 0.95)")
          .attr("stroke", color)
          .attr("stroke-width", 2.5)
          .attr("filter", "url(#glow)");

        element.append("circle").attr("r", 9).attr("fill", color);

        element
          .append("text")
          .text(getNodeLabel(data))
          .attr("dy", 40)
          .attr("text-anchor", "middle")
          .attr("fill", "var(--text-primary)")
          .attr("font-size", "12px");
      } else {
        const isGap = data.type === "skill-gap";
        const color = isGap ? "var(--node-skill-gap)" : "var(--node-skill)";
        const boxWidth = 92;
        const boxHeight = 30;

        element
          .append("rect")
          .attr("width", boxWidth)
          .attr("height", boxHeight)
          .attr("x", -boxWidth / 2)
          .attr("y", -boxHeight / 2)
          .attr("rx", 15)
          .attr("ry", 15)
          .attr("fill", isGap ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.92)")
          .attr("stroke", color)
          .attr("stroke-width", 1.8)
          .attr("stroke-dasharray", isGap ? "5,3" : "none");

        element
          .append("text")
          .text(getNodeLabel(data))
          .attr("dy", 4)
          .attr("text-anchor", "middle")
          .attr("fill", isGap ? "var(--accent-danger)" : "var(--text-primary)")
          .attr("font-size", "11px");
      }
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    const zoom = d3
      .zoom()
      .scaleExtent([0.35, 3])
      .on("zoom", (event) => {
        gContainer.attr("transform", event.transform);
      });

    svg.call(zoom);

    function dragstarted(event, data) {
      if (!event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      data.fx = data.x;
      data.fy = data.y;
    }

    function dragged(event, data) {
      data.fx = event.x;
      data.fy = event.y;
    }

    function dragended(event, data) {
      if (!event.active) {
        simulation.alphaTarget(0);
      }
      data.fx = null;
      data.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [nodesData, edgesData, gapFilter, setSelectedNode, language]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
}
