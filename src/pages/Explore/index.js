import React from 'react';
import Tree from 'components/D3/Tree';
import Exportable from 'components/Exportable';
import styles from './Explore.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Explore extends React.Component {
  state = { currentNode: null };
  componentDidMount = () => this.setNodeFromURL();
  componentDidUpdate = () => this.setNodeFromURL();

  render() {
    if (!this.state.currentNode) return null;
    return (
      <div className={styles.content}>
        {this.state.currentNode && (
          <div>
            <div
              className={styles.breadcrumbs}
              style={{ color: this.state.currentNode.data.linkColor }}
            >
              {this.state.currentNode.breadcrumbs
                .join(` >> `)
                .replace(/_/g, ' ')}
            </div>
            <div className={styles.title}>
              {this.state.currentNode.data.name}
            </div>
          </div>
        )}
        <div style={{ margin: '5rem, 0,0,0' }}>
          <Exportable
            fileName="facetsOfParliamentarySpeech"
            data={this.props.reduxState.data.facets}
          >
            <Tree
              disableRender={true}
              backgroundColor={'#FFFFFF55'}
              onLinkClick={link => {
                console.log(link);
              }}
              onNodeClick={node => {
                this.props.history.push(
                  this.breadcrumbsToUrl(node.breadcrumbs)
                );
              }}
              data={this.props.reduxState.data.facets}
            />
          </Exportable>
        </div>
        <div
          className={styles.copy}
          dangerouslySetInnerHTML={this.state.currentNode.data.content}
        />
      </div>
    );
  }

  breadcrumbsToUrl = breadcrumbs => {
    if (!breadcrumbs) return;
    let parsedPath = breadcrumbs
      .join('/')
      .replace(/ /g, '_')
      .toLowerCase();
    return `/explore/${parsedPath}`;
  };

  setNodeFromURL = () => {
    const parsedURL = window.location.href.split('explore/')[1];
    this.findNodeByPath(
      parsedURL && parsedURL.length > 0
        ? parsedURL
        : this.props.reduxState.data.facets[0].name
            .replace(/ /g, '_')
            .toLowerCase(),
      null,
      (node, path) => {
        if (this.state.currentNode?.data.name !== node.name) {
          this.setState({
            currentNode: { data: node, breadcrumbs: path.split('/') }
          });
        }
      }
    );
  };

  findNodeByPath = (path, parentNode, cb, depth = 0) => {
    if (!path) return;
    let parsedPath = path.split('/');
    let node;
    if (!parentNode) {
      parentNode = this.props.reduxState.data.facets.find(
        facet =>
          facet.name.replace(/ /g, '_').toLowerCase() === parsedPath[depth]
      );
      node = parentNode;
    } else {
      node = parentNode.children.find(
        facet =>
          facet.name.replace(/ /g, '_').toLowerCase() === parsedPath[depth]
      );
    }
    const nextInPath = depth + 1;
    if (nextInPath < parsedPath.length && parsedPath[nextInPath].length > 0) {
      this.findNodeByPath(path, node, cb, nextInPath);
    } else {
      if (typeof cb === 'function') cb(node, path);
    }
  };
}

Explore.propTypes = {
  reduxState: PropTypes.object,
  history: PropTypes.object
};

export default connect(reduxState => {
  return {
    reduxState
  };
})(Explore);
