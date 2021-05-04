import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../util/hooks/useCart";

export default function CartTotal() {
	const cartContext = useCart();
	const { state, calculateCartTotal } = cartContext;

	return (
		<>
			<h2 className="my-8 text-xl font-bold">Total</h2>
			<div className="flex justify-between my-4">
				<span>Subotal</span>
				<span className="text-xl">
					${state.cart.length ? calculateCartTotal() : null}.00
				</span>
			</div>
			<div className="flex justify-between pb-8 my-4 border-b border-gray-500">
				<span>Shipping</span>
				<span className="text-xl font-extrabold">FREE</span>
			</div>
			<Link
				to="/checkout"
				className="w-full px-3 py-2 mx-auto rounded bg-secondary hover:bg-secondary-light"
			>
				Checkout
			</Link>
		</>
	);
}
