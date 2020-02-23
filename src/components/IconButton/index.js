import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './IconButton.module.css';

class IconButton extends Component {
  render() {
    let useStyles = this.props.styles === null ? styles : this.props.styles;
    return (
      <div
        title={this.props.tooltip}
        style={this.props.style}
        {...this.props.dataset}
        data-meta={JSON.stringify(this.props.metaData)}
        onClick={this.onClick}
        className={[
          'fas',
          `fa-${this.props.icon}`,
          this.props.isBorderless
            ? useStyles.buttonBorderless
            : useStyles.button,
          this.props.isDisabled ? useStyles.disabled : '',
          this.props.alternate ? useStyles.alternate : ''
        ].join(' ')}
      />
    );
  }

  onClick = e => {
    if (!this.props.isDisabled && typeof this.props.onClick === 'function') {
      e.stopPropagation();
      this.props.onClick(e);
    }
  };
}
export default IconButton;

IconButton.defaultProps = {
  isBorderless: false,
  isDisabled: false,
  id: null,
  alternate: false,
  styles: null,
  style: null
};

IconButton.propTypes = {
  tooltip: PropTypes.string,
  metaData: PropTypes.object,
  styles: PropTypes.object,
  style: PropTypes.object,
  isBorderless: PropTypes.bool,
  isDisabled: PropTypes.bool,
  dataset: PropTypes.object,
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  id: PropTypes.number,
  alternate: PropTypes.bool
};
