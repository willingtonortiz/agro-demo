import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AgroApiHttpService {

	constructor(public httpClient: HttpClient) {
	}

	public async createPolygon(name: string, geoJson: string) {

		try {

			const response: any = await this.httpClient.post('http://api.agromonitoring.com/agro/1.0/polygons?appid=9d411dc6b0e4cc020bd8b3b2e4ef69cc', {
				name,
				geo_json: geoJson
			}).toPromise();

			console.log(`Polygon id: ${response.id}`)

		} catch (error) {
			console.log("ERROR EN AGROAPI [CREATE POLYGON]");
		}
	}

	public async findAllPolygons() {
		try {
			const response: any = await this.httpClient.get('http://api.agromonitoring.com/agro/1.0/polygons?appid=9d411dc6b0e4cc020bd8b3b2e4ef69cc').toPromise();
			console.log(response);
		} catch (error) {

			console.log("ERROR EN AGROAPI [FINDALL POLYGONS]");
		}
	}

	public async getPolygonInfo(polygonId: string) {
		try {
			const startDate = 0;
			const endDate = Date.now();
			const apiKey = "";

			const response: any = await this.httpClient.get(`http://api.agromonitoring.com/agro/1.0/image/search?start=${startDate}&end=${endDate}&polyid=${polygonId}&appid=${apiKey}`).toPromise();

			console.log(response);
			console.log(JSON.stringify(response));
		} catch (error) {

			console.log("ERROR EN AGROAPI [FINDALL POLYGONS]");
		}
	}
}
