import React from "react";
import "./Ascensions.scss";
import Ascension from "./Ascension";
import { getHeavenlyChips } from "../../../helpers";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import { useDispatch } from "react-redux/lib/hooks/useDispatch";
import {
	addAscension,
	resetAscensions,
} from "../../../redux/userData/ascensions";
import { Fragment } from "react/cjs/react.production.min";
import { Button } from "../../Menu";

/*
export default class Ascensions extends Component {
	constructor() {
		super();
	}

	createAscension = () => {
		const hc = getHeavenlyChips();

		if (!hc) {
			return;
		}

		SemiCookie.UserData.ascensions.push({ hc });

		SemiCookie.calculateAscension();

		this.setState({
			ascensions: SemiCookie.UserData.ascensions,
			currentAscension: SemiCookie.currentAscension,
		});
	};

	editAscension = (index) => {
		const hc = getHeavenlyChips();

		if (!hc) {
			return;
		}

		SemiCookie.UserData.ascensions[index].hc = hc;

		SemiCookie.calculateAscension();

		this.setState({
			ascensions: SemiCookie.UserData.ascensions,
			currentAscension: SemiCookie.UserData.currentAscension,
		});
	};

	deleteAscension = (index) => {
		if (confirm(`Are you sure you want to delete Ascension #${index + 1}?`)) {
			SemiCookie.UserData.ascensions.pop();

			SemiCookie.calculateAscension();

			this.setState({
				ascensions: SemiCookie.UserData.ascensions,
				currentAscension: SemiCookie.currentAscension,
			});
		}
	};

	/*
	render() {
		
    }
    Will be fixed soon!
    */

export default function Ascensions() {
	const ascensions = useSelector((state) => state.userData.ascensions);
	const currentAscension = useSelector(
		(state) => state.ascensionData.currentAscension
	);

	const dispatch = useDispatch();

	const addAscensionCallback = () => {
		const hc = getHeavenlyChips();

		if (!hc) {
			return;
		}

		dispatch(addAscension(hc));
	};

	return (
		<Fragment>
			<table className="ascensions">
				<thead>
					<tr>
						<td>Ascension Number</td>
						<td>Heavenly Chips</td>
						<td>Edit</td>
						<td>Delete</td>
						<td onClick={addAscensionCallback}>➕</td>
					</tr>
				</thead>

				<tbody>
					{ascensions.map((_, index) => (
						<Ascension
							active={currentAscension === index}
							last={index + 1 === ascensions.length}
							index={index}
							key={index}
						/>
					))}
				</tbody>
			</table>
			<Button onClick={() => dispatch(resetAscensions())}>
				Reset Ascensions to Default
			</Button>
		</Fragment>
	);
}
