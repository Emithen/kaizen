import { useBoardForm } from "../hooks/useBoardForm";

type BoardFormProps = {
  addPost: (content: string) => void;
  onInvalid: () => void;
  onEdit: () => void;
}

export const BoardForm =  ({ addPost, onInvalid, onEdit }: BoardFormProps) => {
  const { input, changeInput, submit } = useBoardForm({
    onSubmit: addPost,
    onInvalid,
    onEdit
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit();
      }}
    >
      <input
        value={input}
        onChange={e => changeInput(e.target.value)}/>
      <button type="submit">항목 추가하기</button>
    </form>
  )
};