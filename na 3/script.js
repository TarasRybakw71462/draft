document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Reset komunikatów błędów
  const fields = ["bouquet", "quantity", "firstName", "lastName", "phone", "email"];
  let valid = true;

  fields.forEach(id => {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");
    error.textContent = "";

    if (!input.value.trim()) {
      error.textContent = "To pole jest wymagane";
      valid = false;
    } else if (id === "email" && !/\S+@\S+\.\S+/.test(input.value)) {
      error.textContent = "Nieprawidłowy email";
      valid = false;
    } else if (id === "phone" && !/^[0-9]{9}$/.test(input.value)) {
      error.textContent = "Podaj 9-cyfrowy numer";
      valid = false;
    } else if (id === "quantity" && parseInt(input.value) <= 0) {
      error.textContent = "Podaj liczbę większą od zera";
      valid = false;
    }
  });

  if (valid) {
    alert("Zamówienie zostało wysłane!");
    document.getElementById("orderForm").reset();
  }
});
