import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AgroApiHttpService {

	constructor(private readonly httpClient: HttpClient) {
	}

	public async createPolygon(name: string, geoJson: any): Promise<any> {

		try {

			const response: any = await this.httpClient.post('http://api.agromonitoring.com/agro/1.0/polygons?appid=9d411dc6b0e4cc020bd8b3b2e4ef69cc', {
				name,
				geo_json: geoJson
			}).toPromise();

			return response;

		} catch (error) {
			console.log("ERROR EN AGROAPI [CREATE POLYGON]");
			return null;
		}
	}

	public async findAllPolygons() {
		try {
			const response: any = await this.httpClient.get('http://api.agromonitoring.com/agro/1.0/polygons?appid=9d411dc6b0e4cc020bd8b3b2e4ef69cc').toPromise();
			return response;
		} catch (error) {
			console.log("ERROR EN AGROAPI [FINDALL POLYGONS]");
			return null;
		}
	}

	public async getPolygonInfo(polygonId: string) {
		try {
			const startDate = 0;
			const endDate = 1578960000;
			const apiKey = "9d411dc6b0e4cc020bd8b3b2e4ef69cc";

			const data: any = await this.httpClient.get(`http://api.agromonitoring.com/agro/1.0/image/search?start=${startDate}&end=${endDate}&polyid=${polygonId}&appid=${apiKey}`).toPromise();

			return data;
		} catch (error) {
			console.log("ERROR EN AGROAPI [GET POLYGON INFO]");
			return null;
		}
	}
}
