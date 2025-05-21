const form = document.getElementById("orderForm");
const totalEl = document.getElementById("totalPrice");

//pole ilosci gdy checkbox jest zaznaczony
document.querySelectorAll(".bouquet").forEach((box, i) => {
  const qty = document.getElementById("quantity" + (i + 1));
  box.addEventListener("change", () => {
    qty.disabled = !box.checked;
    if (!box.checked) qty.value = "";
    updatePrice();// przeliczenie ceny po zmianie
  });
});


function updatePrice() {
  let total = 0;



   // Cena za bukiety
  document.querySelectorAll(".bouquet").forEach((box, i) => {
    if (box.checked) {
      const qty = parseInt(document.getElementById("quantity" + (i + 1)).value) || 0;
      total += parseFloat(box.dataset.price) * qty;
    }
  });
// Cena za dodatkowe usługi
  document.querySelectorAll(".service:checked").forEach(service => {
    total += parseFloat(service.value);
  });

  totalEl.textContent = `Łączna cena: ${total} zł`;
}

// sptawdzenie formulara
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

   // Sprawdzenie danych kontaktowych
  ["firstName", "lastName", "phone", "email"].forEach(id => {
    const el = document.getElementById(id);
    const err = document.getElementById(id + "Error");
    err.textContent = "";

    if (!el.value.trim()) {
      err.textContent = "Wymagane";
      valid = false;
    } else if (id === "email" && !/\S+@\S+\.\S+/.test(el.value)) {
      err.textContent = "Błęd   email";
      valid = false;
    } else if (id === "phone" && !/^\d{9}$/.test(el.value)) {
      err.textContent = "9 cyfr";
      valid = false;
    }
  });

 // Sprawdzenie bukietów
  const bouquets = document.querySelectorAll(".bouquet");
  const bouquetError = document.getElementById("bouquetError");
  bouquetError.textContent = "";

  let hasBouquet = false;
  bouquets.forEach((box, i) => {
    const qty = document.getElementById("quantity" + (i + 1));
    if (box.checked) {
      hasBouquet = true;
      if (!qty.value || parseInt(qty.value) <= 0) {
        bouquetError.textContent = "Podaj ilość";
        valid = false;
      }
    }
  });

  if (!hasBouquet) {
    bouquetError.textContent = "Wybierz bukiet";
    valid = false;
  }


    // Jeśli wszystko jest OK — potwierdzenie i reset
  if (valid) {
    alert("Wszystko w porządku!");
    form.reset();
    document.querySelectorAll(".quantity").forEach(q => q.disabled = true);
    updatePrice();
  }
});

// Automatyczne przeliczanie ceny
document.querySelectorAll(".quantity, .service").forEach(el => {
  el.addEventListener("input", updatePrice);
});
