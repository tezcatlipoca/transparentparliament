import React from 'react';
import PropTypes from 'prop-types';
import D3Tree from './d3tree';
import styles from './Tree.module.css';

export default class Tree extends React.Component {
  state = { url: null };

  onRender = ({ blob }) => {
    this.setState({ url: URL.createObjectURL(blob) });
  };

  constructor(props) {
    super(props);
    this.config = {
      ...this.props.config,
      backgroundColor: this.props.backgroundColor,
      onNodeClick: this.props.onNodeClick,
      onLinkClick: this.props.onLinkClick,
      styles
    };
  }

  componentDidMount() {
    this._chart = D3Tree.create(this._rootNode, this.props.data, this.config);
  }

  componentDidUpdate() {
    D3Tree.update(this._rootNode, this.props.data, this.config, this._chart);
  }

  componentWillUnmount() {
    D3Tree.destroy(this._rootNode);
  }

  _setRef(componentNode) {
    this._rootNode = componentNode;
  }

  render() {
    return (
      <div
        id="visualization"
        style={{
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : 'transparent'
        }}
        className={styles.container}
        ref={this._setRef.bind(this)}
      />
    );
  }

  shouldComponentUpdate() {
    return !this.props.disableRender;
  }

  static defaultProps = {
    disableRender: false
  };

  static propTypes = {
    disableRender: PropTypes.bool,
    backgroundColor: PropTypes.string,
    onLinkClick: PropTypes.func,
    onNodeClick: PropTypes.func,
    data: PropTypes.array.isRequired,
    config: PropTypes.object
  };
}
