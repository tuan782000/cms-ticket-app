// create and download csv
export const createCSV = (array: any[]) => {
    let keys = Object.keys(array[0])
    let result = ''
    result += keys.join(',');
    result += '\n';
    array.forEach(function (item) {
        keys.forEach(function (key) {
            result += item[key] + ',';
        })
        result += '\n';
    })

    return result;
}
export const downloadCSV = (array: any, fileName: string) => {
    console.log(createCSV(array))
    let csv = 'data:text/csv;charset=utf-18,\uFEFF' + createCSV(array);
    let excel = encodeURI(csv);

    let link = document.createElement('a');
    link.setAttribute('href', excel);
    link.setAttribute('download', `${fileName}.csv`);
    link.click();
}