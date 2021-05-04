import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemForm } from "../../components/form";
import { DATA_ACTIONS } from "../../util/constants";
import { useFetchData } from "../../util/hooks";

let Filter = require("bad-words");
let filter = new Filter();

export function ItemEdit() {
	const data = useFetchData();
	const {
		items,
		name,
		category,
		description,
		price,
		image1,
		image2,
		image3,
	} = data.state;

	const formData = {
		name,
		category,
		description,
		price,
		image1,
		image2,
		image3,
	};
	const [isProfane, setIsProfane] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		const doTheThing = () => {
			const anItem = items.find((item) => item.id === Number(id));
			data.dispatch({
				type: DATA_ACTIONS.SET_ITEM,
				payload: {
					name: anItem.name,
					category: anItem.category,
					description: anItem.description,
					price: anItem.price,
					image1: anItem.image1,
					image2: anItem.image2,
					image3: anItem.image3,
				},
			});
		};

		if (items) {
			doTheThing();
		}
	}, []);

	const handleChange = (e) => {
		const { name, type, value } = e.target;

		if (filter.isProfane(value)) {
			setIsProfane(true);
		} else {
			setIsProfane(false);
			data.dispatch({
				type: DATA_ACTIONS.INPUT,
				fieldName: name,
				payload: { value: type === "number" ? parseInt(value, 10) : value },
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isProfane) {
			return alert("Watch your profamity!");
		} else {
			return (
				data.updateItem(id, formData),
				data.dispatch({ type: DATA_ACTIONS.RESET })
			);
		}
	};

	return (
		<ItemForm
			type="Edit"
			isProfane={isProfane}
			formData={formData}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	);
}
