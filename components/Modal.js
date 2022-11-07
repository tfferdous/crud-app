import React, { useContext, useRef, useState } from "react";
import { ProductContext } from "../pages/admin";
import axios from "../lib/axios";
import useClickoutSide from "../hooks/useClickoutSide";

const Modal = ({ toggleModal }) => {
	const fileInputRef = useRef(null);
	const modalContentRef = useRef(null);

	const [data, setInputData] = useState({
		title: "",
		desc: "",
		price: "",
	});

	const { fetchProducts } = useContext(ProductContext);

	//handle  Input change
	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		if (name === "img") {
			setInputData({ ...data, img: e.target.files[0] });
			return;
		}
		setInputData({ ...data, [name]: value });
	};

	//handle formsubmit
	const handleSubmit = async (e) => {
		e.preventDefault();

		//data to formData
		let formData = new FormData();

		Object.keys(data).forEach((key) => {
			formData.append(key, data[key]);
		});

		try {
			//store data to  api
			await axios.post("/products", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			//refetch products
			await fetchProducts();

			//close modal
			toggleModal();

			//reset inputs
			setInputData({
				title: "",
				desc: "",
				price: "",
			});
			fileInputRef.current.value = "";
		} catch (error) {
			console.log(error);
		}
	};

	//clickout of modal
	useClickoutSide(modalContentRef, () => {
		toggleModal();
	});

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full items-center justify-center flex`}
			style={{ background: "rgba(0, 0, 0, 0.3)" }}>
			<div
				className="lg:w-3/5 p-5 bg-green-100 rounded-md"
				ref={modalContentRef}>
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<div className="mb-3">
						<label className="block mb-1" htmlFor="title">
							Tittle
						</label>
						<input
							className="outline-0 p-2 border rounded-md w-full border-gray-400	"
							type="text"
							name="title"
							id="title"
							required
							onChange={handleChange}
							value={data.title}
						/>
					</div>
					<div className="mb-3">
						<label className="block mb-1" htmlFor="desc">
							Description
						</label>
						<input
							className="outline-0 p-2 border rounded-md w-full border-gray-400	"
							type="text"
							name="desc"
							id="desc"
							required
							value={data.desc}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label className="block mb-1" htmlFor="price">
							Price
						</label>
						<input
							className="outline-0 p-2 border rounded-md w-full border-gray-400	"
							type="number"
							name="price"
							id="price"
							required
							value={data.price}
							onChange={handleChange}
						/>
					</div>
					<div className="outline-0">
						<label className="block mb-1" htmlFor="img">
							Image
						</label>
						<div className="p-2 border rounded-md w-full border-gray-400 bg-white">
							<input
								className="outline-0"
								type="file"
								name="img"
								id="img"
								onChange={handleChange}
								required
								ref={fileInputRef}
							/>
						</div>
					</div>
					<div className="flex items-center">
						<button
							className="py-2 px-6 bg-green-600 rounded-xl mt-5"
							type="submit">
							Submit
						</button>
						<button
							className="py-2 px-6 bg-red-500 ml-2 rounded-xl mt-5"
							type="button"
							onClick={toggleModal}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Modal;
