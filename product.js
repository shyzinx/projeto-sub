// ===============================
// PRODUCT.JS - VERSÃO FINAL
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // ===== Logout funcional =====
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado"); // remove login
      window.location.href = "login.html"; // redireciona
    });
  }

  // ===== Recupera dados do produto =====
  const product = JSON.parse(localStorage.getItem('produtoSelecionado'));
  const cartItemsContainer = document.getElementById('cartItems');

  if (product) {
    document.getElementById('mainImg').src = product.imagem;
    document.getElementById('productName').innerText = product.nome;
    document.getElementById('productDescription').innerText = product.desc || "Descrição padrão Sub Cultura.";
    document.getElementById('productPrice').innerText = product.preco;

    // Botões de tamanho
    const sizesBox = document.getElementById('sizesBox');
    const sizes = product.tamanhos || ["P","M","G","GG"];

    sizesBox.innerHTML = '';
    sizes.forEach(size => {
      const btn = document.createElement('button');
      btn.innerText = size;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.sizes-container button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });

      sizesBox.appendChild(btn);
    });
  }

  // ===== Contador de quantidade =====
  let quantity = 1;
  const qtySpan = document.getElementById('qty');

  document.getElementById('plusQty').addEventListener('click', () => {
    quantity++;
    qtySpan.innerText = quantity;
  });

  document.getElementById('minusQty').addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      qtySpan.innerText = quantity;
    }
  });

  // ===== Renderiza carrinho =====
  function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p id="emptyCartMsg" style="text-align:center; color:#888; margin-top:40px;">
        Seu carrinho está vazio.
      </p>`;
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.style.cssText =
        "display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px; color:#333;";

      itemDiv.innerHTML = `
        <div style="display:flex; gap:10px; align-items:center;">
          <img src="${item.imagem || 'logo.svg'}" style="width:45px; height:45px; object-fit:cover; border-radius:5px;">
          <div>
            <strong style="font-size:13px; display:block; max-width:150px;">${item.nome}</strong>
            <small style="color:#666;">Tam: ${item.tamanho} | Qnt: ${item.quantidade}</small>
          </div>
        </div>
        <button onclick="removeItem(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-weight:bold; font-size:12px;">
          Remover
        </button>
      `;

      cartItemsContainer.appendChild(itemDiv);
    });
  }

  // ===== Remover item =====
  window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };

  // ===== Adicionar ao carrinho =====
  document.getElementById('addToCart').addEventListener('click', () => {
    const tamanhoSelecionado = document.querySelector('.sizes-container button.active');
    if (!tamanhoSelecionado) {
      alert('Selecione um tamanho primeiro!');
      return;
    }

    const nome = document.getElementById('productName').textContent;
    const preco = document.getElementById('productPrice').textContent;
    const imagem = document.getElementById('mainImg').src;
    const quantidadeAtual = parseInt(document.getElementById('qty').textContent);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ✅ Verifica se já existe o produto com o mesmo tamanho
    const existingIndex = cart.findIndex(
      item => item.nome === nome && item.tamanho === tamanhoSelecionado.textContent
    );

    if (existingIndex >= 0) {
      // Se já existe, apenas atualiza a quantidade para a selecionada (não soma duplicado)
      cart[existingIndex].quantidade = quantidadeAtual;
    } else {
      // Se não existe, adiciona como novo item
      cart.push({
        nome,
        preco,
        imagem,
        quantidade: quantidadeAtual,
        tamanho: tamanhoSelecionado.textContent
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart(); // atualiza o carrinho
    openCart();   // abre o painel
  });

  // ===== Comprar agora =====
  document.getElementById('buyNow').addEventListener('click', () => {
    const tamanhoSelecionado = document.querySelector('.sizes-container button.active');
    if (!tamanhoSelecionado) {
      alert('Selecione um tamanho primeiro!');
      return;
    }

    alert('Redirecionando para o Checkout...');
    window.location.href = "checkout.html";
  });

  // ===== Painel do carrinho =====
  const cartPanel = document.getElementById('cartPanel');
  const overlay = document.getElementById('overlay');
  const closeCart = document.getElementById('closeCart');
  const openCartIcon = document.getElementById('openCart');

  function updateEmptyMsg() {
    const cartItems = document.getElementById('cartItems');
    const emptyMsg = document.getElementById('emptyCartMsg');
    const hasItems = cartItems.querySelectorAll('.cart-item').length > 0;
    if (emptyMsg) emptyMsg.style.display = hasItems ? 'none' : 'block';
  }

  const openCart = () => {
    cartPanel.classList.add('active');
    overlay.classList.add('active');
    renderCart();
    updateEmptyMsg();
  };

  const closeCartFunc = () => {
    cartPanel.classList.remove('active');
    overlay.classList.remove('active');
  };

  openCartIcon.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartFunc);
  overlay.addEventListener('click', closeCartFunc);

  // ===== Fechar carrinho com ESC =====
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closeCartFunc();
    }
  });

  // ===== Inicializa carrinho =====
  renderCart();
  updateEmptyMsg();

});
