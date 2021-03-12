import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import View from "../components/view/view";

export default function Layout({ children }) {
	const [isBurger, toggleIsBurger] = useState(false);
	const [isModal, toggleIsModal] = useState(false);

	const closeTheThings = () => {
		toggleIsModal(false);
		toggleIsBurger(false);
	};

	return (
		<View class="flex flex-col w-screen min-h-screen">
			<Header
				isModal={isModal}
				toggleIsModal={toggleIsModal}
				isBurger={isBurger}
				toggleIsBurger={toggleIsBurger}
			/>
			<main
				className="flex flex-col justify-center flex-grow pt-24 mx-auto md:w-5/6"
				onClick={() => closeTheThings()}
			>
				{children}
			</main>
			<Footer />
		</View>
	);
}
