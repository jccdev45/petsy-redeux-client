import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../../components/hero";
import { Loader } from "../../components/loader";
import { View } from "../../components/view";
import { LS_STRINGS } from "../../util/constants";
import { useAuth, useFetchData } from "../../util/hooks";

export function Profile() {
	const auth = useAuth();
	const { user, isLoggedIn } = auth.state;
	const userLS = JSON.parse(localStorage.getItem(LS_STRINGS.LS_USER));

	const data = useFetchData();
	const { userItems, isLoading, error } = data.state;

	useEffect(() => {
		data.fetchUserItems(userLS.id);
	}, []);

	const renderUserItems = () => (
		<div className="flex flex-col justify-start w-full px-3 py-2 shadow-inner">
			<h1 className="text-2xl">Your items:</h1>
			<div className="grid w-full grid-cols-1 py-2 md:grid-cols-2 md:gap-4">
				{isLoading ? <Loader /> : renderData()}
			</div>
		</div>
	);

	const renderData = () => {
		return (
			userItems.length &&
			userItems.map((item) => (
				<article key={item.id} className="h-full my-1 focus:outline-none">
					<h1 className="p-3 rounded bg-primary-light">
						<Link
							to={`/items/${item.id}`}
							className="w-full px-2 py-1 mx-auto text-center text-secondary-dark hover:underline md:w-2/3"
						>
							{item.name}
						</Link>
					</h1>
				</article>
			))
		);
	};

	return (
		<View class="flex flex-col w-full">
			{error && <h1>There was an error, please refresh</h1>}
			{user && <Hero user={user} isLoggedIn={isLoggedIn} profile />}
			{user && renderUserItems()}
		</View>
	);
}
