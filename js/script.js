const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");

const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

const button = document.getElementById("send");
const name = document.getElementById("name");
const prefix_one = document.getElementById("currency-one");
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
 
function prefix(){
  if(prefix_one.value == "BRL"){
    prefix_one.value = "R$";
  } else if(prefix_one.value == "EUR"){
    prefix_one.value = "€";
  }else if(prefix_one.value == "INR"){
    prefix_one.value = "₹";
  }else if(prefix_one.value == "USD"){
    prefix_one.value = "$";
  }else {
    prefix_one.value = "i!error!i"; 
  }
}
// alert values
// function send() {
//   alert(
//     "nome: " + name.value +
//     "\n\nvalor a ser convertido: " + amountEl_one.value +
//     "\nValor de taxa: " + rate.toFixed(2) +
//     "\nValor após conversão: " + (amountEl_two.value));  
//   }

function rel(){

  

  var doc = new jsPDF()
  doc.setFontSize(22);
  
  doc.setFont("helvetica", "bold");
  doc.text("Relatório", 105, 10, null, null, "center");
  
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text("Nome: " + name.value, 10, 30);
  doc.text("Valor a ser convertido: " + prefix_one.value + amountEl_one.value,  10, 50);
  doc.text("Moeda de entrada: " + currencyEl_one.value, 145, 50);
  
  doc.text("Valor Após a conversão: " + amountEl_two.value, 10, 70);
  doc.text("Moeda de saída: " + currencyEl_two.value, 145, 70);
  
  // doc.tex("Taxa de conversão: " + tax.value, 10, 90);
  doc.save('A4.pdf');
  
  }


// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
button.addEventListener("click", prefix);

if (button != null){
  
  button.addEventListener("click", rel);
}


//limitar o swap
swap.addEventListener("click", function(event){
  event.preventDefault("send");
});

// Botão swap
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();



