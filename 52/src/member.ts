export type Member = {
  id: number,
  name: string
}

export const getNameById = (id: number, members: Member[]): string => {
  const member = members.find(member => id === member.id);

  return member?.name || "존재하지 않는 회원입니다.";
}
