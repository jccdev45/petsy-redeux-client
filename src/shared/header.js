import React from "react";
import { Link } from "react-router-dom";
import {
  FcPlus,
  FcImport,
  FcExport,
  FcGoodDecision,
  FcInfo,
} from "react-icons/fc";

const LINK_CLASSLIST = "mx-3 border-b border-red-400 flex items-center text-lg";

export default function Header({ user, isOpen, closeModal, handleLogout }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-red-200">
      <Link to="/" className="text-2xl border-b border-red-300">
        <span className="font-bold text-red-300">P</span>etsy
      </Link>
      <nav>
        <ul className="flex items-center">
          {user ? (
            <>
              <li className="flex items-center mx-2 text-lg">
                <FcPlus className="mx-1" />
                <Link to="/items/new">Add Item</Link>
              </li>
              <li className="flex items-center mx-2 text-lg">
                <FcInfo className="mx-1" />{" "}
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </li>
              <li className="flex items-center ml-8 mr-2 text-lg border-b border-red-400">
                <FcImport className="mr-2" />
                <button onClick={closeModal}>Logout</button>
              </li>
              <div
                style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
                className={`${
                  isOpen ? `block` : `hidden`
                } w-screen h-screen fixed top-0 left-0 z-20`}
              >
                <div className="z-30 flex flex-col items-center justify-around w-3/4 h-64 mx-auto my-20 bg-white rounded md:w-1/3">
                  <span>Are you sure you want to logout?</span>
                  <div className="flex items-center">
                    <button onClick={closeModal}>Cancel</button>
                    <Link
                      className="flex items-center px-2 py-3 mx-6 text-white bg-red-300 rounded"
                      to="/"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link className={LINK_CLASSLIST} to="/login">
                <FcExport className="mx-1 text-2xl" />
                Login
              </Link>
              <Link className={LINK_CLASSLIST} to="/register">
                <FcGoodDecision className="mx-1 text-2xl" />
                Register
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
