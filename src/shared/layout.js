import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import View from "../components/view/view";
import { useAuth } from "../util/hooks/useAuth";

export default function Layout({ children }) {
  const auth = useAuth()
  const { user } = auth.state

  const [isOpen, toggleIsOpen] = useState(false);

  const closeModal = () => {
    toggleIsOpen(!isOpen);
  };

  const handleLogout = () => {
    toggleIsOpen(!isOpen);
    auth.logout();
  };

  return (
    <View class="flex flex-col w-screen min-h-screen">
      <Header
        user={user}
        logout={auth.logout}
        isOpen={isOpen}
        closeModal={closeModal}
        handleLogout={handleLogout}
      />
      <main className="flex flex-col flex-grow pt-24">{children}</main>
      <Footer />
    </View>
  );
}
