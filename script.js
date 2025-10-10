const generateButton = document.querySelector('#generateButton')
const copyButton = document.querySelector('#copyButton')
const lengthPassword = document.querySelector('#passwordLength')
const showPassword = document.querySelector('#generatedPassword')

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'

generateButton.addEventListener('click', function (event) {
  event.preventDefault()

  const selectedLength = Number(lengthPassword.value)

  if (![8, 12, 16].includes(selectedLength)) {
    showToast('Select a valid password length!')
    return
  }

  const selectedOptions = document.querySelectorAll(
    '.checkbox-group input[type="checkbox"]:checked'
  )

  if (selectedOptions.length === 0) {
    showToast('Select at least one character type to generate the password!')
    return
  }

  // Montando a lista de caracteres permitidos
  let allowedCharacters = ''

  selectedOptions.forEach((checkbox) => {
    if (checkbox.id === 'includeUppercase')
      allowedCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (checkbox.id === 'includeLowercase')
      allowedCharacters += 'abcdefghijklmnopqrstuvwxyz'
    if (checkbox.id === 'includeNumbers') allowedCharacters += '0123456789'
    if (checkbox.id === 'includeSymbols') allowedCharacters += '!@#$%&*'
  })

  const passwordLength = Number(lengthPassword.value)

  let generatedPassword = ''

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * allowedCharacters.length)
    generatedPassword += allowedCharacters[randomIndex]
  }

  showPassword.value = generatedPassword
})

copyButton.addEventListener('click', function () {
  const password = showPassword.value

  if (!password) {
    alert('Generate a password before copying!')
    return
  }

  navigator.clipboard
    .writeText(password)
    .then(() => {
      showToast('Senha copiada para a área de transferência!')
    })
    .catch((error) => {
      console.error('Error when copying:', error)
      showToast('Password copied to clipboard!')
    })
})

function showToast(message) {
  const toast = document.getElementById('toast')
  toast.textContent = message
  toast.classList.add('show')

  setTimeout(() => {
    toast.classList.remove('show')
  }, 2000)
}
