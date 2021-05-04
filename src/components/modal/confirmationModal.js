import React from "react";
import { Button } from "../button";
import { View } from "../view";

export function ConfirmationModal(props) {
	const { item } = props;

	function confirmAndCloseModal() {
		props.action(item.id, -1);
		props.closeModal();
	}

	return (
		<View
			class="fixed top-0 left-0 w-screen h-screen z-40 overflow-hidden"
			viewStyle={{
				backgroundColor: `rgba(0, 0, 0, 0.5)`,
				display: `grid`,
				placeItems: `center`,
			}}
		>
			<div className="z-50 w-2/3 px-4 py-8 bg-white rounded shadow md:p-12 md:w-1/3">
				<span className="flex flex-col justify-between">
					<h1 className="font-bold text-center text-secondary-dark">
						{props.message}
					</h1>
					<span className="flex items-center justify-center">
						<Button extraClass="px-3 py-1 mx-2" handleClick={props.closeModal}>
							Cancel
						</Button>
						<Button
							extraClass="px-3 py-1 mx-2"
							handleClick={() => confirmAndCloseModal()}
						>
							Delete
						</Button>
					</span>
				</span>
			</div>
		</View>
	);
}
