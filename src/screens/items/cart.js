import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/items/cartItem";
import View from "../../components/view/view";
import { useCart } from "../../util/hooks/useCart";

export default function Cart() {
	const cartContext = useCart();
	const { state, calculateCartTotal, calculateNumItemsInCart } = cartContext;

	const renderCart = () => {
		if (state.cart.length === 0) {
			return <h1>Your cart is empty.</h1>;
		} else {
			return state.cart.map((item, index) => (
				<CartItem key={index} item={item} />
			));
		}
	};

	return (
		<View title="Shopping Cart" class="container">
			<div className="flex flex-col my-24 lg:justify-between lg:flex-row">
				<div className="flex flex-col w-full p-4 rounded shadow-lg lg:w-7/12">
					<h2 className="my-4 text-xl font-bold">
						{state.cart.length && calculateNumItemsInCart()} Items
					</h2>
					{state.cart && renderCart()}
				</div>

				<div className="flex-col w-full px-4 py-6 my-6 rounded shadow-lg lg:my-0 lg:w-1/3">
					<h2 className="my-8 text-xl font-bold">Total</h2>
					<div className="flex justify-between my-4">
						<span>Subotal</span>
						<span>${state.cart.length ? calculateCartTotal() : null}.00</span>
					</div>
					<div className="flex justify-between pb-8 my-4 border-b border-gray-500">
						<span>Shipping</span>
						<span className="font-extrabold">FREE</span>
					</div>
					<Link
						to="/checkout"
						className="w-full px-3 py-2 mx-auto text-white bg-blue-500 border-2 border-blue-300 rounded hover:bg-blue-600 hover:border-white"
					>
						Checkout
					</Link>
				</div>
			</div>
		</View>
	);
}
