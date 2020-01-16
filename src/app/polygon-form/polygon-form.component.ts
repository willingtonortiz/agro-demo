import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { PolygonActions } from '../store/polygon/polygon.actions';
import { MakerService } from '../services/maker/maker.service';

@Component({
	selector: 'app-polygon-form',
	templateUrl: './polygon-form.component.html',
	styleUrls: ['./polygon-form.component.scss']
})
export class PolygonFormComponent {

	public polygonForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private store: Store, private makerService: MakerService) {
		this.polygonForm = this.formBuilder.group({
			name: ["", [Validators.required]]
		});
	}

	public printInfo() {
		this.store.dispatch([new PolygonActions.SetProperty({ name: this.fName.value })]);
		this.store.dispatch([new PolygonActions.CreatePolygon()]);
	}

	public fetchInfo(){
		this.store.dispatch([ new PolygonActions.FetchPolygonInfo()]);
		
	}

	public get fName(): AbstractControl {
		return this.polygonForm.get("name");
	}
}
