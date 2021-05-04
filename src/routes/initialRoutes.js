import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Register } from "../screens/auth";
import { Home } from "../screens/home";
import { Profile } from "../screens/user";
import {
	ItemCreate,
	ItemDetails,
	ItemEdit,
	ItemCategories,
	Items,
	Search,
} from "../screens/items";
import { TermsConditions, PrivacyPolicy } from "../screens/legal";
import { Cart, Checkout } from "../screens/checkout";

function InitialRoutes() {
	return (
		<Switch>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/register">
				<Register />
			</Route>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/items">
				<Items />
			</Route>
			<Route exact path="/items/new">
				<ItemCreate />
			</Route>
			<Route exact path="/items/:id/edit">
				<ItemEdit />
			</Route>
			<Route exact path="/items/:id">
				<ItemDetails />
			</Route>
			<Route exact path="/items/for/:category">
				<ItemCategories />
			</Route>
			<Route path="/users/:id">
				<Profile />
			</Route>
			<Route path="/search">
				<Search />
			</Route>
			<Route path="/cart">
				<Cart />
			</Route>
			<Route path="/checkout">
				<Checkout />
			</Route>
			<Route path="/terms">
				<TermsConditions />
			</Route>
			<Route path="/privacy">
				<PrivacyPolicy />
			</Route>
		</Switch>
	);
}

export default InitialRoutes;
