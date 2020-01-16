import { State, Action, StateContext } from "@ngxs/store";
import { PolygonActions } from './polygon.actions';
import { AgroApiHttpService } from 'src/app/services/agro-api-http.service';

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

	public constructor(private readonly agroApiHttpService: AgroApiHttpService) {
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

		try {
			const information = await this.agroApiHttpService.getPolygonInfo(id);

			console.log(information);
		} catch (error) {
			console.log(`[ERROR] ${PolygonActions.FetchPolygonInfo.type}`);
		}
	}
}

/*
{
        "type":"Feature",
        "properties":{

        },
        "geometry":{
            "type":"Polygon",
            "coordinates":[
                [
                    [
                        -439.975689,
                        -5.220767
                    ],
                    [
                        -439.974423,
                        -5.221681
                    ],
                    [
                        -439.973618,
                        -5.220383
                    ],
                    [
                        -439.973205,
                        -5.219646
                    ],
                    [
                        -439.973854,
                        -5.219865
                    ],
                    [
                        -439.974208,
                        -5.21987
                    ],
                    [
                        -439.975689,
                        -5.220767
                    ]
                ]
            ]
        }
    }
*/
