import React from "react";
import View from "../view/view";

export default function ConfirmationModal(props) {
	const { item } = props;

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
					<h1 className="font-bold text-center text-red-500">
						{props.message}
					</h1>
					<span className="flex items-center justify-center">
						<button
							className="px-3 py-1 mx-2 bg-red-300 rounded"
							onClick={props.closeModal}
						>
							Cancel
						</button>
						<button
							className="px-3 py-1 mx-2 bg-red-500 rounded"
							onClick={() => props.action(item.id, -1)}
						>
							Delete
						</button>
					</span>
				</span>
			</div>
		</View>
	);
}
