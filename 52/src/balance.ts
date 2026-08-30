import { getBalanceById, type Expense } from "./expense"
import type { Member } from "./member"

export type Balance = {
  memberId: number
  amount: number
}

export const getBalanceList = (members: Member[], expenses: Expense[]): Balance[] => {
  let balanceList: Balance[]

  balanceList = members.map(member => ({
    memberId: member.id,
    amount: getBalanceById(member.id, members, expenses)
  }))

  return balanceList
}
