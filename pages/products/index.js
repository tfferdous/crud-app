import React, { useEffect, useReducer, useState } from "react";
import Error from "../../components/Error";
import Product from "../../components/Product";
import { deleteProduct, fetchData } from "../../lib/utils";

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

const Products = () => {
	let [products, setProducts] = useState([]);
	const [selectedProducts, dispatch] = useReducer(reducer, []);

	//generate content
	let content;
	if (!products.length) content = <Error message="No content" />;

	if (products.length >= 1)
		content = products.map((product) => (
			<Product product={product} key={product._id} />
		));

	async function fetchProducts() {
		let { products } = await fetchData("http://localhost:8000/products/");
		setProducts(products);
	}

	async function deleteMultipleProducts() {
		await deleteProduct("http://localhost:8000/products/", {
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

	return (
		<div className="products py-5 px-7">
			<h1 className="text-4xl text-center">All Products</h1>
			<ProductContext.Provider
				value={{ selectedProducts, dispatch, fetchProducts }}>
				<div className="mt-5 p-5">
					<ul className="table table-fixed w-full bg-orange-50">{content}</ul>
					{selectedProducts.length ? (
						<button
							className="mt-6 px-3 py-2 text-xs rounded-lg bg-red-300"
							onClick={handleDeleteMulitProduct}>
							Delete {selectedProducts.length}
							{selectedProducts.length > 1 ? "products" : "product"}
						</button>
					) : null}
				</div>
			</ProductContext.Provider>
		</div>
	);
};

export default Products;
