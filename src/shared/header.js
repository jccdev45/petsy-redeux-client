import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	FcSearch,
	FcImport,
	FcExport,
	FcInfo,
	FcList,
	FcPrevious,
} from "react-icons/fc";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../util/hooks/useAuth";
import { useCart } from "../util/hooks/useCart";
import { useFetchData } from "../util/hooks/useFetchData";
import { DATA_ACTIONS } from "../util/constants/constants";

const LINK_CONTAINER_CLASSLIST = "flex items-center justify-start text-lg";
const LINK_CLASSLIST = "p-2 flex items-center text-lg";
const ICON_CLASSLIST = "text-xl md:text-2xl lg:text-3xl";

export default function Header({
	isModal,
	toggleIsModal,
	isMenu,
	toggleIsMenu,
}) {
	const auth = useAuth();
	const { user } = auth.state;

	const cart = useCart();
	const { state, calculateNumItemsInCart } = cart;

	const data = useFetchData();
	const { dispatch, searchItems } = data;
	const { searchQuery } = data.state;

	const [isSearch, toggleIsSearch] = useState(false);

	const history = useHistory();

	const handleLogout = () => {
		toggleIsModal(!isModal);
		auth.logout();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		dispatch({
			type: DATA_ACTIONS.INPUT,
			fieldName: name,
			payload: { value },
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		toggleIsSearch(false);
		await searchItems(searchQuery);
		history.push("/search");
	};

	return (
		<header className="fixed top-0 z-30 flex flex-wrap items-center justify-between w-full px-6 py-4 bg-red-200 md:px-20">
			<Link to="/" className="w-1/12 text-2xl border-b border-red-300">
				<span className="font-bold text-red-300">P</span>etsy
			</Link>

			<div className="flex items-center w-5/6">
				<div className="flex justify-end w-full mx-4">
					<button onClick={() => toggleIsSearch(!isSearch)}>
						<FcSearch className={ICON_CLASSLIST} />
					</button>
				</div>

				<button
					onClick={() => toggleIsMenu(!isMenu)}
					className="w-10 h-10 rounded-full"
				>
					{user ? (
						<img src={user.picture} alt="" className="w-full rounded-full" />
					) : (
						<FaRegUserCircle className="w-10 h-10 text-red-300" />
					)}
				</button>
			</div>

			<div
				style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
				className={`${
					isSearch ? "flex" : "hidden"
				} w-screen h-screen fixed top-0 left-0 z-40`}
			>
				<div className="flex items-center justify-between w-full h-16 px-2 py-4 bg-gray-200">
					<button onClick={() => toggleIsSearch(false)} className="w-1/12">
						<FcPrevious className={`${ICON_CLASSLIST} mx-auto`} />
					</button>
					<form
						action=""
						onSubmit={handleSubmit}
						className="flex items-center w-11/12 h-full mx-auto lg:w-7/12"
					>
						<input
							type="search"
							className="w-11/12 p-2 rounded"
							placeholder="Search Petsy..."
							value={searchQuery}
							name="searchQuery"
							onChange={handleChange}
						/>
						<button className="w-1/12">
							<FcSearch className={`${ICON_CLASSLIST} mx-auto`} />
						</button>
					</form>
				</div>
			</div>

			<nav
				className={`${
					isMenu ? `flex` : `hidden`
				} fixed w-screen min-h-screen p-4 top-0 right-0 bg-red-100 flex-col lg:items-end lg:w-1/4`}
			>
				<button
					onClick={() => toggleIsMenu(!isMenu)}
					className="w-1/12 ml-auto"
				>
					<AiOutlineClose className={`${ICON_CLASSLIST} mx-auto`} />
				</button>
				{user ? (
					// AUTH'D
					<>
						<div className="flex flex-col items-start w-full">
							{/* PROFILE */}
							<Link
								className={`${LINK_CLASSLIST} border-b border-gray-400 w-full`}
								to={`/users/${user.id}`}
								onClick={() => toggleIsMenu(!isMenu)}
							>
								{/* <FcInfo className={ICON_CLASSLIST} /> */}
								<img
									src={user.picture}
									alt=""
									className="w-12 h-12 rounded-full"
								/>
								{isMenu ? <span className="mx-2">{user.username}</span> : null}
							</Link>

							{/* ITEMS */}
							<div className={LINK_CONTAINER_CLASSLIST}>
								<Link
									className={LINK_CLASSLIST}
									to="/items"
									onClick={() => toggleIsMenu(!isMenu)}
								>
									<FcList className={ICON_CLASSLIST} />
									{isMenu ? <span className="mx-2">Items</span> : null}
								</Link>
							</div>

							{/* LOGOUT */}
							<div className={LINK_CONTAINER_CLASSLIST}>
								<button className={LINK_CLASSLIST} onClick={toggleIsModal}>
									<FcExport className={ICON_CLASSLIST} />
									{isMenu ? <span className="mx-2">Logout</span> : null}
								</button>
							</div>
						</div>

						{/* MODAL */}
						<div
							style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
							className={`${
								isModal ? `block` : `hidden`
							} w-screen h-screen fixed top-0 left-0 z-40`}
						>
							<div className="z-50 flex flex-col items-center justify-around w-3/4 h-64 mx-auto my-20 bg-white rounded md:w-2/3">
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
					// NON-AUTH'D
					<>
						{/* CART */}
						<Link
							className={`${LINK_CLASSLIST} relative`}
							to="/cart"
							onClick={() => toggleIsMenu(!isMenu)}
						>
							<AiOutlineShoppingCart
								className={ICON_CLASSLIST}
								style={{ color: `rgb(0, 109, 255)` }}
							/>
							<span className="absolute top-0 right-0 z-10 px-2 py-0 -mt-2 text-sm font-bold text-red-500 bg-gray-200 bg-opacity-75 rounded-full lg:text-xl">
								{state.cart.length ? calculateNumItemsInCart() : null}
							</span>
						</Link>

						<Link
							className={LINK_CLASSLIST}
							to="/login"
							onClick={() => toggleIsMenu(!isMenu)}
						>
							<FcImport className={ICON_CLASSLIST} />
							Sign In/Up
						</Link>
					</>
				)}
			</nav>
		</header>
	);
}
