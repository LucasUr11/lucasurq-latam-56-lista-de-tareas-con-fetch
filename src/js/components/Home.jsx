import React, { useState } from "react";
import { ListaTarea } from "./ListaTarea";


//create your first component
const Home = () => {
	return (
		<div className="container-fluid d-flex flex-column justify-content-center align-items-center bg-light">
			<ListaTarea />
		</div>
	);
};

export default Home;