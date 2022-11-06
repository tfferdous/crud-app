import axios from "./axios";

//convert buffer to base64
export function _arrayBufferToBase64(buffer) {
	var binary = "";
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

//delete products
export async function deleteProduct(url, body) {
	let data;
	try {
		let res = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		data = await res.json();
	} catch (error) {
		console.log(error.message);
	}

	return data;
}
