import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="z-10 flex items-center justify-between px-24 py-8 bg-red-200">
			<div className="flex flex-col">
				<h2 className="text-2xl">Legal</h2>
				<Link className="text-red-400 underline hover:text-red-500" to="/terms">
					Terms & Conditions
				</Link>
				<Link
					className="text-red-400 underline hover:text-red-500"
					to="/privacy"
				>
					Privacy Policy
				</Link>
			</div>
			<div className="italic">
				&copy; Copyright(ish) {new Date().getFullYear()}
			</div>
			{/* <span className="my-2 text-center">
        Created & designed by:
        <a
          href="http://www.jccdev.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-red-300 underline uppercase"
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
