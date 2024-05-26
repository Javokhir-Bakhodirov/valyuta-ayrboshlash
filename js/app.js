const currencies = [
	{ code: "USD", buyRate: 12640, sellRate: 12700 },
	{ code: "EUR", buyRate: 13500, sellRate: 13700 },
	{ code: "SUM", buyRate: 1, sellRate: 1 },
	{ code: "RUB", buyRate: 132, sellRate: 140 },
	{ code: "GBP", buyRate: 1578, sellRate: 16200 },
	{ code: "JPY", buyRate: 80, sellRate: 95 },
	{ code: "AUD", buyRate: 7200, sellRate: 7500 },
	{ code: "CAD", buyRate: 8000, sellRate: 8500 },
	{ code: "CHF", buyRate: 11000, sellRate: 11500 },
	{ code: "CNY", buyRate: 1550, sellRate: 1600 },
];

// Load initial data to localStorage if not present
if (!localStorage.getItem("currencyRates")) {
	localStorage.setItem("currencyRates", JSON.stringify(currencies));
}

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

document.addEventListener("DOMContentLoaded", () => {
	populateSelects();
});
