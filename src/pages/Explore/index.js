import React from 'react';
import Tree from 'components/D3/Tree';
import Exportable from 'components/Exportable';
import facets from 'data/facets.json';
import memoizeOne from 'memoize-one';
import styles from './Explore.module.css';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNode: { data: facets[0], breadcrumbs: [facets[0].name] }
    };
    this.m_onNodeChange = memoizeOne(node => {
      if (node) {
        this.props.history.push(this.breadcrumbsToUrl(node.breadcrumbs));
      }
    });
  }
  render() {
    console.log(this.state.currentNode);
    this.m_onNodeChange(this.state.currentNode);
    return (
      <div className={styles.content}>
        {this.state.currentNode && (
          <div>
            <div
              className={styles.breadcrumbs}
              style={{ color: this.state.currentNode.data.linkColor }}
            >
              {this.state.currentNode.breadcrumbs.join(' >> ')}
            </div>
            <div className={styles.title}>
              {this.state.currentNode.data.name}
            </div>
          </div>
        )}
        <div style={{ margin: '5rem, 0,0,0' }}>
          <Exportable fileName="facetsOfParliamentarySpeech" data={facets}>
            <Tree
              disableRender={true}
              backgroundColor={'#FFFFFF55'}
              onLinkClick={link => {
                console.log(link);
              }}
              onNodeClick={node => {
                this.setState({ currentNode: node });
              }}
              data={facets}
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
    let parsedPath = breadcrumbs
      .join('/')
      .replace(/ /g, '_')
      .toLowerCase();
    return `/explore/#/${parsedPath}`;
  };
}