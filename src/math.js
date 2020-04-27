const calculateTip = (total, tip = .25) => total + (total * tip)

const fahrenheitToCelsius = (tmp) => {
    return (tmp - 32) /1.8;
}

const celsiusToFahrenheit = (tmp) => {
    return (tmp * 1.8) + 32
}

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}