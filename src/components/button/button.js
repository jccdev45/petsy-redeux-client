import React from "react";

const BUTTON_BASE_CLASSLIST =
	"rounded-lg bg-secondary border border-white shadow transition-colors duration-200 ease-in-out hover:bg-secondary-light";

export default function Button({ handleClick, extraClass, children }) {
	return (
		<button
			className={`${BUTTON_BASE_CLASSLIST} ${extraClass}`}
			onClick={handleClick}
		>
			{children}
		</button>
	);
}
