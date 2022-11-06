import axios from "axios";

let axiosInstance = axios.create({
	baseURL: "http://localhost:4000/",
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
