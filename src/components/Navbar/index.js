import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  componentDidMount() {
    //  let navEl = document.getElementById('navbar');
    //navEl.classList.add(styles.fadein);
  }

  render() {
    return (
      <div id="navbar" className={styles.container}>
        <Link to="/">
          <span className="fas fa-home icon" /> home
        </Link>{' '}
        |
        <Link to="/explore">
          {' '}
          <span className="fas fa-map icon" /> explore
        </Link>{' '}
        |{' '}
        <Link to="/about">
          <span className="fas fa-info-circle icon" /> about
        </Link>{' '}
        |{' '}
        <Link to="/data">
          <span className="fas fa-save icon" /> data
        </Link>
      </div>
    );
  }
}
