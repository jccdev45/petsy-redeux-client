import React from "react";
import { MdRemove, MdAdd, MdRemoveShoppingCart } from "react-icons/md";
import { ConfirmationModal } from "../modal";
import { useToggle, useCart } from "../../util/hooks";
import { Link } from "react-router-dom";
import { Button } from "../button";

export function CartItem(props) {
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
			className="flex flex-col py-4 md:justify-between md:flex-row"
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
							className="text-lg font-bold text-secondary-dark md:text-xl hover:underline"
							to={`/items/${item.id}`}
						>
							{item.name}
						</Link>
						<span>(Price per: ${item.price}.00)</span>
					</div>
					<div className="flex items-center text-lg md:text-2xl">
						<Button
							handleClick={() => verifyLastItem(item, updateCart)}
							extraClass="bg-primary-light hover:bg-secondary-light p-1"
						>
							<MdRemove />
						</Button>
						<span className="mx-2 text-xl md:text-3xl">{item.quantity}</span>
						<Button
							handleClick={() => updateCart(item.id, 1)}
							extraClass="bg-primary-light hover:bg-secondary-light p-1"
						>
							<MdAdd />
						</Button>
					</div>
				</div>
				<div className="flex justify-between w-full mt-8 lg:m-0">
					<Button
						extraClass="bg-primary-light hover:bg-secondary-light flex items-center p-2"
						handleClick={() => setIsOpen()}
					>
						<MdRemoveShoppingCart className="text-3xl" />
						Remove
					</Button>
					<span className="text-xl font-bold">{`$ ${
						item.price * item.quantity
					}.00`}</span>
				</div>
			</div>
		</article>
	);
}
