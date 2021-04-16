import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader";
import View from "../../components/view/view";
import { LS_STRINGS } from "../../util/constants/constants";
import { useAuth } from "../../util/hooks/useAuth";
import { useFetchData } from "../../util/hooks/useFetchData";

export default function Profile() {
	const auth = useAuth();
	const user = auth.state.user;
	const userLS = JSON.parse(localStorage.getItem(LS_STRINGS.LS_USER));

	const data = useFetchData();
	const { userItems, isLoading, error } = data.state;

	useEffect(() => {
		data.fetchUserItems(userLS.id);
	}, []);

	const renderUserItems = () => (
		<>
			<div className="flex flex-row items-center w-full m-4 md:w-1/3 lg:flex-col md:mr-4">
				<img
					src={user.picture ? user.picture : "https://via.placeholder.com/150"}
					alt="User"
					className="w-24 h-auto rounded-full md:w-64"
				/>
				<div className="flex flex-col mx-4">
					<h1 className="text-2xl">{user.username}</h1>
					<h2>
						Email:{" "}
						<a
							href={`mailto:${user.email}`}
							className="text-blue-400 underline"
						>
							{user.email}
						</a>
					</h2>
				</div>
			</div>

			<div className="flex flex-col justify-start w-full px-3 py-2 shadow-inner">
				<h1 className="text-2xl">Your items:</h1>
				<div className="grid w-full grid-cols-1 py-2 md:grid-cols-2 md:gap-4">
					{isLoading ? <Loader /> : renderData()}
				</div>
			</div>
		</>
	);

	const renderData = () => {
		return (
			userItems.length &&
			userItems.map((item) => (
				<article key={item.id} className="h-full my-1 focus:outline-none">
					<h1 className="p-3 bg-red-200 rounded">
						<Link
							to={`/items/${item.id}`}
							className="w-full px-2 py-1 mx-auto text-center text-red-400 underline hover:text-red-500 md:w-2/3"
						>
							{item.name}
						</Link>
					</h1>
				</article>
			))
		);
	};

	return (
		<View class="flex flex-col w-full lg:flex-row">
			{error && <h1>There was an error, please refresh</h1>}
			{user && renderUserItems()}
		</View>
	);
}
