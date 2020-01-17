import { State, StateContext, Action, Selector, NgxsOnInit } from '@ngxs/store';
import { AgroApiHttpService } from 'src/app/services/agro-api-http.service';
import { PolygonsActions } from './polygons.actions';

export interface Polygon {
	id: string;
	agroApiId: string;
	name: string;
	coordinates: Array<number>;
	area: number;
	center: Array<number>;
	isInfoLoaded: boolean;
	polygonInfo: Array<any>;
	polygonStats: Array<any>;
	polygonTileImages: Array<any>;
}

export interface PolygonsStateModel {
	polygons: Array<Polygon>;
	current: Polygon;
}

@State<PolygonsStateModel>({
	name: "AppPolygons",
	defaults: {
		polygons: [],
		current: null
	}
})
export class PolygonsState implements NgxsOnInit {
	public constructor(
		private readonly agroApiHttpService: AgroApiHttpService
	) {
	}

	ngxsOnInit({ dispatch }: StateContext<PolygonsStateModel>) {
		dispatch([new PolygonsActions.FetchPolygons()]);
	}

	@Selector()
	static findAllPolygons(state: PolygonsStateModel): Array<Polygon> {
		return state.polygons;
	}

	@Selector()
	static getCurrentPolygon(state: PolygonsStateModel): Polygon {
		return state.current;
	}

	@Action(PolygonsActions.FetchPolygons)
	public async fetchPolygons({
		patchState
	}: StateContext<PolygonsStateModel>) {
		try {
			const data: Array<any> = await this.agroApiHttpService.findAllPolygons();

			const polygons = data.map((item): Polygon => ({
				id: item.id,
				agroApiId: item.id,
				area: item.area,
				center: item.center,
				name: item.name,
				coordinates: item.geo_json.geometry.coordinates[0],
				isInfoLoaded: false,
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

	@Action(PolygonsActions.SetCurrentPolygon)
	public setCurrentPolygon({ getState, patchState }: StateContext<PolygonsStateModel>, { agroApiId }: PolygonsActions.SetCurrentPolygon) {
		const polygons = getState().polygons;
		const current = polygons.find(item => item.agroApiId === agroApiId);

		patchState({
			current: { ...current }
		});
	}

	@Action(PolygonsActions.FetchCurrentPolygonInfo)
	public async fetchCurrentPolygonInfo({ getState, patchState, dispatch }: StateContext<PolygonsStateModel>) {
		const { current, polygons } = getState();

		if (current === null) return;

		try {
			let information: Array<any> = await this.agroApiHttpService.getPolygonInfo(current.agroApiId);

			information.sort((a: any, b: any) => b.dt - a.dt);
			information = information.slice(0, 5);

			const newPolygons = polygons.map(item => {
				if (item.agroApiId === current.agroApiId) {
					return { ...item, isInfoLoaded: true, polygonInfo: information };
				}
				else {
					return { ...item };
				}
			});

			patchState({
				polygons: newPolygons
			})

			dispatch([new PolygonsActions.UpdateCurrentPolygon()]);

		} catch (error) {
			console.log(`ERROR ${PolygonsActions.FetchCurrentPolygonInfo.type}`)
		}
	}

	@Action(PolygonsActions.FetchCurrentPolygonStats)
	public async fetchCurrentPolygonStats({ }: StateContext<PolygonsStateModel>) {
		// TODO
	}

	@Action(PolygonsActions.UpdateCurrentPolygon)
	public async updateCurrentPolygon({ getState, patchState }: StateContext<PolygonsStateModel>) {
		const { current, polygons } = getState();
		if (current === null) return;

		const updatedCurrent = polygons.find(item => item.agroApiId === current.agroApiId);

		patchState({
			current: { ...updatedCurrent }
		});
	}
}
