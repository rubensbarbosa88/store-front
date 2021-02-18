export const moneyToNumber = money => {
  if (money) {
    money = money.replace(/[.]/g, '')
    money = money.replace(',', '.')
  }

  return Number(money)
}

export const numberToMoney = number => {
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export default {
  moneyToNumber,
  numberToMoney
}
