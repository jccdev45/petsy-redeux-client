import React from "react";
import { FcRating } from "react-icons/fc";
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

	const featuredItem = () => {
		const randomItem = items[Math.floor(Math.random() * items.length)];

		const renderStars = () => {
			let ratings = [];
			let i = 1;
			while (i <= randomItem.rating) {
				i++;
				ratings.push(<FcRating key={i} />);
			}
			return <div className="flex items-center">{ratings}</div>;
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
		<View class="flex flex-col items-center justify-center pt-24 md:w-5/6 mx-auto">
			<Hero />
			{isLoading && <Loader />}
			<View title="New Items" class="flex flex-col w-full">
				<div className="flex w-full">{newItems()}</div>
			</View>
			<View title="Featured Item" class="w-full flex flex-col my-8">
				<div className="flex items-center justify-end w-full p-8 bg-red-100 rounded-lg">
					{featuredItem()}
				</div>
			</View>
			{error && <h1>do a refresh</h1>}
		</View>
	);
}
