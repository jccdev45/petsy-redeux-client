import React from "react";
import { Link } from "react-router-dom";
import {
	FcSignature,
	FcAddressBook,
	FcKey,
	FcPicture,
	FcLock,
} from "react-icons/fc";
import { Button } from "../button";

export function SignInUpForm(props) {
	const LABEL_CLASSLIST = `w-full md:w-2/3 lg:w-1/3 px-4 py-2 mx-auto border rounded my-3 flex items-center ${
		props.isVerified ? "bg-red-500" : ""
	}`;
	const INPUT_CLASSLIST = "focus:outline-none w-full";
	const EMOJI_CLASSLIST = "mr-2 -ml-2 bg-gray-200 rounded px-1 text-4xl";

	return (
		<form
			onSubmit={props.handleSubmit}
			className="flex flex-col items-center justify-center w-3/4 p-4 mx-auto my-10 rounded shadow-lg md:p-10 md:w-full"
		>
			<label htmlFor="username" className={LABEL_CLASSLIST}>
				<FcSignature className={EMOJI_CLASSLIST} />
				<input
					type="text"
					name="username"
					value={props.username}
					placeholder="Username"
					onChange={props.handleChange}
					className={INPUT_CLASSLIST}
				/>
			</label>
			<label htmlFor="password" className={LABEL_CLASSLIST}>
				<FcKey className={EMOJI_CLASSLIST} />
				<input
					type="password"
					name="password"
					value={props.password}
					placeholder="Password"
					onChange={props.handleChange}
					className={INPUT_CLASSLIST}
				/>
			</label>
			{props.type === "Register" ? (
				<>
					<label htmlFor="confirmPassword" className={LABEL_CLASSLIST}>
						<FcLock className={EMOJI_CLASSLIST} />
						<input
							type="password"
							name="confirmPassword"
							value={props.confirmPassword}
							placeholder="Confirm Password"
							onChange={props.handleChange}
							className={INPUT_CLASSLIST}
						/>
					</label>
					<label htmlFor="email" className={LABEL_CLASSLIST}>
						<FcAddressBook className={EMOJI_CLASSLIST} />
						<input
							type="email"
							name="email"
							value={props.email}
							placeholder="Email"
							onChange={props.handleChange}
							className={INPUT_CLASSLIST}
						/>
					</label>
					<label htmlFor="picture" className={LABEL_CLASSLIST}>
						<FcPicture className={EMOJI_CLASSLIST} />
						<input
							type="picture"
							name="picture"
							value={props.picture}
							placeholder="Picture"
							onChange={props.handleChange}
							className={INPUT_CLASSLIST}
						/>
					</label>
				</>
			) : null}
			<Button extraClass="px-4 py-2 bg-primary-light hover:bg-secondary-light transition-colors duration-200 ease-in-out">
				{props.type}
			</Button>
			{props.type === "Register" ? (
				<span className="flex flex-col items-center my-4">
					Already have an account? <br />
					<Link
						className="text-primary-dark hover:underline"
						to="/login"
					>
						Login
					</Link>
				</span>
			) : (
				<span className="flex flex-col items-center my-4">
					Need an account? <br />
					<Link
						className="text-primary-dark hover:underline"
						to="/register"
					>
						Register
					</Link>
				</span>
			)}
		</form>
	);
}
