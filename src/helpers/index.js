export const moneyToNumber = money => {
  if (money) {
    money = money.replace(/[.]/g, '')
    money = money.replace(',', '.')
  }

  return Number(money)
}

export default {
  moneyToNumber
}
