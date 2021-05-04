import React from "react";
import { Button } from "../../components/button";
import { Item } from "../../components/items";
import { View } from "../../components/view";
import { DATA_ACTIONS } from "../../util/constants";
import { useFetchData } from "../../util/hooks";

export function Search() {
	const data = useFetchData();
	const { state, dispatch, searchItems } = data;
	const { filteredItems, searchQuery } = state;

	const handleChange = (e) => {
		const { name, value } = e.target;

		dispatch({
			type: DATA_ACTIONS.INPUT,
			fieldName: name,
			payload: {
				value,
			},
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await searchItems(searchQuery);
	};

	const renderItems = () => {
		return filteredItems.length == 0 ? (
			<h2 className="w-full mx-auto my-8 text-2xl bold">No results</h2>
		) : (
			filteredItems.map((item) => <Item key={item.id} item={item} />)
		);
	};

	return (
		<View
			title="Search Results"
			class="flex w-full flex-col h-full justify-between"
		>
			<div className="flex flex-col justify-between h-full p-8 rounded shadow">
				<form
					action=""
					onSubmit={handleSubmit}
					className="flex items-center w-full mx-auto lg:w-5/6"
				>
					<input
						type="search"
						value={searchQuery}
						name="searchQuery"
						placeholder={"Search" || searchQuery}
						onChange={handleChange}
						className="w-3/4 px-3 py-2 rounded rounded-tr-none rounded-br-none shadow md:w-11/12"
					/>
					<Button extraClass="w-1/4 px-3 py-2 rounded-tl-none rounded-bl-none md:w-1/6 lg:w-1/12">
						Search
					</Button>
				</form>
				<div className="h-full">{filteredItems && renderItems()}</div>
			</div>
		</View>
	);
}
