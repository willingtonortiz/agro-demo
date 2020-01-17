export namespace PolygonsActions {
	export class FetchPolygons {
		static readonly type = '[Polygons] Fetch Polygons'

		public constructor() { }
	}

	export class SetCurrentPolygon {
		static readonly type = '[Polygons] Set Current Polygon';

		public constructor(public agroApiId: string) { }
	}

	export class FetchCurrentPolygonInfo{
		static readonly type = '[Polygons] Fetch Current Polygon Info';
	}

	export class FetchCurrentPolygonStats{
		static readonly type = '[Polygons] Fetch Current Polygon Stats';
	}

	export class UpdateCurrentPolygon{
		static readonly type = '[Polygons] Fetch Current Polygon Stats';
	}

}
