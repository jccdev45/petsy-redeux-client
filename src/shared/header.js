import React from "react";
import { Link } from "react-router-dom";
import {
	FcPlus,
	FcImport,
	FcExport,
	FcGoodDecision,
	FcInfo,
} from "react-icons/fc";
import { useAuth } from "../util/hooks/useAuth";

const LINK_CLASSLIST = "mx-3 border-b border-red-400 flex items-center text-lg";

export default function Header({
	isModal,
	toggleIsModal,
	isBurger,
	toggleIsBurger,
}) {
	const auth = useAuth();
	const { user } = auth.state;

	const handleLogout = () => {
		toggleIsModal(!isModal);
		auth.logout();
	};

	return (
		<header className="fixed top-0 z-30 flex flex-wrap items-center justify-between w-full px-6 py-4 bg-red-200">
			<Link to="/" className="text-2xl border-b border-red-300">
				<span className="font-bold text-red-300">P</span>etsy
			</Link>

			<button
				className="flex items-center px-3 py-2 border border-red-300 rounded active:bg-transparent focus:outline-none md:hidden"
				onClick={() => toggleIsBurger(!isBurger)}
			>
				<svg
					className="w-3 h-3 fill-current"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
				</svg>
			</button>

			<nav
				className={`${
					isBurger ? `block` : `hidden`
				} md:flex md:items-center w-full md:w-auto`}
			>
				{user ? (
					<>
						<div className="flex items-center justify-end my-2 text-lg md:mx-2">
							<Link to="/items/new" onClick={() => toggleIsBurger(!isBurger)}>
								Add Item
							</Link>
							<FcPlus className="mx-1 text-xl" />
						</div>
						<div className="flex items-center justify-end my-2 text-lg md:mx-2">
							<Link
								to={`/users/${user.id}`}
								onClick={() => toggleIsBurger(!isBurger)}
							>
								{user.username}
							</Link>
							<FcInfo className="mx-1 text-xl" />
						</div>
						<div className="flex items-center justify-end my-2 text-lg border-b border-red-400 md:mr-2 md:ml-8">
							<button onClick={toggleIsModal}>Logout</button>
							<FcImport className="mx-1 text-xl" />
						</div>
						<div
							style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
							className={`${
								isModal ? `block` : `hidden`
							} w-screen h-screen fixed top-0 left-0 z-40`}
						>
							<div className="z-50 flex flex-col items-center justify-around w-3/4 h-64 mx-auto my-20 bg-white rounded md:w-1/3">
								<span className="font-bold">
									Are you sure you want to logout?
								</span>
								<div className="flex items-center">
									<button
										className="focus:outline-none hover:border-b-2 hover:border-red-300"
										onClick={toggleIsModal}
									>
										Cancel
									</button>
									<Link
										className="flex items-center px-2 py-3 mx-6 text-white bg-red-300 rounded hover:bg-red-400"
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
						<Link
							className={LINK_CLASSLIST}
							to="/login"
							onClick={() => toggleIsBurger(!isBurger)}
						>
							<FcExport className="mx-1 text-2xl" />
							Login
						</Link>
						<Link
							className={LINK_CLASSLIST}
							to="/register"
							onClick={() => toggleIsBurger(!isBurger)}
						>
							<FcGoodDecision className="mx-1 text-2xl" />
							Register
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}
