import React from "react";
import { MdRemove, MdAdd, MdRemoveShoppingCart } from "react-icons/md";
import ConfirmationModal from "../modal/confirmationModal";
import { useToggle } from "../../util/hooks/useToggle";
import { useCart } from "../../util/hooks/useCart";

export default function CartItem(props) {
	const { item } = props;
	const cartContext = useCart();
	const { updateCart, removeFromCart } = cartContext;

	const [isOpen, setIsOpen] = useToggle();

	const verifyLastItem = (item) => {
		if (item.quantity > 1) {
			updateCart(item.id, -1);
			return;
		} else {
			setIsOpen();
		}
	};

	const renderModal = () => {
		if (isOpen) {
			return (
				<ConfirmationModal
					item={item}
					message="Are you sure you want to remove this item from your cart?"
				/>
			);
		}
	};

	return (
		<article key={item.id} className="flex flex-col my-4 lg:flex-row">
			<img
				src={item.image1}
				alt={item.name}
				className="w-full rounded shadow lg:w-1/3"
			/>

			{isOpen ? renderModal() : null}
			<div className="flex flex-col justify-between px-4 lg:w-2/3">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-bold">{item.name}</h3>
					<div className="flex items-center text-2xl">
						<button
							onClick={() => verifyLastItem(item)}
							className="p-1 border border-black rounded-full"
						>
							<MdRemove />
						</button>
						<span className="mx-2 text-3xl">{item.quantity}</span>
						<button
							onClick={() => updateCart(item.id, 1)}
							className="p-1 border border-black rounded-full"
						>
							<MdAdd />
						</button>
					</div>
				</div>
				<div className="flex justify-between w-full mt-8 lg:m-0">
					<button
						className="flex items-center"
						onClick={() => removeFromCart(item.id)}
					>
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
