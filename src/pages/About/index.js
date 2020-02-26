import React from 'react';
import { connect } from 'react-redux';
import styles from './About.module.css';
import PropTypes from 'prop-types';
import { makeAssetURL } from 'utility';
class About extends React.Component {
  fileListing = (filename, size) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ minWidth: '30rem' }}>
          <a href={makeAssetURL(`data/hansard/${filename}`)}>{filename}</a>
        </div>
        <div>{size}</div>
      </div>
    );
  };

  render() {
    return (
      <div className={styles.content}>
        <div>
          <div className={styles.title}>About</div>
        </div>

        <div>
          <a href="https://docs.democracylab.io/docs/welcome.html">
            documention
          </a>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  reduxState: PropTypes.object
};

export default connect(reduxState => {
  return {
    reduxState
  };
})(About);
