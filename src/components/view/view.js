import React from "react";
import PropTypes from "prop-types";

const DEFAULT_TITLE_STYLE =
	"w-7/12 my-4 text-2xl border-b border-primary md:w-5/12";
export function View(props) {
	return (
		<div className={props.class} style={props.viewStyle}>
			{props.title && (
				<h1
					className={props.titleStyle ? props.titleStyle : DEFAULT_TITLE_STYLE}
				>
					{props.title}
				</h1>
			)}
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

