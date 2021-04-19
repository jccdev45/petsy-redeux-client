import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import View from "../components/view/view";

export default function Layout({ children }) {
	const [isMenu, toggleIsMenu] = useState(false);
	const [isModal, toggleIsModal] = useState(false);

	const closeTheThings = () => {
		toggleIsModal(false);
		toggleIsMenu(false);
	};

	const closeModal = () => {
		toggleIsModal(!isModal)
	}

	return (
		<View class="flex flex-col justify-between w-screen min-h-screen">
			<Header
				isModal={isModal}
				toggleIsModal={closeModal}
				isMenu={isMenu}
				toggleIsMenu={toggleIsMenu}
			/>
			<main
				className="flex flex-col justify-center flex-grow w-11/12 h-full pt-24 mx-auto md:pt-32 md:w-5/6"
				onClick={() => closeTheThings()}
			>
				{children}
			</main>
			<Footer />
		</View>
	);
}
