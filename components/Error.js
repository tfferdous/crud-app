import React from "react";

const Error = ({ message }) => {
	return (
		<div className="bg-red-300 w-full px-6 py-5 text-center">
			<p className="text-white">{message}</p>
		</div>
	);
};

export default Error;
