import axios from "axios";

let axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	// baseURL: "http://localhost:4000",
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
