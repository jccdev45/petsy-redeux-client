import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
	return (
		<footer className="flex flex-col items-center justify-between py-4 bg-primary-light md:px-24 md:py-8 md:flex-row">
			<div className="flex flex-col">
				<h2 className="text-2xl">Legal</h2>
				<Link className="text-secondary-dark hover:underline " to="/terms">
					Terms & Conditions
				</Link>
				<Link
					className="text-secondary-dark hover:underline "
					to="/privacy"
				>
					Privacy Policy
				</Link>
			</div>
			<div className="my-4 italic">
				&copy; Copyright(ish) {new Date().getFullYear()}
			</div>
			{/* <span className="my-2 text-center">
        Created & designed by:
        <a
          href="http://www.jccdev.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="block uppercase text-secondary hover:underline"
        >
          Jordan Cruz-Correa
        </a>
      </span>
      <div className="italic">
        &copy; Copyright (jk) {new Date().getFullYear()}
      </div> */}
		</footer>
	);
}
