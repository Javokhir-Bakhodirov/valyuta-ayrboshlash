const currencies = [
	{ code: "USD", Rate: 12700 },
	{ code: "EUR", Rate: 13700 },
	{ code: "SUM", Rate: 1 },
	{ code: "RUB", Rate: 140 },
	{ code: "GBP", Rate: 16200 },
	{ code: "JPY", Rate: 95 },
	{ code: "AUD", Rate: 7500 },
	{ code: "CAD", Rate: 8500 },
	{ code: "CHF", Rate: 11500 },
	{ code: "CNY", Rate: 1600 },
];

// Load initial data to localStorage if not present
if (!localStorage.getItem("currencyRates")) {
	localStorage.setItem("currencyRates", JSON.stringify(currencies));
}

// Populate select elements with currency options
function populateSelects() {
	const fromCurrency = document.getElementById("fromCurrency");
	const toCurrency = document.getElementById("toCurrency");
	const updateCurrency = document.getElementById("updateCurrency");

	const storedCurrencies = JSON.parse(localStorage.getItem("currencyRates"));

	storedCurrencies.forEach((currency) => {
		const option = document.createElement("option");
		option.value = currency.code;
		option.textContent = currency.code;
		fromCurrency.appendChild(option.cloneNode(true));
		toCurrency.appendChild(option.cloneNode(true));
		updateCurrency.appendChild(option.cloneNode(true));
	});
}

// Exchange currency
function exchangeCurrency() {
	const fromCurrency = document.getElementById("fromCurrency").value;
	const toCurrency = document.getElementById("toCurrency").value;
	const amount = document.getElementById("amount").value;
	const outPut = document.getElementById("result");

	if (fromCurrency === toCurrency) {
		outPut.textContent = "Valyutalar bir xil bo'lishi mumkin emas.";
		return;
	}

	const rates = JSON.parse(localStorage.getItem("currencyRates"));

	const fromRate = rates.find((rate) => rate.code === fromCurrency);
	const toRate = rates.find((rate) => rate.code === toCurrency);

	if (fromRate === 0 || toRate === 0) {
		outPut.textContent = "Kurslar to'liq kiritilmagan.";
		return;
	}

	const result = amount * (fromRate.sellRate / toRate.sellRate);

	outPut.textContent = `${amount} ${fromCurrency} = ${result.toFixed(
		2
	)} ${toCurrency}`;
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
	populateSelects();
});
function updateRates() {
	const currencyCode = document.getElementById("updateCurrency").value;
	const buyRate = parseFloat(document.getElementById("buyRate").value);
	const sellRate = parseFloat(document.getElementById("sellRate").value);

	if (buyRate >= sellRate) {
		alert("Sotib olish kursi har doim sotish kursidan past bo'lishi kerak.");
		return;
	}

	let rates = JSON.parse(localStorage.getItem("currencyRates"));

	rates = rates.map((rate) => {
		if (rate.code === currencyCode) {
			return { ...rate, buyRate, sellRate };
		}
		return rate;
	});

	localStorage.setItem("currencyRates", JSON.stringify(rates));
	alert("Kurs yangilandi.");
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
	populateSelects();
});
