import React from "react";
import Doggy from "../../assets/img/undraw_good_doggy_4wfq.svg";

export default function Hero() {
	return (
		<div className="flex flex-col items-center justify-between w-full p-8 bg-red-100 rounded-lg md:flex-row">
			<div className="flex flex-col justify-between w-full min-h-full md:w-1/2">
				<h3 className="w-full text-4xl md:text-6xl">Petsy</h3>
				<h4 className="w-full text-2xl">
					One stop for all your pet needs.
				</h4>
				<form className="flex flex-col items-end w-full my-8 md:items-center md:flex-row">
					<input type="search" className="w-full px-4 py-2 bg-white rounded" placeholder="Search food, toys, etc" />
					<button className="px-4 py-2 my-2 text-white bg-red-400 border-white rounded md:mx-4">
						Search
					</button>
				</form>
			</div>
			<img src={Doggy} alt="" className="w-full md:w-1/2" />
		</div>
	);
}
