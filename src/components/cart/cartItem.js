import React from "react";
import { MdRemove, MdAdd, MdRemoveShoppingCart } from "react-icons/md";
import ConfirmationModal from "../modal/confirmationModal";
import { useToggle } from "../../util/hooks/useToggle";
import { useCart } from "../../util/hooks/useCart";
import { Link } from "react-router-dom";

export default function CartItem(props) {
	const { item } = props;
	const cartContext = useCart();
	const { updateCart, removeFromCart } = cartContext;

	const [isOpen, setIsOpen] = useToggle();

	// const verifyDelete = () => {

	// }

	const verifyLastItem = (item, name) => {
		if (item.quantity === 1) {
			setIsOpen();
		} else {
			name(item.id, -1);
			return;
		}
	};

	const renderModal = () => {
		if (isOpen) {
			return (
				<ConfirmationModal
					item={item}
					closeModal={setIsOpen}
					message="Are you sure you want to remove this item from your cart?"
					action={removeFromCart}
				/>
			);
		}
	};

	return (
		<article
			key={item.id}
			className="flex flex-col my-4 md:justify-between md:flex-row"
		>
			<img
				src={item.image1}
				alt={item.name}
				className="w-full rounded shadow md:w-1/3"
			/>

			{isOpen ? renderModal() : null}
			<div className="flex flex-col justify-between px-4 md:w-2/3">
				<div className="flex items-center justify-between">
					<div className="flex flex-col items-center">
						<Link
							className="text-xl font-bold text-red-400 underline hover:text-red-500"
							to={`/items/${item.id}`}
						>
							{item.name}
						</Link>
						<span>(${item.price}.00)</span>
					</div>
					<div className="flex items-center text-2xl">
						<button
							onClick={() => verifyLastItem(item, updateCart)}
							className="p-1 transition-colors duration-200 ease-in-out border border-black rounded-full hover:bg-gray-200"
						>
							<MdRemove />
						</button>
						<span className="mx-2 text-3xl">{item.quantity}</span>
						<button
							onClick={() => updateCart(item.id, 1)}
							className="p-1 transition-colors duration-200 ease-in-out border border-black rounded-full hover:bg-gray-200"
						>
							<MdAdd />
						</button>
					</div>
				</div>
				<div className="flex justify-between w-full mt-8 lg:m-0">
					<button className="flex items-center" onClick={() => setIsOpen()}>
						<MdRemoveShoppingCart className="text-3xl" />
						Remove
					</button>
					<span className="text-xl font-bold">{`$ ${
						item.price * item.quantity
					}.00`}</span>
				</div>
			</div>
		</article>
	);
}
