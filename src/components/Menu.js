import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import { setPreference } from "../redux/userData/preferences";
import "./Menu.scss";

export function Section({ title, children }) {
	return (
		<div>
			<div className="title">{title}</div>
			{children}
		</div>
	);
}

export function Listing({ children }) {
	return <div className="listing">{children}</div>;
}

export function ListingSection({ title, children }) {
	return (
		<Fragment>
			<div className="listing listingSection">{title}</div>
			<Listing>{children}</Listing>
		</Fragment>
	);
}

export function Button({ onClick, children }) {
	return (
		<a className="option" onClick={onClick}>
			{children}
		</a>
	);
}

export function Checkbox({ name, children }) {
	const checkboxState = useSelector(
		(state) => state.userData.preferences[name]
	);
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		const value = event.target.checked;

		dispatch(setPreference({ preference: name, value }));
	};

	return (
		<Fragment>
			<input
				id={name}
				type="checkbox"
				checked={checkboxState}
				onChange={handleInputChange}
			/>
			<label htmlFor={name}>{children}</label>
			<br />
		</Fragment>
	);
}

export function Description({ children }) {
	return <label>{children}</label>;
}

function Hamburger({ collapsed, onClick }) {
	return (
		<span className="hamburger" onClick={onClick}>
			{collapsed ? "+" : "-"}
		</span>
	);
}

// Derived from CCSE & Cookie Monster
export function CollapsibleMenu({ title, children }) {
	const [visible, setVisible] = useState(true);

	return (
		<div>
			<div className="title">
				{title + " "}
				<Hamburger collapsed={!visible} onClick={() => setVisible(!visible)} />
			</div>
			{visible ? children : ""}
		</div>
	);
}
