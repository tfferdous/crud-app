import React, { useState } from "react";

function Modal({ showModal, toggleModal }) {
	let [data, setInputData] = useState({
		title: "",
		desc: "",
		price: "",
		img: "",
	});

	//handle  Input change
	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;
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
			await fetch("http://localhost:4000/products/", {
				method: "POST",
				body: formData,
			});

			//reset inputs
			setInputData({
				title: "",
				desc: "",
				price: "",
				img: "",
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={`fixed top-0 leff-0 w-full h-full items-center justify-center ${
				showModal ? "flex" : "hidden"
			}`}
			style={{ background: "rgba(0, 0, 0, 0.3)" }}>
			<div className="lg:w-3/5 p-5 bg-green-100 rounded-md">
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
								value={data.img}
							/>
						</div>
					</div>
					<div className="flex items-center">
						<input
							className="py-2 px-6 bg-green-600 rounded-xl mt-5"
							type="submit"
							value="Submit"
						/>
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
}

export default Modal;
