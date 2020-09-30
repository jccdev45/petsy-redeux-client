import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ user, logout, children }) {
  const [isOpen, toggleIsOpen] = useState(false);

  const closeModal = () => {
    toggleIsOpen(!isOpen);
  };

  const handleLogout = () => {
    toggleIsOpen(!isOpen);
    logout();
  };

  return (
    <>
      <Header
        user={user}
        logout={logout}
        isOpen={isOpen}
        closeModal={closeModal}
        handleLogout={handleLogout}
      />
      <main className="flex flex-col flex-grow md:p-4">{children}</main>
      <Footer />
    </>
  );
}
