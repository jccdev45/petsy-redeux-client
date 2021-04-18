import React from "react";
import Item from "../../components/items/item";
import View from "../../components/view/view";
import { useFetchData } from "../../util/hooks/useFetchData";

export default function Items() {
	const data = useFetchData();
	const { items } = data.state;

	const showData = () => {
		return items.map((item) => (
			<Item key={item.id} item={item} deletion={data.deletion} />
		));
	};

	return (
		<View title="Items" class="flex flex-col items-center">
			<div className="grid grid-cols-1 lg:grid-cols-2">{items && showData()}</div>
		</View>
	);
}
