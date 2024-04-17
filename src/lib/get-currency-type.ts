
export function getCurrencytype(currency: string | undefined){
  switch (currency) {
    case 'dolar':
      return '$'
    case 'euro':
      return '€'
    case 'pound':
      return '£'
    case 'iene':
      return '¥'
    case 'real':
      return 'R$'
    default:
      break;
  }
}