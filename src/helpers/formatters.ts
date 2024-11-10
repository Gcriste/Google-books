import { format } from 'date-fns/format'

export const formatPrice = (priceObj?: {
  amount: number
  currencyCode: string
}) => {
  if (!priceObj) return
  const { amount, currencyCode } = priceObj

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  })

  return formatter.format(amount)
}

export const formatDate = (date?: string) => {
  if (!date) return
  return format(date, 'MMMM dd, yyyy')
}
