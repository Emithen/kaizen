import type { Balance } from "./balance"

export type Transfer = {
  senderId: number
  receiverId: number
  amount: number
}

export const getTransferList = (balances: Balance[]) => {
  // balances 를 순회
  // 양수와 음수를 두 개의 리스트로 분리
  // 양수와 음수를 동시 순회 (투포인터)
  
  let r_balances
  let s_balances

  r_balances = balances
    .filter(balance => balance.amount > 0)
    .map(balance => ({ ...balance }))
  s_balances = balances
    .filter(balance => balance.amount < 0)
    .map(balance => ({ ...balance }))

  let transferList: Transfer[] = []

  let r_id = 0
  let s_id = 0

  while (r_id < r_balances.length && s_id < s_balances.length) {
    let amount: number
    let transfer: Transfer

    // r_balances[r_id].amount 와 s_balances[s_id].amount 의 절댓값을 비교해서 작은 쪽을 송금액으로 선택
    amount = Math.min(r_balances[r_id].amount, -s_balances[s_id].amount)

    r_balances[r_id].amount -= amount
    s_balances[s_id].amount += amount

    transfer = {
      senderId: s_balances[s_id].memberId,
      receiverId: r_balances[r_id].memberId,
      amount: amount
    }

    transferList.push(transfer)

    if (r_balances[r_id].amount === 0) r_id++
    if (s_balances[s_id].amount === 0) s_id++
  }

  return transferList
}
