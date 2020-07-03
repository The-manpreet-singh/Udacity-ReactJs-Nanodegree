import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
	return (
		<div>
			<h3>404 Error</h3>
			<p>Pge doesn't exist</p>
			<Link to="/">Home</Link>.
		</div>
	);
}
