//http://data.fixer.io/api/latest?access_key=407db1d0506be20c678b766ff7d31b05

/*const getExanchangeRate = (from, to) => {
    return axios.get('http://data.fixer.io/api/latest?access_key=407db1d0506be20c678b766ff7d31b05').then((response) => {
        const euro = 1 / response.data.rates[from];
        const rate =  euro * response.data.rates[to];

        return rate;
    });
};*/

const axios = require('axios');

const getExanchangeRate = async (from, to) => {
    try {
        const response = await  axios.get('http://data.fixer.io/api/latest?access_key=407db1d0506be20c678b766ff7d31b05');
        const euro = 1 / response.data.rates[from];
        const rate =  euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }
    
        return rate;
    } catch (e) {
        throw new Error(`Unabled to get Exchange rate for ${from} and ${to}.`);
    }
};

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((countries) => countries.name);
    } catch (e) {
        throw new Error(`Unabled to get countries that use ${currencyCode}.`)
    }
}

const convertCurrency = async (from, to, amount) => { 
    const ExchangeRate = await getExanchangeRate(from, to);
    const convertedAmount = (amount * ExchangeRate).toFixed(2);
    const countries = await getCountries(to);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the fllowing countries ${countries.join(' , ')}`;
}


convertCurrency('USD', 'CAD', 20).then((message) => {
    console.log(message);
}).catch((e) => {
    console.log(e.message);
});
