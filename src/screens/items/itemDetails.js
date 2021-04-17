import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { MdAddShoppingCart } from "react-icons/md";
import Loader from "../../components/loader/loader";
import View from "../../components/view/view";
import { getItemById } from "../../util/items/itemMethods";
import { useAuth } from "../../util/hooks/useAuth";
import { useFetchData } from "../../util/hooks/useFetchData";
import { useCart } from "../../util/hooks/useCart";
import ConfirmationModal from "../../components/modal/confirmationModal";
import { Link } from "react-router-dom";
import { useToggle } from "../../util/hooks/useToggle";

const BUTTON_BASE_CLASSLIST =
	"text-white bg-red-400 rounded-lg shadow hover:bg-red-500 text-white bg-red-400 border border-white rounded-lg shadow hover:bg-red-500";

export default function ItemDetails() {
	const auth = useAuth().state;
	const { user } = auth;

	const data = useFetchData();

	const [item, setItem] = useState();
	const [error, setError] = useState("");

	const [isLoading, setIsLoading] = useToggle(true);
	const [isOpen, setIsOpen] = useToggle();

	const { id } = useParams();

	const cart = useCart();
	const { addToCart } = cart;

	useEffect(() => {
		const cancelToken = axios.CancelToken.source();

		const getDetails = async () => {
			await getItemById(id)
				.then((res) => setItem(res), setIsLoading(false))
				.catch((e) => {
					if (axios.isCancel(e)) return;
					setError(e);
				});
		};
		getDetails();
		return () => {
			cancelToken.cancel();
		};
	}, [id]);

	const itemDetailRender = () => (
		<summary className="flex flex-col w-full p-4 rounded-lg lg:flex-row">
			<img
				src={item.image1}
				alt={item.name}
				className="w-full h-full lg:w-1/2"
			/>
			<div className="flex flex-col items-center justify-around w-full p-6 shadow lg:w-2/3">
				<div className="flex flex-col items-center">
					<h1 className="my-2 text-2xl">{item.name}</h1>
					<h2 className="my-2">
						<span className="text-green-400">$</span>
						{item.price}.00
					</h2>
					<h2 className="my-1 text-xl">
						<span className="text-red-400">Category: </span>
						{item.category}
					</h2>
					<p>{item.description}</p>
				</div>
				<button
					className={`${BUTTON_BASE_CLASSLIST} px-3 py-2 m-4`}
					onClick={() => addToCart(item)}
				>
					Add to Cart
					<MdAddShoppingCart className="mx-auto text-xl" />
				</button>
				{user && user.id === item.user_id ? renderEditDelete() : null}
			</div>
		</summary>
	);

	const renderEditDelete = () => (
		<div className="flex">
			<Link
				className={`${BUTTON_BASE_CLASSLIST} px-2 py-1 mx-2`}
				to={`/items/${item.id}/edit`}
			>
				Edit
			</Link>
			<button
				className={`${BUTTON_BASE_CLASSLIST} px-2 py-1 mx-2`}
				onClick={() => setIsOpen()}
			>
				Delete
			</button>
			{isOpen ? renderModal() : null}
		</div>
	);

	const renderModal = () => {
		if (isOpen) {
			return (
				<ConfirmationModal
					item={item}
					message="Are you sure you want to delete this item? This action cannot be undone."
					action={data.deletion}
				/>
			);
		}
	};

	return (
		<View class="flex flex-col items-center justify-center w-full mx-auto md:w-5/6">
			{isLoading && <Loader />}
			{item && itemDetailRender()}
			{error && <h1>refresh</h1>}
		</View>
	);
}
