//Criação de variáveis para os text-area
const input = document.getElementById('text-input')
const output = document.getElementById('text-output')

//Criação das variáveis dos botões
const buttonEncrypt = document.getElementById('btn-encrypt')
const buttonDecrypt = document.getElementById('btn-decrypt')
const buttonCopy = document.getElementById('btn-copy')
const buttonClear = document.getElementById('btn-clear')

const errorList = document.getElementById('error')
const modalCopy = document.getElementById('modal-copy')
const textCopy = document.getElementById('modal-copy-text')

//Arrays de criptografia
const key = ['a', 'e', 'i', 'o', 'u']
const encryptionKey = ['ai', 'enter', 'imes', 'ober', 'ufat']

let validEntry = true

//Validação dos dados de entrada
input.addEventListener('input', () => {
  errorList.innerHTML = ''
  let error = validateInput(input.value)
  error.forEach(error => {
    let mensageError = document.createElement('li')
    mensageError.classList.add('icon-notification')
    mensageError.textContent = error
    errorList.appendChild(mensageError)
  })

  buttonEncrypt.classList.remove('blocked')
  buttonDecrypt.classList.remove('blocked')

  validEntry = true

  if (error.length > 0 || input.value == '') {
    buttonEncrypt.classList.add('blocked')
    buttonDecrypt.classList.add('blocked')

    validEntry = false
  }
})

//Ação de criptografar
buttonEncrypt.addEventListener('click', () => {
  if (validEntry && input.value != '') {
    removeBackground(output)
    output.textContent = encrypt(input.value)
    standard()
  } else {
    textCopy.textContent = 'Digite um texto'
    modalCopy.classList.add('show-modal')
    setTimeout(() => {
      modalCopy.classList.remove('show-modal')
    }, 1400)
  }
})

//Ação de desencriptografar
buttonDecrypt.addEventListener('click', () => {
  if (validEntry && input.value != '') {
    output.textContent = decrypt(input.value)
    standard()
  } else {
    textCopy.textContent = 'Digite um texto'
    modalCopy.classList.add('show-modal')
    setTimeout(() => {
      modalCopy.classList.remove('show-modal')
    }, 1400)
  }
})

//Ação de copiar texto criptografado
buttonCopy.addEventListener('click', () => {
  let messageCopy = document.getElementById('text-output')
  navigator.clipboard.writeText(messageCopy.value)
  if (messageCopy != '') {
    textCopy.textContent = 'Copiado com Sucesso!'
    modalCopy.classList.add('show-modal')
    setTimeout(() => {
      modalCopy.classList.remove('show-modal')
    }, 1400)
  }
})

buttonClear.addEventListener('click', () => {
  let encryptedMessage = output.value
  if (encryptedMessage != '') {
    output.value = ''
    restoreBackground(output)
    buttonCopy.classList.add('blocked')
    buttonClear.classList.add('blocked')
  }
  location.reload()
})

function standard() {
  input.value = ''
  removeBackground(output)
  buttonCopy.classList.remove('blocked')
  buttonClear.classList.remove('blocked')
  buttonEncrypt.classList.add('blocked')
  buttonDecrypt.classList.add('blocked')
}

//Função de criptografia
function encrypt(message) {
  for (let i = 0; i < key.length; i++) {
    message = message.replaceAll(key[i], encryptionKey[i])
  }
  return message
}

//Função de desincriptografia
function decrypt(message) {
  for (let i = 0; i < key.length; i++) {
    message = message.replaceAll(encryptionKey[i], key[i])
  }
  return message
}

//Funções para remoção e restauração da imagem
function removeBackground(element) {
  element.classList.add('remove-background')
}

function restoreBackground(element) {
  element.classList.remove('remove-background')
}

//Função para validar o texto
function validateInput(message) {
  let error = []
  let accentedText = false
  let containsNumber = false
  let accented = 'áéíóúàèìòùäëïöüâêîôûãõ'.split('')

  for (let i = 0; i < accented.length; i++) {
    let letter = accented[i]
    if (message.toLowerCase().includes(letter)) {
      accentedText = true
      break
    }
  }

  for (let i = 0; i < message.length; i++) {
    let letter = message[i]
    if (Number.isInteger(parseInt(letter))) {
      containsNumber = true
      break
    }
  }

  if (message.toLowerCase() != message) {
    error.push('Apenas letras minúsculas!')
  }

  if (containsNumber) {
    error.push('Não insira número!')
  }

  if (accentedText) {
    error.push('Não utilize acentuação!')
  }

  return error
}
