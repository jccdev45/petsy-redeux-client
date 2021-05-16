import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../util/hooks";

export function CartTotal() {
	const cartContext = useCart();
	const { state, calculateCartTotal } = cartContext;

	return (
		<>
			<h2 className="my-8 text-xl font-bold">Total</h2>
			<div className="flex justify-between my-2">
				<span>Subtotal</span>
				<span className="text-xl">
					${state.cart.length ? calculateCartTotal().subtotal : null}
				</span>
			</div>
			<div className="flex justify-between my-2">
				<span>Tax</span>
				<span className="text-xl">
					$
					{state.cart.length ? calculateCartTotal().taxAmount.toFixed(2) : null}
				</span>
			</div>
			<div className="flex justify-between pb-4 my-2 border-b border-gray-500">
				<span>Shipping</span>
				<span className="text-xl font-extrabold">FREE</span>
			</div>
			<div className="flex justify-between my-4">
				<span>Total</span>
				<span className="text-xl">
					${state.cart.length ? calculateCartTotal().total : null}
				</span>
			</div>

			<Link
				to="/checkout"
				className="w-full px-3 py-2 mx-auto transition-colors duration-200 ease-in-out rounded bg-secondary-light hover:bg-secondary"
			>
				Checkout
			</Link>
		</>
	);
}
