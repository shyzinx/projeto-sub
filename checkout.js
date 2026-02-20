document.addEventListener("DOMContentLoaded", function () {

  // 🔒 Verifica login
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Você precisa estar logado para acessar o checkout!");
    window.location.href = "login.html";
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkoutItems");
  const totalPriceElement = document.getElementById("totalPrice");

  if (cart.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  let total = 0;

  cart.forEach(item => {

    const priceNumber = parseFloat(
      item.preco.replace("R$", "").replace(",", ".")
    );

    const subtotal = priceNumber * item.quantidade;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("checkout-item");

    div.innerHTML = `
      <span>${item.nome} (${item.tamanho}) x${item.quantidade}</span>
      <span>R$ ${subtotal.toFixed(2).replace(".", ",")}</span>
    `;

    container.appendChild(div);
  });

  totalPriceElement.textContent =
    "Total: R$ " + total.toFixed(2).replace(".", ",");

  // 🧾 Finalizar pedido
  document.getElementById("finishOrder").onclick = function () {

    alert("Compra finalizada com sucesso! 🔥");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
  };

});
