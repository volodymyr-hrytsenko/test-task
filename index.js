let allText = '',
    arrData = null;

function readFile(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        // console.log(reader.result);
        allText = reader.result;
    };
    reader.onerror = function () {
        console.log(reader.error);
    };

}

function CSVToArray(strData) {
    const arr = strData.split('\r\n'),
        result = arr.map(el => {
            return el.split(',');
        });
    result.shift();
    return result;
}

function parseData(arrData) {
    const data = {},
        uniqueDate = {},
        arrResult = [
            []
        ],
        header = ['Name/Date'];

    arrData.forEach(element => {
        if (!data.hasOwnProperty(element[0])) {
            data[element[0]] = {};
        }
        data[element[0]][element[1]] = element[2];
        uniqueDate[element[1]] = 1;
    });

    const getOwnPropertyNames = Object.getOwnPropertyNames(data);
    const keys = Object.keys(uniqueDate);

    getOwnPropertyNames.forEach((key, index) => {
        arrResult[index] = [key];
        keys.forEach(date => {
            if (typeof data[key][date] !== 'undefined') {
                arrResult[index].push(data[key][date]);
            } else {
                arrResult[index].push('-');
            }
        });
    });

    keys.forEach(el => {
        header.push(changeFormatDate(el));
    });
    arrResult.unshift(header);

    return arrResult;
}

function changeFormatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function downloadNewCsv() {
    arrData = CSVToArray(allText);

    const rows = parseData(arrData);
    let csvContent = "data:text/csv;charset=utf-8," +
        rows.map(e => e.join(",")).join("\n");

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "new_data.csv");
    document.body.appendChild(link);
    link.click();
}