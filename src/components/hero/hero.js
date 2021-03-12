import React from "react";
import Doggy from "../../assets/img/undraw_good_doggy_4wfq.svg";

export default function Hero() {
	return (
		<div className="flex items-center justify-between w-full p-8 mb-8 bg-red-100 rounded-lg">
			<div className="flex flex-col justify-between w-1/2 h-full">
				<h3 className="w-full md:text-4xl">Petsy</h3>
				<h4 className="w-full md:text-2xl">
					One stop for all your pet needs
				</h4>
				<form className="flex items-center w-full my-8">
					<input type="search" className="w-full px-4 py-2 bg-white rounded" placeholder="Search food, toys, etc" />
					<button className="px-4 py-2 mx-4 text-white bg-red-400 border-white rounded">
						Search
					</button>
				</form>
			</div>
			<img src={Doggy} alt="" className="w-1/2" />
		</div>
	);
}
