import { PolygonStateModel } from './polygon.state';

export namespace PolygonActions {
	export class CreatePolygon {
		static readonly type = '[Polygon] Create Polygon';

		public constructor() { }
	}

	export class SetProperty {
		static readonly type = '[Polygon] Set Property';

		public constructor(public properties: Partial<PolygonStateModel>) { }
	}
}
