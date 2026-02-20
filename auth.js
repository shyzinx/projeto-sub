// ===============================
// CONTROLE GLOBAL DE AUTENTICAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  // ===== Logout funcional =====
  const logoutBtn = document.querySelector(".logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Remove qualquer usuário que esteja logado
      localStorage.removeItem("user");
      localStorage.removeItem("usuarioLogado");

      // Redireciona para login
      window.location.href = "login.html";
    });
  }

  // ===== Mostrar usuário (apenas visual) =====
  const userNameElement = document.querySelector(".user-name");
  const user = JSON.parse(localStorage.getItem("user"));

  if (userNameElement) {
    if (user && user.name) {
      userNameElement.textContent = `Olá, ${user.name}`;

      const profileName = document.getElementById("profileName");
      const profileEmail = document.getElementById("profileEmail");

      if (profileName) profileName.textContent = user.name;
      if (profileEmail) profileEmail.textContent = user.email || "";
    } else {
      userNameElement.textContent = "Visitante";
    }
  }

});
