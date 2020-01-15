import { State, Action, StateContext } from "@ngxs/store";
import { PolygonActions } from './polygon.actions';

export interface PolygonStateModel {
	id: string;
	name: string;
	coordinates: Array<any>;
};

@State<PolygonStateModel>({
	name: "polygon",
	defaults: {
		id: "",
		name: "",
		coordinates: []
	}
})
export class PolygonState {

	@Action(PolygonActions.CreatePolygon)
	createPolygon({ }: StateContext<PolygonStateModel>, { }: PolygonActions.CreatePolygon) {

	}
}
