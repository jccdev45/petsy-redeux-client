import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import View from "../components/view/view";
import Sidebar from "../components/sidebar";

export default function Layout({ children }) {
	const [isSidebar, toggleIsSidebar] = useState(false);
	const [isBurger, toggleIsBurger] = useState(false);
	const [isModal, toggleIsModal] = useState(false);

	const closeTheThings = () => {
		toggleIsSidebar(false);
		toggleIsModal(false);
		toggleIsBurger(false);
	};

	const toggleSidebar = () => {
		toggleIsSidebar(!isSidebar);
	};

	return (
		<View class="flex flex-col w-screen min-h-screen">
			<Header
				isModal={isModal}
				toggleIsModal={toggleIsModal}
				isBurger={isBurger}
				toggleIsBurger={toggleIsBurger}
			/>
			<main className="flex flex-grow">
				<Sidebar
					isSidebar={isSidebar}
					toggleSidebar={toggleSidebar}
					closeTheThings={closeTheThings}
				/>
				<section
					onClick={() => closeTheThings()}
					className="flex flex-col justify-center w-full pt-24 ml-auto md:w-5/6"
				>
					{children}
				</section>
			</main>
			<Footer />
		</View>
	);
}
