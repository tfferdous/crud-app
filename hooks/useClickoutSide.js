import { useEffect, useState } from "react";

const useClickoutSide = (ref, callback) => {
	const element = ref.current;
	const [isOutside, setIsOutSide] = useState(false);
	useEffect(() => {
		const handleClick = (e) => {
			const target = e.target;
			if (element && !element.contains(target)) {
				setIsOutSide(true);
				callback && callback(isOutside);
			} else {
				setIsOutSide(false);
			}
		};
		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [element]);

	return isOutside;
};

export default useClickoutSide;
