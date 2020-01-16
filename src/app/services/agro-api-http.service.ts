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

			const response: any = await this.httpClient.post('http://api.agromonitoring.com/agro/1.0/polygons?appid=c8eb34769fcd2958df1703def1cb3ede', {
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
			const response: any = await this.httpClient.get('http://api.agromonitoring.com/agro/1.0/polygons?appid=c8eb34769fcd2958df1703def1cb3ede').toPromise();
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
			const apiKey = "c8eb34769fcd2958df1703def1cb3ede";

			const data: any = await this.httpClient.get(`http://api.agromonitoring.com/agro/1.0/image/search?start=${startDate}&end=${endDate}&polyid=${polygonId}&appid=${apiKey}`).toPromise();

			return data;
		} catch (error) {
			console.log("ERROR EN AGROAPI [GET POLYGON INFO]");
			return null;
		}
	}
}
