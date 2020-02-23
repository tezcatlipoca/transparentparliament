import * as d3 from 'd3';
import { zoom } from 'd3-zoom';
import { hierarchy, tree } from 'd3-hierarchy';

const D3Tree = {
  create: (root, data, config) => {
    return D3Tree._draw(root, data, config);
  },

  update: (root, data, config) => {
    d3.select(root)
      .selectAll('*')
      .remove();
    return D3Tree._draw(root, data, config);
  },

  destroy: () => {},
  _draw: (root, data, config) => {
    let margin = { top: 20, right: 120, bottom: 20, left: 120 };
    let width = 800 - margin.right - margin.left;
    let height = 500 - margin.top - margin.bottom;

    let i = 0;

    let diagonal = function link(d) {
      return `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${
        d.source.x
      } ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${
        d.target.x
      }`;
    };
    let size = {
      width: width + margin.right + margin.left,
      height: height + margin.top + margin.bottom
    };
    let svg = d3
      .select(root)
      .append('svg')
      .attr('viewBox', `0 0 ${size.width} ${size.height}`)
      .attr('width', size.width)
      .attr('height', size.height)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.select(root).call(
      zoom()
        .scaleExtent([1, 5])
        .on('zoom', () => {
          svg.attr('transform', d3.event.transform);
        })
    );

    // Compute the new tree layout.
    let myTree = tree().size([height, width]);
    var myHierarchy = hierarchy(data[0]);
    var links = myTree(myHierarchy).links();
    const nodes = myHierarchy.descendants();
    // Normalize for fixed-depth.
    nodes.forEach(node => {
      node.y = node.depth * 180;
    });

    // Declare the nodes…
    let node = svg.selectAll('g.node').data(nodes, d => {
      return d.id || (d.id = ++i);
    });

    // Enter the nodes.
    let nodeEnter = node
      .enter()
      .append('g')
      .attr('class', config.styles.node)
      .attr('transform', d => {
        return 'translate(' + d.y + ',' + d.x + ')';
      })
      .on('click', d => {
        const path = hierarchy(data[0]).path(d);
        let breadcrumbs = [];
        path.forEach((node, idx) => {
          if (node && idx > 0) breadcrumbs.push(node.data.name);
        });
        config.onNodeClick({ data: d.data, breadcrumbs, desc: d.description });
      });

    nodeEnter
      .append('circle')
      .attr('r', d => {
        return d.data.size;
      })
      .style('stroke', d => {
        return d.data.strokeColor;
      })
      .style('fill', d => {
        return d.data.fillColor ? d.data.fillColor : 'white';
      });

    nodeEnter
      .append('text')
      .attr('x', d => {
        return d.children || d._children
          ? (d.data.size + 4) * -1
          : d.data.size + 4;
      })
      .attr('dy', '.35em')
      .attr('text-anchor', d => {
        return d.children || d._children ? 'end' : 'start';
      })
      .text(d => {
        return d.data.name;
      })
      .style('fill-opacity', 1, 'fill', d => {
        return d.data.fillColor ? d.data.fillColor : 'black';
      });

    // Declare the links…
    var link = svg.selectAll('path.link').data(links, d => {
      return d.target.id;
    });

    // Enter the links.
    link
      .enter()
      .insert('path', 'g')
      .attr('class', config.styles.link)
      .style('stroke', d => {
        return d.target.data.linkColor;
      })
      .attr('d', diagonal)
      .on('click', d => {
        config.onLinkClick(d);
      });
  }
};

export default D3Tree;
