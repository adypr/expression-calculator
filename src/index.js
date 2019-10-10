function expressionCalculator(expr) {
    // write your solution here

    

    let str = expr.split('').filter(str => str !== " ").join('');

    if (/\/0(?!\.)/.test(str)) {
        throw new Error("TypeError: Division by zero.");
    }

    const templateNum = '[\\-\\+]?\\d+\\.*\\d*';
    const templateSum = new RegExp(templateNum, 'g');
    const templateMultDiv = new RegExp(templateNum + '[\\*\\/]' + templateNum);
    const templateBrackets = /\([\d\+\-\*\/\.]+\)/;
    

    if (/[\(\)]/.test(str)) {
        if (str.search(templateBrackets) === -1) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
        let expressionBrackets = str.match(templateBrackets).join('').split('').filter(elem => !/[\(\)]/.test(elem)).join('');
        let count = expressionCalculator(expressionBrackets);
        return expressionCalculator(str.replace(templateBrackets, count));
    }
    

    if (/[\*\/]/.test(str)) {
        let exprMultDiv = str.match(templateMultDiv).join('');
        let num1 = exprMultDiv.match('^' + templateNum).join('');
        let num2 = exprMultDiv.match(templateNum + '$').join('');
        let countMultDiv = /\*/.test(exprMultDiv) ? Number(num1) * Number(num2) : Number(num1) / Number(num2);
        let res = countMultDiv < 0 ? str.replace(exprMultDiv, countMultDiv) : str.replace(exprMultDiv, '+' + countMultDiv);
        return expressionCalculator(res);
    }

    if (str.match(/\-*\d+/g).length !== 1) {
        const count = str.replace('--', '+').match(templateSum).reduce((acc, elem) => Number(elem) + acc, 0);
        return count;
    }
    
    return Number(str);

}

module.exports = {
    expressionCalculator
}


//console.log(expressionCalculator("1 / 0"));

