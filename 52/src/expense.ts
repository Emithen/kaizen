import type { Member } from "./member";

export type Expense = {
  id: number,
  payerId: number,
  description: string,
  amount: number
};

export const getSum = (expenses: Expense[]): number => {
  let sum = 0

  expenses.forEach(expense => sum += expense.amount)

  return sum
}

export const getSumByPayerId = (payerId: number, expenses: Expense[]): number => {
  let sum = 0

  const specified = expenses.filter(expense => expense.payerId === payerId)
  specified.forEach(expense => sum += expense.amount)

  return sum
}

export const getSplitById = (memberId: number, members: Member[], expenses: Expense[]): number => {
  let split = 0

  // 몫과 나머지를 구하자
  const sum = getSum(expenses)
  const p = members.length

  if (p === 0) return 0

  const quotient = Math.floor(sum / p)
  const remainder = sum % p

  split += quotient

  // payer 의 위상 구하기
  const position = members.findIndex(member => member.id === memberId)

  if (position === -1) return 0

  // 분기
  if (position < remainder) split += 1

  return split
}

export const getBalanceById = (memberId: number, members: Member[], expenses: Expense[]): number => {
  let balance = 0

  // 결제액, 부담액 구하기
  const sum = getSumByPayerId(memberId, expenses)
  const split = getSplitById(memberId, members, expenses)
  
  // 잔액 구하기
  balance = sum - split

  return balance
}
