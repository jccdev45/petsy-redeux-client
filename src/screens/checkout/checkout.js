import React from "react";
import CartTotal from "../../components/cart/cartTotal";
import CheckoutForm from "../../components/form/checkoutForm";
import View from "../../components/view/view";

export default function Checkout() {
	return (
		<View title="Checkout" class="container">
			<div className="flex flex-col my-24 lg:justify-between lg:flex-row">
				{/* <h2 className="my-4 text-xl font-bold">
					{state.cart.length && calculateNumItemsInCart()} Items
				</h2>
				{state.cart && renderCart()} */}
				<CheckoutForm />

				<section className="flex-col w-full px-4 py-6 my-6 rounded shadow-lg lg:my-0 lg:w-1/3">
					<CartTotal />
				</section>
			</div>
		</View>
	);
}
