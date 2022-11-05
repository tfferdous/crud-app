import React, { useContext, useState } from "react";
import { ProductContext } from "../pages/products/index";

function Product({ product }) {
	let { title, desc, price, _id: id } = product || {};
	const { dispatch, fetchProducts } = useContext(ProductContext);

	//handle change  checkbox
	const handleChange = (e) => {
		let isChecked = e.target.checked;
		if (isChecked) {
			return dispatch({ type: "addSelection", payload: id });
		}

		dispatch({ type: "removeSelection", payload: id });
	};

	//delete product
	const handleDeleteProduct = async () => {
		await fetch(`http://localhost:8000/products/${id}`, {
			method: "DELETE",
		});
		await fetchProducts();
	};

	return (
		<li className="table-row">
			<div
				className="w-7 table-cell px-3 py-2 border-b"
				onChange={handleChange}>
				<input type="checkbox" />
			</div>
			<div className="table-cell px-3 py-2 border-b">
				<h3 className="capitalize">{title}</h3>
			</div>
			<div className="table-cell px-3 py-2 border-b">
				<p>{desc}</p>
			</div>
			<div className="table-cell px-3 py-2 border-b w-40	">
				<p>{price}</p>
			</div>

			<div className="w-24 table-cell px-3 py-2 border-b">
				<button
					className="px-3 py-2 text-xs rounded-lg bg-red-300"
					onClick={handleDeleteProduct}>
					Delete
				</button>
			</div>
		</li>
	);
}

export default Product;
