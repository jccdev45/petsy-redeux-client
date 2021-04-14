import React from "react";
import { MdRemove, MdAdd, MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import View from "../../components/view/view";

export default function Cart() {
	return (
		<View title="Shopping Cart" class="container">
			{/* extricate to dynamic cart function */}
			<div className="flex flex-col my-24 lg:justify-between lg:flex-row">
				<div className="flex flex-col w-full p-4 rounded shadow-lg lg:w-7/12">
					<h2 className="my-4 text-xl font-bold">Cart (_ items)</h2>

					{/* CART ITEM */}
					<div className="flex flex-col lg:flex-row">
						<img
							src="https://via.placeholder.com/100"
							alt=""
							className="w-full rounded shadow lg:w-1/3"
						/>

						<div className="flex flex-col justify-between px-4 lg:w-2/3">
							<div className="flex items-center justify-between">
								<h3 className="text-xl font-bold">Item Name</h3>
								<div className="flex items-center text-2xl">
									<MdRemove />
									<span className="mx-2 text-3xl">1</span>
									<MdAdd />
								</div>
							</div>
							<div className="flex justify-between w-full mt-8 lg:m-0">
								<button className="flex items-center">
									<MdRemoveShoppingCart className="text-3xl" />
									Remove
								</button>
								<span className="text-xl font-bold">$_.__</span>
							</div>
						</div>
					</div>
					{/* END CART ITEM */}
				</div>

				<div className="flex-col w-full px-4 py-6 my-6 rounded shadow-lg lg:my-0 lg:w-1/3">
					<h2 className="my-8 text-xl font-bold">Total</h2>
					<div className="flex justify-between my-4">
						<span>Subotal</span>
						<span>$_.__</span>
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
