import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { useFetchData } from "../../util/hooks";

const LABEL_CLASSLIST =
	"flex flex-col w-11/12 md:w-2/3 lg:w-1/2 mb-2 py-2 border-b border-primary-light relative";
const INPUT_CLASSLIST = "rounded shadow-inner w-11/12 mx-auto";

export function ItemForm({
	formData,
	handleChange,
	handleSubmit,
	isProfane,
	type,
}) {
	const data = useFetchData();
	const { items } = data.state;
	const [cats, setCats] = useState([]);

	useEffect(() => {
		if (!items) return;

		const catSet = () => {
			setCats(items.map((cat) => cat.category));
		};

		catSet();
	}, [items]);

	const renderCatOptions = () => {
		const uniqueCats = [...new Set(cats)];
		uniqueCats.unshift("Choose a category...");

		return uniqueCats.map((cat) => (
			<option key={cat} value={cat}>
				{cat}
			</option>
		));
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center w-full p-2 mx-auto my-2 shadow-lg lg:w-5/6"
		>
			<div className="flex justify-center w-12 h-12">
				<h1
					className={`${
						isProfane
							? `bg-primary-dark`
							: `hover:underline text-secondary-dark`
					} px-16 py-2 text-xl text-white rounded uppercase`}
				>
					{isProfane ? "Watch your profamity" : type}
				</h1>
			</div>
			<label htmlFor="name" className={LABEL_CLASSLIST}>
				<small className="absolute top-0 px-1 text-sm bg-white left-6 lg:left-8">
					Name
				</small>
				<input
					className={`${INPUT_CLASSLIST} form-input`}
					type="text"
					name="name"
					placeholder="Rubber Ball"
					onChange={handleChange}
					defaultValue={formData.name}
				/>
			</label>
			<label htmlFor="description" className={LABEL_CLASSLIST}>
				<small className="absolute top-0 px-1 text-sm bg-white left-6 lg:left-8">
					Description
				</small>
				<textarea
					className={`${INPUT_CLASSLIST} form-textarea`}
					rows="3"
					name="description"
					placeholder="A ball made of rubber. Bouncy!"
					onChange={handleChange}
					defaultValue={formData.description}
				/>
			</label>
			<label htmlFor="category" className={LABEL_CLASSLIST}>
				<small className="absolute top-0 px-1 text-sm bg-white left-6 lg:left-8">
					Category
				</small>
				<select
					name="category"
					className={`${INPUT_CLASSLIST} form-select`}
					onChange={handleChange}
				>
					{items && renderCatOptions()}
				</select>
			</label>
			<label htmlFor="price" className={LABEL_CLASSLIST}>
				<small className="absolute top-0 px-1 text-sm bg-white left-6 lg:left-8">
					Price
				</small>
				<input
					className={`${INPUT_CLASSLIST} form-input`}
					type="number"
					name="price"
					min={0}
					onChange={handleChange}
					defaultValue={"0" || formData.price}
					step="1"
					onKeyPress={(e) => {
						return e.charCode >= 48 && e.charCode <= 57;
					}}
				/>
			</label>
			<label htmlFor="image1" className={LABEL_CLASSLIST}>
				<small className="absolute top-0 px-1 text-sm bg-white left-6 lg:left-8">
					Image 1
				</small>
				<input
					className={`${INPUT_CLASSLIST} form-input`}
					type="text"
					name="image1"
					onChange={handleChange}
					defaultValue={formData.image1}
				/>
			</label>
			<label htmlFor="image2" className={LABEL_CLASSLIST}>
				<small className="absolute top-0 px-1 text-sm bg-white left-6 lg:left-8">
					Image 2
				</small>
				<input
					className={`${INPUT_CLASSLIST} form-input`}
					type="text"
					name="image2"
					onChange={handleChange}
					defaultValue={formData.image2}
				/>
			</label>
			<label htmlFor="image3" className={LABEL_CLASSLIST}>
				<small className="absolute top-0 px-1 text-sm bg-white left-6 lg:left-8">
					Image 3
				</small>
				<input
					className={`${INPUT_CLASSLIST} form-input`}
					type="text"
					name="image3"
					onChange={handleChange}
					defaultValue={formData.image3}
				/>
			</label>
			<Button extraClass="px-3 py-2 bg-primary-light hover:bg-secondary-light">
				Submit
			</Button>
		</form>
	);
}
