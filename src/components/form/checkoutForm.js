import React from "react";

const LABEL_CLASSLIST =
	"flex flex-col md:flex-row w-5/6 md:w-1/2 items-center justify-between my-2 border-b border-red-200 py-2 relative";
const INPUT_CLASSLIST = "rounded p-2 shadow-inner w-full md:w-3/4";

export default function CheckoutForm() {
	return (
		<form
			// onSubmit={handleSubmit}
			className="flex flex-col items-center w-5/6 p-4 mx-auto my-2 md:w-11/12"
		>
			<label htmlFor="firstName" className={LABEL_CLASSLIST}>
				First Name
				<input type="text" className={LABEL_CLASSLIST} />
			</label>
			<label htmlFor="lastName" className={LABEL_CLASSLIST}>
				Last Name
				<input type="text" className={INPUT_CLASSLIST} />
			</label>
			<label htmlFor="address" className={LABEL_CLASSLIST}>
				Address
				<input type="text" className={INPUT_CLASSLIST} />
			</label>
			<label htmlFor="apt" className={LABEL_CLASSLIST}>
				Apt, suite, etc. (optional)
				<input type="text" className={INPUT_CLASSLIST} />
			</label>
			<label htmlFor="city" className={LABEL_CLASSLIST}>
				City
				<input type="text" className={INPUT_CLASSLIST} />
			</label>
			<label htmlFor="country" className={LABEL_CLASSLIST}>
				Country
				<input type="text" className={INPUT_CLASSLIST} />
			</label>
			<label htmlFor="state" className={LABEL_CLASSLIST}>
				State
				<input type="text" className={INPUT_CLASSLIST} />
			</label>
			<label htmlFor="zip" className={LABEL_CLASSLIST}>
				Zip Code
				<input type="text" className={INPUT_CLASSLIST} />
			</label>
			<label htmlFor="phone" className={LABEL_CLASSLIST}>
				Phone
				<input type="text" className={INPUT_CLASSLIST} />
			</label>
		</form>
	);
}
