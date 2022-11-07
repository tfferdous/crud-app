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

const Admin = () => {
	const [data, setData] = useState({
		isLoading: false,
		products: [],
		isError: false,
	});
	const [showModal, setShowModal] = useState(false);
	const [selectedProducts, dispatch] = useReducer(reducer, []);
	const [draftStatusChanges, setDraftStatusChanges] = useState([]);

	//fetch products
	const fetchProducts = async () => {
		setData({ ...data, isLoading: true });
		try {
			const res = await axios.get("/products");
			setData({ ...data, products: res.data.products });
		} catch (errror) {
			setData({ ...data, isLoading: false, isError: true });
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
		<>
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
							<div className="flex-1 px-3 py-2 font-bold">
								<h3 className="capitalize">Tittle</h3>
							</div>
							<div className="flex-1 px-3 py-2 font-bold">
								<p>Description</p>
							</div>
							<div className="flex-1 px-3 py-2 w-40	 font-bold">
								<p>Price</p>
							</div>
							<div className="flex-1 px-3 py-2 w-40	 font-bold">
								<p>Status</p>
							</div>

							<div className="w-24 table-cell px-3 py-2 "></div>
						</li>
						{data.isLoading && (
							<div className="py-10 text-center"> Loading</div>
						)}
						{data.isError && (
							<div className="py-10 text-center"> somthing went wrong!!</div>
						)}
						{data?.products.length && !data?.isLoading
							? data?.products.map((product) => (
									<Product
										product={product}
										key={product._id}
										setDraftStatusChanges={setDraftStatusChanges}
										dispatch={dispatch}
										fetchProducts={fetchProducts}
									/>
							  ))
							: null}
					</ul>
					{selectedProducts.length >= 1 ? (
						<button
							className="mt-6 px-3 py-2 text-xs rounded-lg bg-red-300"
							onClick={handleDeleteMulitProduct}>
							Delete {selectedProducts.length}
							{selectedProducts.length > 1 ? "products" : "product"}
						</button>
					) : null}
				</div>
			</div>
			{showModal ? (
				<Modal toggleModal={toggleModal} fetchProducts={fetchProducts} />
			) : null}
		</>
	);
};

export default Admin;
