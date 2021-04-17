import React, { useState } from "react";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modal/confirmationModal";

export default function Item({ item, user, deletion }) {
	const [isOpen, toggleIsOpen] = useState(false);

	const openModal = () => {
		toggleIsOpen(!isOpen);
	};

	const renderModal = () => {
		if (isOpen) {
			return (
				<ConfirmationModal
					item={item}
					message="Are you sure you want to delete this item? <br /> This action cannot be undone."
					openModal={openModal}
					action={deletion}
				/>
			);
		}
	};

	const renderStars = () => {
		let ratings = [];
		let i = 1;
		while (i <= item.rating) {
			i++;
			ratings.push(<FcRating key={i} />);
		}
		return <div className="flex items-center">{ratings}</div>;
	};

	const renderEditDelete = () => (
		<div className="flex items-center justify-evenly">
			<Link
				className="px-4 py-1 bg-red-300 rounded"
				to={`/items/${item.id}/edit`}
			>
				Edit
			</Link>
			<button className="px-3 py-1 bg-red-300 rounded" onClick={openModal}>
				Delete
			</button>
			{isOpen ? renderModal() : null}
		</div>
	);

	if (!item) return null;
	return (
		<article className="flex flex-col w-11/12 p-2 my-4 bg-red-100 rounded-lg shadow-lg md:my-4 md:mx-3 md:w-1/3 lg:w-1/4 lg:first:ml-0 lg:last:mr-0">
			<img
				src={item.image1}
				alt={item.name}
				className="object-cover min-w-full min-h-full"
			/>

			<div className="flex flex-col items-center justify-between py-6">
				<Link
					to={`/items/${item.id}`}
					className="text-red-500 underline hover:text-red-600"
				>
					{item.name}
				</Link>

				<div className="flex flex-col items-center justify-between">
					{item.rating ? renderStars() : <span>No Ratings Yet</span>}

					<div className="flex items-center mt-4">
						<span className="text-green-500">$</span>
						<span className="mx-1 text-lg bold">{item.price}.00</span>
					</div>
				</div>
			</div>

			{user && user.id === item.user_id ? renderEditDelete() : null}
		</article>
	);
}
