import React from "react";

export default function Footer() {
  return (
    <footer className="z-10 flex flex-col items-center justify-center p-2 mt-12">
      <span className="my-2 text-center">
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
      </div>
    </footer>
  );
}
