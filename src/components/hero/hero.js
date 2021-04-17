import React from "react";

export default function Hero({ img, title, subtitle, home }) {
	return (
		<div className="flex flex-col items-center justify-between w-full p-8 bg-red-100 border-2 border-red-200 rounded-lg shadow md:flex-row">
			<div className="flex flex-col justify-between w-full min-h-full md:w-1/2">
				<h3 className="w-full text-4xl md:text-6xl">{title}</h3>
				{subtitle && <h4 className="w-full text-2xl">{subtitle}</h4>}
				{home && (
					<form className="flex flex-col items-end w-full my-8 md:items-center md:flex-row">
						<input
							type="search"
							className="w-full px-4 py-2 bg-white rounded"
							placeholder="Search food, toys, etc"
						/>
						<button className="px-4 py-2 my-2 text-white bg-red-400 border-white rounded md:mx-4">
							Search
						</button>
					</form>
				)}
			</div>
			<img src={img} alt={title} className="w-full md:w-1/2" />
		</div>
	);
}
