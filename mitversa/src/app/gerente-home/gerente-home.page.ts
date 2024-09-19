import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.page.html',
  styleUrls: ['./gerente-home.page.scss'],
})
export class GerenteHomePage implements OnInit {
  envioStatusChart: any;
  envioComparativaMensualChart: any;
  envioStatusPercentageChart: any;

  constructor() { }

  ngOnInit() {
    this.initEnvioStatusChart();
    this.initEnvioComparativaMensualChart();
    this.initEnvioStatusPercentageChart();
  }

  // Gráfico de Estado de Envíos
  initEnvioStatusChart() {
    this.envioStatusChart = {
      title: {
        text: '',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 18,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Entregado', 'No Entregado', 'En Tránsito', 'Devuelto'],
        top: '10%',
        selected: {
          'Entregado': true,
          'No Entregado': true,
          'En Tránsito': true,
          'Devuelto': true,
        },
        textStyle: {
          color: '#333',
        },
      },
      xAxis: {
        type: 'category',
        data: ['Estado'],
        axisLabel: {
          color: '#333',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#333',
        },
      },
      series: [
        {
          name: 'Entregado',
          type: 'bar',
          data: [150],
          itemStyle: { color: '#4caf50' },
        },
        {
          name: 'No Entregado',
          type: 'bar',
          data: [80],
          itemStyle: { color: '#f44336' },
        },
        {
          name: 'En Tránsito',
          type: 'bar',
          data: [50],
          itemStyle: { color: '#ffc107' },
        },
        {
          name: 'Devuelto',
          type: 'bar',
          data: [20],
          itemStyle: { color: '#9c27b0' },
        },
      ],
    };
  }

  // Gráfico de Comparativa Mensual de Envíos
  initEnvioComparativaMensualChart() {
    this.envioComparativaMensualChart = {
      title: {
        text: '',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 18,
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Mes Actual', 'Mes Pasado'],
        top: '10%',
      },
      xAxis: {
        type: 'category',
        data: ['Entregados', 'Devueltos'],
        axisLabel: {
          color: '#333',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#333',
        },
      },
      series: [
        {
          name: 'Mes Actual',
          type: 'line',
          data: [120, 30],
          itemStyle: { color: '#ff9800' },
        },
        {
          name: 'Mes Pasado',
          type: 'line',
          data: [100, 40],
          itemStyle: { color: '#3f51b5' },
        },
      ],
    };
  }

  // Gráfico de Porcentaje de Envíos por Estado
  initEnvioStatusPercentageChart() {
    this.envioStatusPercentageChart = {
      title: {
        text: '',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 18,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        top: '10%',
        data: ['Entregado', 'No Entregado', 'En Tránsito', 'Devuelto'],
      },
      series: [
        {
          name: 'Estados de Envío',
          type: 'pie',
          radius: '50%',
          center: ['50%', '60%'],
          data: [
            { value: 150, name: 'Entregado' },
            { value: 80, name: 'No Entregado' },
            { value: 50, name: 'En Tránsito' },
            { value: 20, name: 'Devuelto' },
          ],
          itemStyle: {
            color: (params: any) => {
              const colors = ['#4caf50', '#f44336', '#ffc107', '#9c27b0'];
              return colors[params.dataIndex];
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
}
