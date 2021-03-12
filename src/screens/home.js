import React from "react";
import {
	FcRating,
	FcShipped,
	FcMoneyTransfer,
	FcOnlineSupport,
	FcGlobe,
} from "react-icons/fc";
import { Link } from "react-router-dom";
import Hero from "../components/hero/hero";
import Item from "../components/items/item";
import Loader from "../components/loader/loader";
import View from "../components/view/view";
import { useFetchData } from "../util/hooks/useFetchData";

export default function Home() {
	const data = useFetchData();
	const { items, isLoading, error } = data.state;

	const newItems = () => {
		const slicedItems = items
			.slice(0, 4)
			.map((item) => <Item item={item} key={item.id} />);
		return slicedItems;
	};

	const renderFeaturedItem = () => {
		const randomItem = items[Math.floor(Math.random() * items.length)];

		const renderStars = () => {
			let ratings = [];
			let i = 1;
			while (i <= randomItem.rating) {
				i++;
				ratings.push(<FcRating key={i} />);
			}
			return <div className="flex items-center text-3xl">{ratings}</div>;
		};

		return (
			randomItem && (
				<div className="flex justify-evenly">
					<div className="flex flex-col justify-around w-1/2 min-h-full">
						<span>
							<Link
								to={`/items/${randomItem.id}`}
								className="text-xl text-red-300 underline bold hover:text-red-400"
							>
								{randomItem.name}
							</Link>
							{randomItem.rating ? renderStars() : <span>No Ratings Yet</span>}
						</span>
						<p className="text-lg">{randomItem.description}</p>
					</div>
					<img
						src={randomItem.image1}
						alt={randomItem.description}
						className="w-64 h-64"
					/>
				</div>
			)
		);
	};

	return (
		<View class="flex flex-col items-center justify-center mx-auto">
			<Hero />
			{isLoading && <Loader />}

			{/* Featured Item */}
			<View title="Featured Item" class="w-full flex flex-col my-8">
				<div className="flex items-center justify-end w-full p-8 bg-red-100 rounded-lg">
					{renderFeaturedItem()}
				</div>
			</View>

			{/* Site Info */}
			<View class="bg-red-200 rounded-lg p-8 flex justify-evenly my-8 w-full">
				<div className="flex flex-col items-center py-8 border-r border-red-400">
					<div className="flex flex-col items-center justify-center w-24 h-24 bg-red-100 rounded-full">
						<FcMoneyTransfer className="text-5xl" />
					</div>
					<h2 className="my-4 text-2xl">Payment Plans</h2>
					<p className="px-8 text-justify">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae,
						inventore cupiditate magni ipsum ex blanditiis ea eveniet minus
						mollitia, esse rem unde sed. Cum, laboriosam. Veniam, repudiandae.
						Reprehenderit, reiciendis enim.
					</p>
				</div>
				<div className="flex flex-col items-center py-8">
					<div className="flex flex-col items-center justify-center w-24 h-24 bg-red-100 rounded-full">
						<FcOnlineSupport className="text-5xl" />
					</div>
					<h2 className="my-4 text-2xl">24/7 Support</h2>
					<p className="px-8 text-justify">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae,
						inventore cupiditate magni ipsum ex blanditiis ea eveniet minus
						mollitia, esse rem unde sed. Cum, laboriosam. Veniam, repudiandae.
						Reprehenderit, reiciendis enim.
					</p>
				</div>
				<div className="flex flex-col items-center py-8 border-l border-red-400">
					<div className="flex flex-col items-center justify-center w-24 h-24 bg-red-100 rounded-full">
						<FcGlobe className="text-5xl" />
					</div>
					<h2 className="my-4 text-2xl">Worldwide Shipping</h2>
					<p className="px-8 text-justify">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae,
						inventore cupiditate magni ipsum ex blanditiis ea eveniet minus
						mollitia, esse rem unde sed. Cum, laboriosam. Veniam, repudiandae.
						Reprehenderit, reiciendis enim.
					</p>
				</div>
			</View>

			{/* New Items */}
			<View title="New Items" class="flex flex-col w-full my-8">
				<div className="flex w-full">{newItems()}</div>
			</View>

			{error && <h1>do a refresh</h1>}
		</View>
	);
}
