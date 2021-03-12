import React from "react";
import PropTypes from "prop-types";

function View(props) {
  return (
    <div className={props.class} style={props.viewStyle}>
      {props.title && <h1 className="w-3/12 my-4 text-2xl border-b border-red-300">{props.title}</h1>}
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
