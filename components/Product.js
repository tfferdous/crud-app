import React, { useContext, useState } from "react";
import { _arrayBufferToBase64 } from "../lib/utils";
import { ProductContext } from "../pages/admin/index";
import Image from "next/image";
import axios from "../lib/axios";
import axiosInstance from "../lib/axios";

const options = ["pending", "done", "rejected"];

function Product({ product }) {
	let { title, desc, price, img, _id: id, status } = product || {};
	const { dispatch, fetchProducts, setDraftStatusChanges } =
		useContext(ProductContext);

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
		await axios(`/products/${id}`, {
			method: "DELETE",
		});
		await fetchProducts();
	};

	//handleChange
	const handleStatusChange = async (e) => {
		let value = e.target.value;

		setDraftStatusChanges((draft) => {
			let existedDraftItem = draft.find((item) => item.id === id);

			//  if status === current status then remove it
			if (status === value) {
				return draft.filter((item) => item.id !== id);
			}

			if (existedDraftItem) {
				return draft.map((item) =>
					item.id === id ? { ...item, status: value } : item
				);
			} else {
				return [...draft, { id, status: value }];
			}
		});
	};

	return (
		<li className="flex items-center border-b border-gray-800">
			<div
				className="w-7 table-cell px-3 py-2 flex-1"
				style={{ maxWidth: "60px" }}
				onChange={handleChange}>
				<input type="checkbox" />
			</div>

			<div className="table-cell px-3 py-2 flex-1" style={{ maxWidth: "90px" }}>
				<Image
					className="rounded-full w-16 h-16"
					width={64}
					height={64}
					src={`data:image/png;charset=utf-8;base64,${_arrayBufferToBase64(
						img.data.data
					)}`}
					alt=""
				/>
			</div>

			<div className="table-cell px-3 py-2 flex-1">
				<h3 className="capitalize">{title}</h3>
			</div>
			<div className="table-cell px-3 py-2 flex-1">
				<p>{desc}</p>
			</div>
			<div className="table-cell px-3 py-2 flex-1 w-40	">
				<p>{price}</p>
			</div>

			<div className="table-cell px-3 py-2 flex-1 w-40	">
				{
					<select onChange={handleStatusChange}>
						<option defaultValue={status}>{status}</option>
						{options.map(
							(option, index) =>
								option !== status && (
									<option key={index} value={option}>
										{option}
									</option>
								)
						)}
					</select>
				}
			</div>

			<div className="w-24 table-cell px-3 py-2">
				<button
					className="px-3 py-2 text-xs rounded-lg bg-red-300"
					onClick={handleDeleteProduct}
					type="button">
					Delete
				</button>
			</div>
		</li>
	);
}

export default Product;
