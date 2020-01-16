import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-polygon-form',
	templateUrl: './polygon-form.component.html',
	styleUrls: ['./polygon-form.component.scss']
})
export class PolygonFormComponent implements OnInit {

	public polygonForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.polygonForm = this.formBuilder.group({
			name: ["", [Validators.required]]
		});
	}

	ngOnInit() {
	}

}
