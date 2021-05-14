const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

const button = document.getElementById("send");
const name = document.getElementById("name");
const rate = (amountEl_two.value * 1.1);


// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  
  
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = ((amountEl_one.value * rate) * 1.1).toFixed(2);
     
    });
}
// alert values
function send() {
  alert(
    "nome: " + name.value +
    "\n\nvalor a ser convertido: " + amountEl_one.value +
    "\nValor de taxa: " + rate.toFixed(2) +
    "\nValor após conversão: " + (amountEl_two.value));  
  }



// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

button.addEventListener("click", send);


swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
