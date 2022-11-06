import React, { useEffect, useState } from "react";
import axios from "../lib/axios";

const Products = () => {
	let [products, setProducts] = useState([]);

	//generate content
	let content;

	if (products.length >= 1)
		content = products.map(({ title, desc, price, _id: id }) => (
			<li className="table-row" key={id}>
				<div className="table-cell px-3 py-2 border-b border-gray-800">
					<h3 className="capitalize">{title}</h3>
				</div>
				<div className="table-cell px-3 py-2 border-b border-gray-800">
					<p>{desc}</p>
				</div>
				<div className="table-cell px-3 py-2 border-b border-gray-800 w-40	">
					<p>{price}</p>
				</div>

				<div className="table-cell px-3 py-2 border-b border-gray-800 w-40	">
					<p>pending</p>
				</div>
			</li>
		));

	async function fetchProducts() {
		let {
			data: { products },
		} = await axios.get("/products");
		setProducts(products);
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<div className="products py-5 px-7">
				<h1 className="text-4xl text-center">All Products</h1>
				<div className="p-5">
					<ul className="table table-fixed w-full bg-orange-50">
						<li className="table-row">
							<div className="table-cell px-3 py-2 border-b border-gray-800">
								<h3 className="capitalize">Tittle</h3>
							</div>
							<div className="table-cell px-3 py-2 border-b border-gray-800">
								<p>Description</p>
							</div>
							<div className="table-cell px-3 py-2 border-b border-gray-800 w-40	">
								<p>Price</p>
							</div>
							<div className="table-cell px-3 py-2 border-b border-gray-800 w-40	">
								<p>Status</p>
							</div>
						</li>
						{content}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Products;
