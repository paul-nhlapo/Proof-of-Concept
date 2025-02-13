// src/app/report/report.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  productCountsByBrand: any[] = [];
  productCountsByType: any[] = [];

  chartdata = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Product Count by Brands',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#90EEEF'
    }]
  };

  constructor(private reportService: ReportService) { }


  ngOnInit(): void {
    this.fetchProductReport();
  }
  
fetchProductReport(): void {
  this.reportService.generateReport().subscribe(report => {
    this.productCountsByBrand = report.productCountByBrand;
    this.productCountsByType = report.productCountByType;
    this.createCharts();
  });
}
  
 createCharts(): void {
  const brandNames = this.productCountsByBrand.map(item => item.brand);
  const brandCounts = this.productCountsByBrand.map(item => item.count);

  const typeNames = this.productCountsByType.map(item => item.productType);
  const typeCounts = this.productCountsByType.map(item => item.count);

  const brandChartContext = document.getElementById('brandChart') as HTMLCanvasElement;
  new Chart(brandChartContext, {
    type: 'bar',
    data: {
      labels: brandNames,
      datasets: [{
        label: 'Product Count by Brands',
        data: brandCounts,
        backgroundColor: '#90EEEF'
      }]
    }
  });

  const typeChartContext = document.getElementById('typeChart') as HTMLCanvasElement;
  new Chart(typeChartContext, {
    type: 'bar',
    data: {
      labels: typeNames,
      datasets: [{
        label: 'Product Count by Product Types',
        data: typeCounts,
        backgroundColor: '#00B4D8'
      }]
    }
  });
}
}
