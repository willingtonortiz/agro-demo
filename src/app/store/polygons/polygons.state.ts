import { State, StateContext, Action, Selector } from '@ngxs/store';
import { AgroApiHttpService } from 'src/app/services/agro-api-http.service';
import { PolygonsActions } from './polygons.actions';

export interface Polygon {
	id: string;
	agroApiId: string;
	name: string;
	coordinates: Array<number>;
	area: number;
	center: Array<number>;
	polygonInfo: Array<any>;
	polygonStats: Array<any>;
	polygonTileImages: Array<any>;
}

export interface PolygonsStateModel {
	polygons: Array<Polygon>;
}

@State<PolygonsStateModel>({
	name: "AppPolygons",
	defaults: {
		polygons: [],
	}
})
export class PolygonsState {
	public constructor(
		private readonly agroApiHttpService: AgroApiHttpService
	) {
	}

	@Selector()
	static findAllPolygons({ getState }: StateContext<PolygonsStateModel>): Array<Polygon> {
		const state = getState();
		return state.polygons;
	}

	@Action(PolygonsActions.FetchPolygons)
	public async fetchPolygons({
		patchState
	}: StateContext<PolygonsStateModel>) {
		try {
			const data: Array<any> = await this.agroApiHttpService.findAllPolygons();

			const polygons = data.map((item): Polygon => ({
				id: '',
				agroApiId: item.id,
				area: item.area,
				center: item.center,
				name: item.name,
				coordinates: item.geo_json.geometry.coordinates[0],
				polygonInfo: null,
				polygonStats: null,
				polygonTileImages: null
			}));

			patchState({
				polygons
			});
		} catch (error) {
			console.log(`ERROR ${PolygonsActions.FetchPolygons.type}`)
		}
	}
}
