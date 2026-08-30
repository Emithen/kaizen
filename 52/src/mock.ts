import { type Member } from "./member"
import { type Expense } from "./expense"

export const MEMBER_LIST: Member[] = [
  {
    id: 1,
    name: "이상해씨",
  },
  {
    id: 2,
    name: "꼬부기",
  },
  {
    id: 3,
    name: "파이리",
  },
]

export const EXPENSE_LIST: Expense[] = [
  {
    id: 1,
    payerId: 1,
    description: "택시비",
    amount: 15000,
  },
  {
    id: 2,
    payerId: 3,
    description: "중국집",
    amount: 42000,
  },
  {
    id: 3,
    payerId: 2,
    description: "카페",
    amount: 18500,
  },
  {
    id: 4,
    payerId: 2,
    description: "당구장",
    amount: 12000,
  },
  {
    id: 5,
    payerId: 1,
    description: "2차",
    amount: 61800,
  },
]
