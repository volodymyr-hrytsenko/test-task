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
        ];

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
            if (typeof data[key][date] !== 'undefined'){
                arrResult[index].push(data[key][date]);
            }else{
                arrResult[index].push('-');
            }
        });
    });

    return arrResult;
}

function see() {
    arrData = CSVToArray(allText);

    // let test = parseData(arrData)

    console.log(parseData(arrData));
}












// const rows = [
//     ["name1", "city1", "some other info"],
//     ["name2", "city2", "more info"]
// ];

// let csvContent = "data:text/csv;charset=utf-8," +
//     rows.map(e => e.join(",")).join("\n");

// var encodedUri = encodeURI(csvContent);
// var link = document.createElement("a");
// link.setAttribute("href", encodedUri);
// link.setAttribute("download", "my_data.csv");
// document.body.appendChild(link);

// link.click();