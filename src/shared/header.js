import React from "react";
import { Link } from "react-router-dom";
import {
	FcImport,
	FcExport,
	FcGoodDecision,
	FcInfo,
	FcList,
} from "react-icons/fc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth } from "../util/hooks/useAuth";

const LINK_CONTAINER_CLASSLIST =
	"flex items-center justify-end mx-4 text-lg border-b border-red-400 w-1/3 md:w-full md:first:ml-0 md:last:mr-0";
const LINK_CLASSLIST =
	"w-full p-2 mx-auto flex items-center justify-end md:justify-between text-lg";
const ICON_CLASSLIST = "text-xl md:text-2xl";

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
				} md:flex md:items-center md:justify-between justify-end w-full md:w-auto`}
			>
				{user ? (
					<>
						<div className="flex flex-col items-end w-full md:items-center md:flex-row">
							<div className={LINK_CONTAINER_CLASSLIST}>
								<Link
									className={LINK_CLASSLIST}
									to="/items"
									onClick={() => toggleIsBurger(!isBurger)}
								>
									Items
									<FcList className={ICON_CLASSLIST} />
								</Link>
							</div>

							<div className={LINK_CONTAINER_CLASSLIST}>
								<Link
									className={LINK_CLASSLIST}
									to={`/users/${user.id}`}
									onClick={() => toggleIsBurger(!isBurger)}
								>
									Profile
									<FcInfo className={ICON_CLASSLIST} />
								</Link>
							</div>

							<div className={LINK_CONTAINER_CLASSLIST}>
								<Link
									className={LINK_CLASSLIST}
									to="/cart"
									onClick={() => toggleIsBurger(!isBurger)}
								>
									<AiOutlineShoppingCart
										className={ICON_CLASSLIST}
										style={{ color: `rgb(0, 109, 255)` }}
									/>
								</Link>
							</div>
						</div>

						<div className="flex flex-col items-end w-full ml-8 md:items-center md:flex-row">
							<div className="flex items-center justify-end w-1/3 border-b border-red-400 md:w-full">
								<button className={LINK_CLASSLIST} onClick={toggleIsModal}>
									Logout
									<FcImport className={ICON_CLASSLIST} />
								</button>
							</div>
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
										className="px-2 py-3 bg-red-200 rounded focus:outline-none hover:bg-red-300"
										onClick={toggleIsModal}
									>
										Cancel
									</button>
									<Link
										className="flex items-center px-2 py-3 mx-6 text-white bg-red-400 rounded hover:bg-red-500"
										// className={LINK_CLASSLIST}
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
							<FcExport className={ICON_CLASSLIST} />
							Login
						</Link>
						<Link
							className={LINK_CLASSLIST}
							to="/register"
							onClick={() => toggleIsBurger(!isBurger)}
						>
							<FcGoodDecision className={ICON_CLASSLIST} />
							Register
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}
