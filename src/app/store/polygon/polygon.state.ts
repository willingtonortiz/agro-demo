import { State, Action, StateContext } from "@ngxs/store";
import { PolygonActions } from './polygon.actions';
import { AgroApiHttpService } from 'src/app/services/agro-api-http.service';
import { MakerService } from 'src/app/services/maker/maker.service';

export interface PolygonStateModel {
	id: string;
	agroApiId: string;
	name: string;
	coordinates: Array<any>;
	area: number;
	center: Array<any>;
};

@State<PolygonStateModel>({
	name: "Polygon",
	defaults: {
		id: "",
		name: "",
		coordinates: [],
		agroApiId: "",
		area: 0,
		center: []
	}
})

export class PolygonState {

	public constructor(private readonly agroApiHttpService: AgroApiHttpService, private makerService: MakerService) {
	}

	@Action(PolygonActions.SetProperty)
	public setProperty({ patchState, }: StateContext<PolygonStateModel>, { properties }: PolygonActions.SetProperty) {
		patchState({
			...properties
		});
	}

	@Action(PolygonActions.CreatePolygon)
	public async createPolygon({ getState, patchState }: StateContext<PolygonStateModel>) {
		const polygon = getState();

		const geoJson = {
			type: "Feature",
			properties: {},
			geometry: {
				type: "Polygon",
				coordinates: [polygon.coordinates]
			}
		};

		try {
			const data = await this.agroApiHttpService.createPolygon(polygon.name, geoJson);

			console.log(data);
			patchState({
				id: data.id,
				area: data.area,
				center: data.center
			});

		} catch (error) {
			console.log(`[ERROR] ${PolygonActions.CreatePolygon.type}`);
		}
	}

	@Action(PolygonActions.FetchPolygonInfo)
	public async fetchPolygonInfo({ getState }: StateContext<PolygonStateModel>) {
		const { id } = getState();
		
		const polygon = getState();
		try {
			const information = await this.agroApiHttpService.getPolygonInfo(id);
			this.makerService.drawImage(information[0].image.truecolor,polygon.coordinates);
			//console.log(information[0].image.truecolor);
		} catch (error) {
			console.log(`[ERROR] ${PolygonActions.FetchPolygonInfo.type}`);
		}
	}
}
