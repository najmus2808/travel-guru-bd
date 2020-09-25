import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = ({children,...rest}) => {
	const location = useLocation();
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	return (
		<Route
		{...rest}
		render={
			() =>
		  loggedInUser.email ? (
			children
		  ) : (
			<Redirect
			  to={{
				pathname: "/user",
				location
			  }}
			/>
		  )
		}
	  />
	);
};

export default PrivateRoute;
