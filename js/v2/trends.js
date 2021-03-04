// Color scheme
let pMain = "#1a237e"; //'rgb(26,35,126)';
    pLight = "#534bae";
    pDark = "#000051";
    sMain = "#ffab00";
    sLight = "#ffdd4b";
    sDark = "#c67c00";

let normal = "#00c853";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#ff6f00";

var sun = new Image();
var moon = new Image();
var earth = new Image();



/**
 * @param {*} chartName The chart variable name
 * @param {*} dataInput The new dataset 
 * @param {*} refInput  The new labels
 */
function changeChartData(chartName, data, label) {
    chartName.data.datasets = data;
    chartName.data.labels = label;
    chartName.update();
}

function sortByData(data, labels){

    console.log(data, labels);
    //1) combine the arrays:
    var list = [];
    for (var j = 0; j < data.length; j++) 
        list.push({'value': data[j], 'label': labels[j]});

    //2) sort:
    list.sort(function(a, b) {
        return ((a.value < b.value) ? -1 : ((a.value == b.value) ? 0 : 1));
        //Sort could be modified to, for example, sort on the age 
        // if the name is the same.
    });

    //3) separate them back out:
    for (var k = 0; k < list.length; k++) {
        data[k] = list[k].value;
        labels[k] = list[k].label;
    }

    return data, labels;
}

// Load row
function loadRow(table_id, data){
    let tableRef = document.getElementById(table_id).getElementsByTagName('tbody')[0];
    let rowsCount = document.getElementById(table_id).rows[0].cells.length;

    // Insert a row in the table at the last row
    console.log(tableRef)
    let newRow   = tableRef.insertRow();
    newRow.className = "mdc-data-table__row";
    for(let i = 0; i < rowsCount; i++){
        let newCell  = newRow.insertCell(i);
        newCell.innerHTML = data[i][0];

        if(data[i][1] == true){
            newCell.className = "mdc-data-table__cell mdc-data-table__cell--numeric"
        } else {
            newCell.className = "mdc-data-table__cell"
        }
    }
};

// Load row
function loadRowWithColor(table_id, data){
    let tableRef = document.getElementById(table_id).getElementsByTagName('tbody')[0];
    let rowsCount = document.getElementById(table_id).rows[0].cells.length;

    // Insert a row in the table at the last row
    console.log(tableRef)
    let newRow   = tableRef.insertRow();
    newRow.className = "mdc-data-table__row";

    for(let i = 0; i < rowsCount; i++){
        let newCell  = newRow.insertCell(i);
        newCell.innerHTML = data[i][0];

        if(data[i][1] == true){
            newCell.className = "mdc-data-table__cell mdc-data-table__cell--numeric"

            if (data[i][0] == 1) {
                newCell.style = "background-color: " + pMain + "; color: " + pMain;
                // Object.assign(newCell.style,{
                //     "background-color": pMain,
                //     color: pMain,
                //     margin:"5px",
                //     display: 'block'
                // });
            } else {
                // Object.assign(newCell.style, {
                //     "background-color": "red",
                //     color: "red",
                //     margin: "5px",
                //     display: "block"


                // });
            }
        } else {
            newCell.className = "mdc-data-table__cell"
        }
    }
};

//onload
function createTable(){
    let months = ['January', 'February', 'March', 'April', 'May']
    //Generate rows
    for(let i = 0; i < 5; i++){
        let data = [
            [months[i], false],
            [631, true],
            [Math.floor(Math.random() * 100) + 100, true],
            [Math.floor(Math.random() * 300), true],
            [Math.floor(Math.random() * 150), true],
            [Math.floor(Math.random() * 150), true],
            [Math.floor(Math.random() * 150), true],
        ];
        loadRow('routeTable', data);
    };

    //Event listeners for specific headers ('hover-icon' class)
    let columns = document.getElementById('routeTable').getElementsByTagName('th');
    for(let i = 0; i < columns.length; i++){
        let column = columns[i];
        if(column.classList.contains("hover-icon")){
            column.addEventListener('click', function(event) {
                function sortedToFalse(){
                    for(let i = 0; i < columns.length; i++){
                        if(columns[i] !== column && columns[i].classList.contains('hover-icon')){
                            let otherCol = columns[i];
                            otherCol.setAttribute("data-sorted", "no");
                            let icon = otherCol.firstChild;
                            icon.innerHTML = "arrow_upward";
                            icon.style.visibility = "hidden";
                        }
                    };
                };

                let sorted = column.getAttribute("data-sorted");
                if(sorted == "no"){
                    sortTableDescending(i, "routeTable");
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                } else if(sorted == "desc"){
                    sortTableAscending(i, "routeTable");
                    sortedToFalse();
                    column.setAttribute("data-sorted", "asc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_downward";
                    icon.style.visibility = "visible";
                } else if(sorted == "asc"){
                    sortTableDescending(i, "routeTable");
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                }
            });
        }
    }
    return;
}
createTable();

//Ascending
function sortTableAscending(col, id) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(id);
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];

            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function sortTableDescending(col, id){
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(id);
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col];
            y = rows[i + 1].getElementsByTagName("TD")[col];
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


//onload
function createSecondTable(){
    let ids = ['A11', 'A12', 'B12', 'C12', 'C13', 'D12']
    let machines = ['Bridle 5.1', 'Bridle 5.2', 'Bridle 6.1', 'Bridle 6.2', 'Bridle 7.1', 'Bridle 7.2']
    let facilities = ['KBW', 'KBW','KBW','KBW','KBW','KBW']
    //Generate rows
    for(let i = 0; i < 6; i++){
        let data = [
            [ids[i], false],
            [machines[i], false],
            [facilities[i], false],
            [Math.round(Math.random()), true],
            [Math.round(Math.random()), true],
            [Math.round(Math.random()), true],
            [Math.round(Math.random()), true],
            [Math.round(Math.random()), true]
        ];
        loadRowWithColor('assetOverTime', data);
    };

    //Event listeners for specific headers ('hover-icon' class)
    let columns = document.getElementById('assetOverTime').getElementsByTagName('th');
    for(let i = 0; i < columns.length; i++){
        let column = columns[i];
        if(column.classList.contains("hover-icon")){
            column.addEventListener('click', function(event) {
                function sortedToFalse(){
                    for(let i = 0; i < columns.length; i++){
                        if(columns[i] !== column && columns[i].classList.contains('hover-icon')){
                            let otherCol = columns[i];
                            otherCol.setAttribute("data-sorted", "no");
                            let icon = otherCol.firstChild;
                            icon.innerHTML = "arrow_upward";
                            icon.style.visibility = "hidden";
                        }
                    };
                };

                let sorted = column.getAttribute("data-sorted");
                if(sorted == "no"){
                    sortTableDescending(i,'assetOverTime');
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                } else if(sorted == "desc"){
                    sortTableAscending(i, 'assetOverTime');
                    sortedToFalse();
                    column.setAttribute("data-sorted", "asc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_downward";
                    icon.style.visibility = "visible";
                } else if(sorted == "asc"){
                    sortTableDescending(i, 'assetOverTime');
                    sortedToFalse();
                    column.setAttribute("data-sorted", "desc");

                    let icon = column.firstChild;
                    icon.innerHTML = "arrow_upward";
                    icon.style.visibility = "visible";
                }
            });
        }
    }
    return;
}
createSecondTable();


//Chart 2: asset health by alarms generated
let ctx4 = document.getElementById('assetHealth').getContext('2d');
var myDoughnutChart = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [65, 5, 10,20],
            backgroundColor: [
                pMain, lvl_2, lvl_4
            ]
        }],
        labels: [
            'Normal',
            'Warning',
            'Alarm',
            'Unknown'
        ]
    },
    options: {
        cutoutPercentage: 70,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        elements: {
            center: {
                text: '65%',
                fontStyle: 'Arial', 
                sidePadding: 50, 
                minFontSize: 10, 
                lineHeight: 10 
            }
        }
    }
});


Chart.defaults.doughnut.cutoutPercentage  = 0.7;
Chart.pluginService.register({
    beforeDraw: function(chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.chart.ctx;

        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 40;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt.split(' ');
        var line = '';
        var lines = [];

        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (var n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    }
});