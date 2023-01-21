//Criação de variáveis para os text-area
const input = document.getElementById('text-input')
const output = document.getElementById('text-output')

//Criação das variáveis dos botões
const buttonEncrypt = document.getElementById('btn-encrypt')
const buttonDecrypt = document.getElementById('btn-decrypt')
const buttonCopy = document.getElementById('btn-copy')

const modalCopy = document.getElementById('modal-copy')
const textCopy = document.getElementById('modal-copy-text')

const key = ['a', 'e', 'i', 'o', 'u']
const encryptionKey = ['ai', 'enter', 'imes', 'ober', 'ufat']

let validEntry = true

//Ação de criptografar
buttonEncrypt.addEventListener('click', () => {
  if (validEntry && input.value != '') {
    removeBackground(output)
    output.textContent = encrypt(input.value)
    input.value = ''
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
  } else {
    alert('Escreva alguma coisa')
  }
})

//Ação de copiar texto criptografado
buttonCopy.addEventListener('click', () => {
  let encryptedMessage = output.value
  if (encryptedMessage != '') {
    navigator.clipboard.writeText(output.value)
    textCopy.textContent = 'Copiado com Sucesso!'
    modalCopy.classList.add('show-modal')
    setTimeout(() => {
      modalCopy.classList.remove('show-modal')
    }, 1400)
    output.value = ''
    restoreBackground(output)
  }
})

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

function removeBackground(element) {
  element.classList.add('remove-background')
}

function restoreBackground(element) {
  element.classList.remove('remove-background')
}
