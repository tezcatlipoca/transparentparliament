import React from 'react';
import styles from './Index.module.css';
import Navbar from 'components/Navbar';
import { connect } from 'react-redux';
import * as actions from 'state/actions';
import PropTypes from 'prop-types';

class Index extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.reduxState.data.info)
      this.props.dispatch(actions.getBasicStats({ map_id: 1 }));
  }

  render() {
    const info = this.props.reduxState.data.info;
    console.log(info);
    return (
      <React.Fragment>
        <Navbar></Navbar>

        <div className={styles.midline}>
          Transparent
          <br /> Parliament
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            Containing the latest and most authentic online dataset of the
            <h1>Parliamentary Proceedings of Great Britain</h1>
            {info && (
              <React.Fragment>
                {info.speakers.toLocaleString()} speakers
                <br />
                {info.constituencies.toLocaleString()} constituencies
                <br />
                From the dates {info.min_date}-{info.max_date}
              </React.Fragment>
            )}
            <hr />
            Gathered and compiled online for your scholarly edification by the
            <br /> Democracy Lab at Southern Methodist University
            <br />
            Dallas Texas, United States of America<br></br>
            In the year 2020
            <hr />
            <h2>
              Augmented With Visualizations
              <br /> and
              <br /> Expert Commentary
              <br />
            </h2>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  reduxState: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(reduxState => {
  return {
    reduxState
  };
})(Index);
