import React from "react";
import PropTypes from "prop-types";

function View(props) {
  return (
    <div className={props.class} style={props.viewStyle}>
      {props.title && <h1>{props.title}</h1>}
      {props.children}
    </div>
  );
}

View.propTypes = {
  children: PropTypes.node.isRequired,
  class: PropTypes.string,
  viewStyle: PropTypes.object,
  title: PropTypes.string,
};

export default View;
