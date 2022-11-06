import Link from "next/link";
import React from "react";

function Header() {
	return (
		<header className="flex items-center justify-between bg-gray-900 py-4 px-8">
			<Link className="text-white" href="/">
				Logo
			</Link>
			<nav className="nav">
				<ul className="flex items-center">
					<li>
						<Link className="text-white px-2 py-2 inline-block" href="/">
							Home
						</Link>
					</li>
					<li>
						<Link className="text-white px-2 py-2 inline-block" href="/admin">
							Admin
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
