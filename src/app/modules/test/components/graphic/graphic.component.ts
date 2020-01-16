import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
	selector: 'app-graphic',
	templateUrl: './graphic.component.html',
	styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent {
	public lineChartData: ChartDataSets[] = [
		{ label: "First", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
		{ label: "Second", data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 20] }
	];

	public lineChartLabels: Label[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

	public lineChartOptions: (ChartOptions & { annotation: any }) = {
		elements: {
			line: {
				tension: 0
			}
		},
		responsive: true,
		scales: {
			xAxes: [{}],
			yAxes: [
				{
					id: 'y-axis-0',
					position: 'left',
				},
			]
		},
		annotation: {
			annotations: [
				{
					type: 'line',
					mode: 'vertical',
					scaleID: 'x-axis-0',
					value: 'March',
					borderColor: 'orange',
					borderWidth: 1,
					label: {
						enabled: true,
						fontColor: 'orange',
						content: 'LineAnno'
					}
				},
			],
		},
	};

	public lineChartColors: Color[] = [
		{
			// Fondo
			backgroundColor: 'rgba(0,0,0,0)',

			borderWidth: 2.0,
			// Borde
			borderColor: '#7cb5ec',
			// Puntos
			pointBackgroundColor: 'blue',
			// Borde de los puntos
			pointBorderColor: 'white',
			// Color del punto sombreado
			pointHoverBackgroundColor: '#fff',
			// Color del borde de los puntos sombreados
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
		{
			backgroundColor: 'rgba(0,0,0,0)',
			borderColor: 'red',
			pointBackgroundColor: 'blue',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
	];

	public lineChartLegend = true;
	public lineChartType = 'line';
	// public lineChartPlugins = [pluginAnnotations];

	@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

	constructor() { }

	public randomize(): void {
		for (let i = 0; i < this.lineChartData.length; i++) {
			for (let j = 0; j < this.lineChartData[i].data.length; j++) {
				this.lineChartData[i].data[j] = this.generateNumber(i);
			}
		}
		this.chart.update();
	}

	private generateNumber(i: number) {
		return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
	}

	// events
	public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
		// console.log(event, active);
	}

	public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
		// console.log(event, active);
	}

	public hideOne() {
		const isHidden = this.chart.isDatasetHidden(1);
		this.chart.hideDataset(1, !isHidden);
	}

	public pushOne() {
		this.lineChartData.forEach((x, i) => {
			const num = this.generateNumber(i);
			const data: number[] = x.data as number[];
			data.push(num);
		});
		this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
	}

	public changeColor() {
		this.lineChartColors[2].borderColor = 'green';
		this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
	}

	public changeLabel() {
		this.lineChartLabels[2] = ['1st Line', '2nd Line'];
		// this.chart.update();
	}

}
