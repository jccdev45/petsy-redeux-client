import React from "react";
import Item from "../../components/items/item";
import View from "../../components/view/view";
import { DATA_ACTIONS } from "../../util/constants/constants";
import { useFetchData } from "../../util/hooks/useFetchData";

export default function Search() {
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
		return filteredItems.map((item) => <Item key={item.id} item={item} />);
	};

	return (
		<View title="Search Results" class="flex w-full flex-col h-full">
			<div className="flex flex-col justify-between h-full p-8 rounded shadow">
				<form
					action=""
					onSubmit={handleSubmit}
					className="flex items-center justify-between w-full"
				>
					<input
						type="search"
						value={searchQuery}
						name="searchQuery"
						placeholder={"Search" || searchQuery}
						onChange={handleChange}
						className="w-3/4 px-3 py-2 rounded rounded-tr-none rounded-br-none shadow"
					/>
					<button className="w-1/4 px-3 py-2 bg-red-400 rounded rounded-tl-none rounded-bl-none shadow">
						Search
					</button>
				</form>
				<div className="h-full">{filteredItems && renderItems()}</div>
			</div>
		</View>
	);
}
