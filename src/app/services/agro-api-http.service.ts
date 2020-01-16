import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AgroApiHttpService {

	constructor(private readonly httpClient: HttpClient) {
	}

	public async createPolygon(name: string, geoJson: string): Promise<any> {

		try {

			const response: any = await this.httpClient.post('http://api.agromonitoring.com/agro/1.0/polygons?appid=9d411dc6b0e4cc020bd8b3b2e4ef69cc', {
				name,
				geo_json: geoJson
			}).toPromise();

			return response.id

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
			const endDate = Date.now();
			const apiKey = "9d411dc6b0e4cc020bd8b3b2e4ef69cc";

			const response: any = await this.httpClient.get(`http://api.agromonitoring.com/agro/1.0/image/search?start=${startDate}&end=${endDate}&polyid=${polygonId}&appid=${apiKey}`).toPromise();

			console.log(response);
			console.log(JSON.stringify(response));
			return response;
		} catch (error) {
			console.log("ERROR EN AGROAPI [GET POLYGON INFO]");
			return null;
		}
	}
}
