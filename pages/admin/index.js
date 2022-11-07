import React, { useEffect, useReducer, useState } from "react";
import Modal from "../../components/Modal";
import Product from "../../components/Product";
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
	const [draftStatusChanges, setDraftStatusChanges] = useState([]);

	//fetch products
	const fetchProducts = async () => {
		try {
			let {
				data: { products },
			} = await axios.get("/products");
			setProducts(products);
		} catch (errror) {
			console.log(errror);
		}
	};

	//delete products
	const deleteMultipleProducts = async () => {
		await axios.delete("/products", {
			data: { selectedProducts },
		});
	};

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

	//upate status
	const updateStatus = async () => {
		try {
			await axios.put("/products", draftStatusChanges);
			await fetchProducts();
			setDraftStatusChanges([]);
		} catch (errror) {
			console.log(errror);
		}
	};

	return (
		<ProductContext.Provider
			value={{
				selectedProducts,
				dispatch,
				fetchProducts,
				setDraftStatusChanges,
			}}>
			<div className="products py-5 px-7">
				<h1 className="text-4xl text-center">Admin</h1>
				<div className="flex items-center justify-end mt-5 mb-0 p-5 pb-0 text-end">
					{draftStatusChanges.length ? (
						<button
							className="mr-3 px-3 py-2 text-xs rounded-lg bg-blue-600"
							onClick={updateStatus}>
							Update Status
						</button>
					) : null}
					<button
						className="px-3 py-2 text-xs rounded-lg bg-green-300"
						onClick={toggleModal}>
						Add New
					</button>
				</div>
				<div className="p-5">
					<ul className="w-full bg-orange-50">
						<li className="flex items-center border-b border-gray-800">
							<div
								className="w-7 flex-1 px-3 py-2"
								style={{ maxWidth: "60px" }}></div>
							<div
								className="flex-1 px-3 py-2"
								style={{ maxWidth: "90px" }}></div>
							<div className="flex-1 px-3 py-2">
								<h3 className="capitalize">Tittle</h3>
							</div>
							<div className="flex-1 px-3 py-2">
								<p>Description</p>
							</div>
							<div className="flex-1 px-3 py-2 w-40	">
								<p>Price</p>
							</div>
							<div className="flex-1 px-3 py-2 w-40	">
								<p>Status</p>
							</div>

							<div className="w-24 table-cell px-3 py-2 "></div>
						</li>
						{products.length
							? products.map((product) => (
									<Product product={product} key={product._id} />
							  ))
							: null}
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
