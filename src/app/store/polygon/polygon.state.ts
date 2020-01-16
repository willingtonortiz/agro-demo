import { State, Action, StateContext } from "@ngxs/store";
import { PolygonActions } from './polygon.actions';
import { AgroApiHttpService } from 'src/app/services/agro-api-http.service';

export interface PolygonStateModel {
	id: string;
	agroApiId: string;
	name: string;
	coordinates: Array<any>;
};

@State<PolygonStateModel>({
	name: "Polygon",
	defaults: {
		id: "",
		name: "",
		coordinates: [],
		agroApiId: "",
	}
})
export class PolygonState {

	public constructor(private readonly agroApiHttpService: AgroApiHttpService) {
	}

	@Action(PolygonActions.SetProperty)
	public setProperty({ patchState, }: StateContext<PolygonStateModel>, { properties }: PolygonActions.SetProperty) {
		console.log(properties);
		patchState({
			...properties
		});
	}

	@Action(PolygonActions.CreatePolygon)
	createPolygon({ getState }: StateContext<PolygonStateModel>, { }: PolygonActions.CreatePolygon) {
		console.log(getState());
	}
}
