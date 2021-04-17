import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Item from "../../components/items/item";
import Loader from "../../components/loader/loader";
import View from "../../components/view/view";
import { useAuth } from "../../util/hooks/useAuth";
import { useFetchData } from "../../util/hooks/useFetchData";

export default function ItemCategories() {
	const { category } = useParams();

	const data = useFetchData();

	useEffect(() => {
		data.fetchItemsByCategory(category);
	}, [category]);

	const { itemsByCat, isLoading, error } = data.state;

	const auth = useAuth().state;
	const { user } = auth;

	const showData = () => {
		return itemsByCat.map((item) => (
			<Item key={item.id} user={user} item={item} deletion={data.deletion} />
		));
	};

	return (
		<View
			title={category}
			class="flex flex-col items-center justify-start mx-auto h-full md:w-2/3"
		>
			<div className="flex flex-col items-center justify-center md:flex-row md:flex-wrap">
				{isLoading && <Loader size="xl" />}
				{itemsByCat && showData()}
				{error && <h1>refresh</h1>}
			</div>
		</View>
	);
}
