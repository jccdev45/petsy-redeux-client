import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="z-10 flex flex-col items-center justify-center p-2 mt-12 bg-white">
      <span className="my-2 text-center">
        Created & designed by:
        <Link
          to="http://www.jccdev.tech"
          target="_blank"
          className="block text-red-300 underline uppercase"
        >
          Jordan Cruz-Correa
        </Link>
      </span>
      <div className="italic">
        &copy; Copyright (jk) {new Date().getFullYear()}
      </div>
    </footer>
  );
}
