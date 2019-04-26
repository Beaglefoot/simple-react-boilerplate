import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { container, icon } from './App.scss';
import reactIcon from 'assets/react-icon.svg';

function App(props) {
  return (
    <div className={container}>
      <h1>Simple React Boilerplate</h1>
      <div className={icon} dangerouslySetInnerHTML={{ __html: reactIcon }} />
      <p>{props.msg}</p>
    </div>
  );
}

App.propTypes = {
  msg: PropTypes.string.isRequired
};

function mapStateToProps({ msg }) {
  return { msg };
}

export default connect(mapStateToProps)(App);
