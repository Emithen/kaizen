import { useState } from "react"
import { type Member, getNameById } from "./member"
import { getSum, getSumByPayerId, type Expense } from "./expense"
import { MEMBER_LIST, EXPENSE_LIST } from "./mock";
import { getBalanceList } from "./balance";
import { getTransferList } from "./transfer";

function App() {
  const [members] = useState(MEMBER_LIST);
  const [expenses] = useState(EXPENSE_LIST);

  return (
    <>
      <MemberList members={members} />
      <ExpenseList members={members} expenses={expenses} />
      <div>{getSum(expenses)} 원</div>

      <MemberExpenseList members={members} expenses={expenses} />

      <BalanceList members={members} expenses={expenses} />

      <TransferList members={members} expenses={expenses} />
    </>
  )
}

type MemberListProps = {
  members: Member[]
}
const MemberList = ({ members }: MemberListProps) => {
  return (
    <div>
      {members.map(member => <div key={member.id}>{member.name}</div>)}
    </div>
  )
}

type ExpenseListProps = {
  members: Member[]
  expenses: Expense[]
}
const ExpenseList = ({ members, expenses }: ExpenseListProps) => {
  return (
    <div>
      {expenses.map(expense => <div key={expense.id}>
        <div>{getNameById(expense.payerId, members)}</div>
        <div>{expense.description}</div>
        <div>{expense.amount} 원</div>
      </div>)}
    </div>
  )
}

type MemberExpenseListProps = {
  members: Member[]
  expenses: Expense[]
}
const MemberExpenseList = ({ members, expenses }: MemberExpenseListProps) => {
  return (
    <div>
      {members.map(member => 
        <div key={member.id}>
          <div>{member.name}</div>
          <div>{getSumByPayerId(member.id, expenses)} 원</div>
        </div>
      )}
    </div>
  )
}

type BalanceListProps = {
  members: Member[]
  expenses: Expense[]
}
const BalanceList = ({ members, expenses }: BalanceListProps) => {
  const balanceList = getBalanceList(members, expenses)

  return (
    <div>
      {balanceList.map(balance =>
        <div key={balance.memberId}>
          <div>{getNameById(balance.memberId, members)}</div>
          <div>{balance.amount} 원</div>
        </div>
      )}
    </div>
  )
}

type TransferListProps = {
  members: Member[]
  expenses: Expense[]
}
const TransferList = ({ members, expenses }: TransferListProps) => {
  const transferList = getTransferList(getBalanceList(members, expenses))

  return (
    <div>
      {transferList.map(transfer =>
        <div key={`${transfer.senderId}-${transfer.receiverId}`}>
          <div>{getNameById(transfer.senderId, members)}</div>
          <div>{getNameById(transfer.receiverId, members)}</div>
          <div>{transfer.amount} 원</div>
        </div>
      )}
    </div>
  )
}

export default App
