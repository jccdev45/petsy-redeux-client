import React from "react";

const BUTTON_BASE_CLASSLIST =
	"rounded-lg transition-colors duration-200 ease-in-out";

export function Button({ handleClick, extraClass, children }) {
	return (
		<button
			className={`${BUTTON_BASE_CLASSLIST} ${extraClass}`}
			onClick={handleClick}
		>
			{children}
		</button>
	);
}
