import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import userDataDefault from "../userDataDefault";

export default configureStore({
	reducer,
	devTools: process.env.NODE_ENV === "development",
	preloadedState: { userData: userDataDefault },
});
