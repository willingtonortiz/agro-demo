import { State, Action, StateContext, Selector } from "@ngxs/store";
import { PolygonActions } from './polygon.actions';
import { AgroApiHttpService } from 'src/app/services/agro-api-http.service';
import { MakerService } from 'src/app/services/maker/maker.service';
import { HttpClient } from '@angular/common/http';

export interface PolygonStateModel {
	id: string;
	agroApiId: string;
	name: string;
	coordinates: Array<any>;
	area: number;
	center: Array<any>;
	polygonInfo: Array<any>;
	graphData: Array<any>;
	polygonImages: Array<any>;
};

@State<PolygonStateModel>({
	name: "Polygon",
	defaults: {
		id: "",
		name: "",
		coordinates: [],
		agroApiId: "",
		area: 0,
		center: [],
		polygonInfo: [],
		graphData: [],
		polygonImages: []
	}
})

export class PolygonState {

	public constructor(
		private readonly agroApiHttpService: AgroApiHttpService,
		private readonly httpClient: HttpClient,
		private makerService: MakerService
	) { }

	@Selector()
	static pandas({ getState }: StateContext<PolygonStateModel>) {
		const { polygonInfo } = getState();
		const stats: Array<any> = polygonInfo.map((item) => {

		});
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
	public async fetchPolygonInfo({ getState, patchState, dispatch }: StateContext<PolygonStateModel>) {
		const { id } = getState();
		
		const polygon = getState();
		try {
			const information: Array<any> = await this.agroApiHttpService.getPolygonInfo(id);
			this.makerService.drawImage(information[0].tile.ndvi,polygon.coordinates);
			/*const ndviInfo = [];
			const polygonImages = [];

			for (let i = 0; i < information.length; ++i) {
				try {
					polygonImages.push(information[i].tiles.ndvi);
					const data = await this.httpClient.get(information[i].stats.ndvi).toPromise();
					ndviInfo.push(data);
				} catch (error) {
					console.log("ERROR");
				}
			}

			console.log(ndviInfo);

			patchState({
				polygonInfo: information,
				graphData: ndviInfo,
				polygonImages
			});*/

		} catch (error) {
			console.log(`[ERROR] ${PolygonActions.FetchPolygonInfo.type}`);
		}
	}
}
