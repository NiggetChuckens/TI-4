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

  // Variables para almacenar los nombres de los meses y los datos
  meses: string[] = [];
  datosEntregados: number[] = [];
  datosDevueltos: number[] = [];

  constructor() {}

  ngOnInit() {
    this.initEnvioStatusChart();
    this.initEnvioStatusPercentageChart();
    this.initEnvioComparativaMensualChart();
  }

  // Gráfico de Estado de Envíos
  initEnvioStatusChart() {
    this.envioStatusChart = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Entregado', 'No Entregado', 'En Tránsito', 'Devuelto'],
        top: 'bottom',
        textStyle: {
          color: '#333',
        },
      },
      grid: {
        left: '5%',
        right: '5%',
        top: '10%',
        bottom: '15%',
        containLabel: true,
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
          data: [130],
          itemStyle: {
            color: '#4caf50',
            barBorderRadius: [5, 5, 0, 0],
          },
        },
        {
          name: 'No Entregado',
          type: 'bar',
          data: [80],
          itemStyle: {
            color: '#f44336',
            barBorderRadius: [5, 5, 0, 0],
          },
        },
        {
          name: 'En Tránsito',
          type: 'bar',
          data: [50],
          itemStyle: {
            color: '#ffc107',
            barBorderRadius: [5, 5, 0, 0],
          },
        },
        {
          name: 'Devuelto',
          type: 'bar',
          data: [20],
          itemStyle: {
            color: '#9c27b0',
            barBorderRadius: [5, 5, 0, 0],
          },
        },
      ],
    };
  }

  // Gráfico de Porcentaje de Envíos por Estado (Corregido)
  initEnvioStatusPercentageChart() {
    const data = [
      { value: 130, name: 'Entregado' },
      { value: 80, name: 'No Entregado' },
      { value: 50, name: 'Tránsito' },
      { value: 20, name: 'Devuelto' },
    ];

    this.envioStatusPercentageChart = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        top: 'bottom',
        data: ['Entregado', 'No Entregado', 'En Tránsito', 'Devuelto'],
        textStyle: {
          color: '#333',
        },
      },
      series: [
        {
          name: 'Estados de Envío',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          data: data,
          label: {
            show: true,
            position: 'outside',
            formatter: '{d}%', // Mostramos solo el porcentaje
            color: '#333',
            fontSize: 12, // Ajusta el tamaño de fuente según sea necesario
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
            color: (params: any) => {
              const colors = ['#4caf50', '#f44336', '#ffc107', '#9c27b0'];
              return colors[params.dataIndex];
            },
          },
          emphasis: {
            scale: true,
            scaleSize: 10,
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
              formatter: '{d}%', // Mostramos solo el porcentaje en el énfasis
            },
            itemStyle: {
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  // Gráfico de Comparativa Mensual de Envíos (sin cambios)
  initEnvioComparativaMensualChart() {
    this.obtenerMeses();
    this.obtenerDatosEnvios();

    this.envioComparativaMensualChart = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Entregados', 'Devueltos'],
        top: 'bottom',
        textStyle: {
          color: '#333',
        },
      },
      grid: {
        left: '5%',
        right: '5%',
        top: '10%',
        bottom: '20%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: this.meses,
        axisLabel: {
          interval: 0, // Mostrar todas las etiquetas
          rotate: 0,   // Ajustar si es necesario
          color: '#333',
          fontSize: 12, // Ajustar el tamaño si es necesario
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
          name: 'Entregados',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: this.datosEntregados,
          itemStyle: { color: '#4caf50' },
          label: {
            show: true,
            position: 'top',
            formatter: (params: any) => {
              return isNaN(params.data) ? 'Sin datos' : '';
            },
            color: '#ff0000',
          },
        },
        {
          name: 'Devueltos',
          type: 'line',
          smooth: true,
          areaStyle: {},
          data: this.datosDevueltos,
          itemStyle: { color: '#f44336' },
          label: {
            show: true,
            position: 'top',
            formatter: (params: any) => {
              return isNaN(params.data) ? 'Sin datos' : '';
            },
            color: '#ff0000',
          },
        },
      ],
    };
  }

  // Función para obtener los nombres de los meses sin el año
  obtenerMeses() {
    const mesesNombres = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // Mes actual (0-11)

    this.meses = [];

    for (let i = 2; i >= 0; i--) {
      let mes = (mesActual - i + 12) % 12;
      this.meses.push(mesesNombres[mes]);
    }
  }

  // Función para obtener los datos de envíos
  obtenerDatosEnvios() {
    // Simulación de datos, reemplaza esto con tu lógica real
    const datosSimulados: {
      [key: string]: { entregados: number | null; devueltos: number | null };
    } = {
      [this.meses[0]]: { entregados: 202, devueltos: 50 }, // Mes anterior 2 (sin datos)
      [this.meses[1]]: { entregados: 120, devueltos: 25 },   // Mes anterior 1 (con datos)
      [this.meses[2]]: { entregados: 130, devueltos: 15 },   // Mes actual (con datos)
    };

    // Convertimos los datos al formato necesario para el gráfico, reemplazando null por NaN
    this.datosEntregados = this.meses.map((mes) => {
      const datosMes = datosSimulados[mes];
      return datosMes && datosMes.entregados !== null ? datosMes.entregados : NaN;
    });

    this.datosDevueltos = this.meses.map((mes) => {
      const datosMes = datosSimulados[mes];
      return datosMes && datosMes.devueltos !== null ? datosMes.devueltos : NaN;
    });
  }
}
