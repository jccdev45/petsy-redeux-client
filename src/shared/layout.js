import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-grow md:p-4">{children}</main>
      <Footer />
    </>
  );
}
