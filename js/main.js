// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

// Dummy data - metrics
let date_range = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'];
let workorders = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let readings = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let reports = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let totalCosts = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));
let totalSavings = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40));

// Dummy data - thresholds / references
let _workorders = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 20));
let _readings = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];
let _reports = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 10));
let _totalCosts = Array.from({length: date_range.length}, () => Math.floor(Math.random() * 25));
let _totalSavings = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30];

// Line graph
let ctx = document.getElementById('myChart_1').getContext('2d');
let chart1 = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: date_range,
        datasets: [{
            label: 'n. of workorders',
            fill: false,
            borderColor: pMain,
            data: workorders,
            pointStyle: 'line'
        },
        {
            label: "Last week",
            fill: false,
            borderColor: pMain,
            borderDash: [5,2],
            data: _workorders,
            pointStyle: 'line'
        }]
    },

    // Configuration options go here
    options: {
        legend: {
            display: true,
            position: 'bottom',
            align: 'end',
            labels: {
                usePointStyle: true
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
                borderWidth: 2
            },
            point:{
                radius: 0 //hide data point indicators
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: 15,
                    autoSkip: true, //!important
                    maxRotation: 0, 
                    minRotation: 0
                }
            }],
            yAxes: [{
                gridLines: {
                    display:true,
                },
                position: 'right',
            }]
        }
    }
});

//Scatter plot
let ctx2 = document.getElementById('myChart_2').getContext('2d');
let chart2 = new Chart(ctx2, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: -5
            },{
                x: 7,
                y: -2
            },{
                x: 1,
                y: 4
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});

function changeChartType(evt, chartName, dataInput, refInput='None') {
    let i, tabcontent, tablinks;
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // chartName.data.datasets.forEach((dataset) => {
    //     dataset.labels = date_range;
    //     dataset.data = dataInput;
    // });
    chartName.data.datasets[0].data = dataInput;
    chartName.data.datasets[0].label = 'n. of ' + evt.currentTarget.getElementsByClassName("chart-title")[0].innerText;

    chartName.data.datasets[1].data = refInput;
    // chartName.data.datasets[0].data = dataInput;

    chart1.update();
    evt.currentTarget.className += " active";
}
  
// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();
function addData(data, index) {
    console.log(data, index)
    chart1.data.labels.push("new");
    chart1.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart1.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function updateScales(chart) {
    var xScale = chart.scales['x-axis-0'];
    var yScale = chart.scales['y-axis-0'];

    chart.options.scales = {
        xAxes: [{
            id: 'newId',
            display: true
        }],
        yAxes: [{
            display: true,
            type: 'logarithmic'
        }]
    };

    chart.update();
    // need to update the reference
    xScale = chart.scales['newId'];
    yScale = chart.scales['y-axis-0'];
}