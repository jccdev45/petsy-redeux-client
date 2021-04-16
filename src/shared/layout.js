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

	const closeModal = () => {
		toggleIsModal(!isModal)
	}

	return (
		<View class="flex flex-col w-screen min-h-screen">
			<Header
				isModal={isModal}
				toggleIsModal={closeModal}
				isBurger={isBurger}
				toggleIsBurger={toggleIsBurger}
			/>
			<main
				className="flex flex-col justify-center flex-grow w-11/12 pt-24 mx-auto md:pt-32 md:w-5/6"
				onClick={() => closeTheThings()}
			>
				{children}
			</main>
			<Footer />
		</View>
	);
}
