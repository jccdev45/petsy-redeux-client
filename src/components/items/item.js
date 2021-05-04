import React from "react";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router-dom";
import ConfirmationModal from "../modal/confirmationModal";
import { useToggle } from "../../util/hooks/useToggle";
import { useCart } from "../../util/hooks/useCart";
import Button from "../button/button";
import { MdAddShoppingCart } from "react-icons/md";

const BUTTON_BASE_CLASSLIST =
	"text-secondary-dark rounded-lg hover:bg-secondary-light bg-primary border border-white shadow hover:bg-secondary";

export default function Item({ item, user, deletion }) {
	const cartContext = useCart();
	const { addToCart } = cartContext;

	const [isOpen, setIsOpen] = useToggle(false);

	const openModal = () => {
		setIsOpen(!isOpen);
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

	const verifyUserItem = () => {
		if (!user) return renderAddToCart();

		return user.id != item.user_id ? renderAddToCart() : renderEditDelete();
	};

	const renderEditDelete = () => (
		<div className="flex items-center justify-evenly">
			<Link
				className={`${BUTTON_BASE_CLASSLIST} my-4 px-4 py-1`}
				to={`/items/${item.id}/edit`}
			>
				Edit
			</Link>
			<Button
				extraClass="my-4 px-3 py-1"
				handleClick={openModal}
				text="Delete"
			/>
			{isOpen ? renderModal() : null}
		</div>
	);

	const renderAddToCart = () => (
		<Button
			extraClass="flex items-center px-3 py-2 text-center"
			handleClick={() => addToCart(item)}
		>
			Add to Cart
			<MdAddShoppingCart />
		</Button>
	);

	if (!item) return null;
	return (
		<article className="flex items-center w-11/12 mx-auto my-4 rounded-lg shadow-lg bg-primary-light">
			<img
				src={item.image1}
				alt={item.name}
				className="object-cover w-5/12 rounded-lg rounded-tr-none rounded-br-none md:w-5/12"
			/>

			<div className="flex flex-col items-center w-7/12 px-3 text-sm text-center md:py-3 justify-evenly md:text-xl md:w-7/12">
				<Link
					to={`/items/${item.id}`}
					className="text-secondary hover:underline "
				>
					{item.name}
				</Link>

				<div className="flex flex-col items-center justify-around h-full">
					{item.rating ? renderStars() : <span>No Ratings Yet</span>}

					<div className="flex items-center md:mt-4">
						<span className="text-green-500">$</span>
						<span className="mx-1 bold">{item.price}.00</span>
					</div>
				</div>

				{verifyUserItem()}
			</div>
		</article>
	);
}
