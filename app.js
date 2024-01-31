const getData = async (amount, base, to) => {
  let url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_23IQH3VBySCdE6mrxeN8StijJRlDSZdwzYRYnEMb&base_currency=${base}`;
  // url = "data.json";
  let response = await fetch(url);
  let result = await response.json();
  if (amount == "") {
    amount = 1;
  }
  document.querySelector(".base_currency_name_table").innerHTML = `1 ${base} to others`;
  document.querySelector(".loader").style.display = "none";
  document.querySelector(".currency-table").style.display = "block";
  document.querySelector(".conversion_box").style.display = "block";
  document.querySelector(".to_currency").innerHTML = to;
  document.querySelector(".base_currency").innerHTML = base;
  document.querySelector(".amount_to_convert").innerHTML = amount;
  for (key of Object.keys(result["data"])) {
    document.querySelector("tbody").innerHTML += `
    <tr class="bg-white dark:bg-gray-800">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              ${key}
            </th>
            <td class="px-6 py-4">
              ${(result["data"][key]["value"]).toFixed(5)}
            </td>
          </tr>`
    if (key == to) {
      document.querySelector(".converted_amount").innerHTML = (result["data"][key]["value"] * amount).toFixed(3);
    }
  }
};


document.querySelector("#submitBtn").addEventListener("click", () => {
  document.querySelector(".loader").style.display = "block";
  document.querySelector(".conversion_box").style.display = "none";
  document.querySelector(".currency-table").style.display = "none";
  let amount = document.querySelector("#amount");
  let baseCurrency = document.querySelector("#base_currency");
  let convCurrency = document.querySelector("#to_currency");

  getData(amount.value, baseCurrency.value, convCurrency.value);
});