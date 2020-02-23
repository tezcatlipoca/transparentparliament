import React from 'react';
import styles from './Index.module.css';
import Navbar from 'components/Navbar';
export default class Index extends React.Component {
  render() {
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
            400 speakers
            <br />
            200 constituencies
            <br />
            From the dates 1888-1954
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
