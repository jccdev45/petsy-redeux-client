import React from "react";
import { FcAddressBook } from "react-icons/fc";

export function Hero({ img, title, subtitle, user }) {
	return (
		<div className="flex flex-col items-center justify-between w-full p-8 border-2 rounded-lg shadow border-primary-light bg-primary md:flex-row">
			<div className="flex flex-col justify-between w-full min-h-full md:w-1/2">
				{user && (
					<>
						<h3 className="w-full text-3xl md:text-4xl">{user.username}</h3>
						<h4 className="flex items-center w-full">
							<FcAddressBook className="text-2xl" /> {user.email}
						</h4>
						<h4>{`Member since ${new Date(
							user.created_at
						).toLocaleDateString()}`}</h4>
					</>
				)}

				{title && <h3 className="w-full text-4xl lg:text-6xl">{title}</h3>}
				{subtitle && <h4 className="w-full text-2xl">{subtitle}</h4>}
			</div>
			<img
				src={img || user.picture}
				alt={title || user.username}
				className={user ? "md:1/3" : "w-full md:w-1/2"}
			/>
		</div>
	);
}
