//Selecionando compontes
const generateButton = document.querySelector("#generateButton");
const copyButton = document.querySelector("#copyButton");
const lengthPassword = document.querySelector("#passwordLength");
const showPassword = document.querySelector("#generatedPassword");

//Pegando todos os caracteres possíveis para uma senha
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

generateButton.addEventListener("click", function (event) {
  event.preventDefault();

  const selectedLength = Number(lengthPassword.value);

  if (![8, 12, 16].includes(selectedLength)) {
    showToast("Selecione um tamanho válido para a senha!");
    return;
  }

  // Capturando os checkboxes marcados
  const selectedOptions = document.querySelectorAll(
    '.checkbox-group input[type="checkbox"]:checked'
  );

  // Se nenhum checkbox estiver marcado
  if (selectedOptions.length === 0) {
    showToast("Selecione ao menos um tipo de caractere para gerar a senha!");
    return;
  }

  // Montando a lista de caracteres permitidos
  let allowedCharacters = "";

  selectedOptions.forEach((checkbox) => {
    if (checkbox.id === "includeUppercase")
      allowedCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (checkbox.id === "includeLowercase")
      allowedCharacters += "abcdefghijklmnopqrstuvwxyz";
    if (checkbox.id === "includeNumbers") allowedCharacters += "0123456789";
    if (checkbox.id === "includeSymbols") allowedCharacters += "!@#$%&*";
  });

  // Capturando o tamanho da senha
  const passwordLength = Number(lengthPassword.value);

  // Gerando a senha
  let generatedPassword = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
    generatedPassword += allowedCharacters[randomIndex];
  }

  // Mostrando a senha no input de resultado
  showPassword.value = generatedPassword;
});

copyButton.addEventListener("click", function () {
  const password = showPassword.value;

  if (!password) {
    alert("Gere uma senha antes de copiar!");
    return;
  }

  navigator.clipboard
    .writeText(password)
    .then(() => {
      showToast("Senha copiada para a área de transferência!");
    })
    .catch((error) => {
      console.error("Erro ao copiar:", error);
      showToast("Não foi possível copiar a senha.");
    });
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000); // Toast fica visível por 2 segundos
}
