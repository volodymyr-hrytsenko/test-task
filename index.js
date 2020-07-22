let allText = '',
    arrData = null;

function readTextFile(file) {
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;

                // console.log(typeof(allText));
                // console.log(allText);
            }
        }
    };
    rawFile.send(null);
}

function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    let objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );

    let arr = [
        []
    ];

    let arrMatches = null;

    while (arrMatches = objPattern.exec(strData)) {
        let strMatchedDelimiter = arrMatches[1];

        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {
            arr.push([]);
        }

        let strMatchedValue;

        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            strMatchedValue = arrMatches[3];
        }
        arr[arr.length - 1].push(strMatchedValue);
    }
    return (arr);
}

readTextFile("file://C:/programming/test_task/acme_worksheet.csv");

arrData = CSVToArray(allText, ',');

console.log(arrData);


var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter((value, index, self) => {
    return self.indexOf(value) === index;
});

console.log(unique);