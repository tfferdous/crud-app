import React, { useEffect, useReducer, useState } from "react";
import Error from "../../components/Error";
import Modal from "../../components/Modal";
import Product from "../../components/Product";
import { deleteProduct } from "../../lib/utils";
import axios from "../../lib/axios";

// reducer
const reducer = (state, action) => {
	if (action.type === "addSelection") {
		return [...state, action.payload];
	}

	if (action.type === "removeSelection") {
		if (Array.isArray(action.payload)) {
			return state.filter((id) => !action.payload.includes(id));
		}
		return state.filter((id) => id !== action.payload);
	}

	return state;
};

//product context
export const ProductContext = React.createContext();

const Admin = () => {
	let [products, setProducts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedProducts, dispatch] = useReducer(reducer, []);

	//generate content
	let content;

	if (products.length >= 1)
		content = products.map((product) => (
			<Product product={product} key={product._id} />
		));

	async function fetchProducts() {
		let {
			data: { products },
		} = await axios.get("/products");
		setProducts(products);
	}

	async function deleteMultipleProducts() {
		await deleteProduct("http://localhost:4000/products/", {
			selectedProducts,
		});
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	//handle delete multiple
	const handleDeleteMulitProduct = async () => {
		await deleteMultipleProducts();
		await fetchProducts();
		dispatch({ type: "removeSelection", payload: selectedProducts });
	};

	//toggle modal
	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<ProductContext.Provider
			value={{ selectedProducts, dispatch, fetchProducts }}>
			<div className="products py-5 px-7">
				<h1 className="text-4xl text-center">All Products</h1>
				<div className="mt-5 mb-0 p-5 pb-0 text-end">
					<button
						className="px-3 py-2 text-xs rounded-lg bg-green-300"
						onClick={toggleModal}>
						Add New
					</button>
				</div>
				<div className="p-5">
					<ul className="table table-fixed w-full bg-orange-50">
						<li className="table-row">
							<div className="w-7 table-cell px-3 py-2 border-b border-gray-800"></div>
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

							<div className="w-24 table-cell px-3 py-2 border-b border-gray-800">
								<button className="px-3 py-2 text-xs rounded-lg bg-red-300">
									Delete
								</button>
							</div>
						</li>
						{content}
					</ul>
					{selectedProducts.length ? (
						<button
							className="mt-6 px-3 py-2 text-xs rounded-lg bg-red-300"
							onClick={handleDeleteMulitProduct}>
							Delete {selectedProducts.length}
							{selectedProducts.length > 1 ? "products" : "product"}
						</button>
					) : null}
				</div>
			</div>
			<Modal toggleModal={toggleModal} showModal={showModal} />
		</ProductContext.Provider>
	);
};

export default Admin;
