import React, { useReducer, useContext, createContext, useEffect } from "react";
import { CART_ACTIONS, LS_STRINGS } from "../constants";

function reducer(state, action) {
	switch (action.type) {
		case CART_ACTIONS.REQUEST:
			return {
				...state,
				cart: [],
			};
		case CART_ACTIONS.UPDATE:
			return {
				...state,
				cart: action.payload,
			};
		default:
			return state;
	}
}

const initialState = {
	cart: [],
	numberOfItemsInCart: 0,
	subtotal: 0,
};

const dataContext = createContext();

export function ProviderCart({ children }) {
	const cart = useProviderCart();
	return <dataContext.Provider value={cart}>{children}</dataContext.Provider>;
}

export const useCart = () => {
	return useContext(dataContext);
};

export function useProviderCart() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const calculateNumItemsInCart = () => {
		const quantity = state.cart.map((item) => {
			return item.quantity;
		});
		return quantity.reduce((a, b) => a + b);
	};

	const calculateCartTotal = () => {
		let itemTotal = state.cart.map((item) => item.price * item.quantity);
		let subtotal = itemTotal.reduce((a, b) => a + b);
		let tax = 0.07;
		let taxAmount = subtotal * tax;
		let total = taxAmount + subtotal;
		return { total, subtotal, taxAmount };
	};

	const addToCart = (item) => {
		let cartCopy = [...state.cart];
		let { id } = item;

		let existingItem = cartCopy.find((cartItem) => cartItem.id === id);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			item.quantity = 1;
			cartCopy.push(item);
		}

		dispatch({ type: CART_ACTIONS.UPDATE, payload: cartCopy });

		let stringCart = JSON.stringify(cartCopy);
		localStorage.setItem(LS_STRINGS.CART, stringCart);
	};

	const updateCart = (itemId, amount) => {
		let cartCopy = [...state.cart];
		let existingItem = cartCopy.find((item) => item.id === itemId);

		if (!existingItem) return;

		existingItem.quantity += amount;

		if (existingItem.quantity <= 0) {
			cartCopy = cartCopy.filter((item) => item.id !== itemId);
		}

		dispatch({ type: CART_ACTIONS.UPDATE, payload: cartCopy });

		let stringCart = JSON.stringify(cartCopy);
		localStorage.setItem(LS_STRINGS.CART, stringCart);
	};

	const removeFromCart = (itemId) => {
		let cartCopy = [...state.cart];
		cartCopy = cartCopy.filter((item) => item.id !== itemId);

		dispatch({ type: CART_ACTIONS.UPDATE, payload: cartCopy });

		let stringCart = JSON.stringify(cartCopy);
		localStorage.setItem(LS_STRINGS.CART, stringCart);
	};

	const clearCart = () => {
		dispatch({ type: CART_ACTIONS.CLEAR });

		localStorage.removeItem(LS_STRINGS.CART);
	};

	useEffect(() => {
		dispatch({ type: CART_ACTIONS.REQUEST });
		let localCart = localStorage.getItem(LS_STRINGS.CART);

		localCart = JSON.parse(localCart);

		if (localCart) {
			dispatch({ type: CART_ACTIONS.UPDATE, payload: localCart });
		}
	}, []);

	return {
		state,
		addToCart,
		updateCart,
		removeFromCart,
		clearCart,
		calculateCartTotal,
		calculateNumItemsInCart,
	};
}
