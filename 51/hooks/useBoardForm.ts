import { useState } from "react";

type useBoardFormProps = {
  onSubmit: (content: string) => void;
  onInvalid: () => void;
  onEdit: () => void;
}

export const useBoardForm = ({ onSubmit, onInvalid, onEdit }: useBoardFormProps) => {
  const [input, setInput] = useState<string>("");

  // 아직 validation 안 붙임
  const changeInput = (value: string) => {
    setInput(value);
    onEdit();
  }

  const submit = () => {
    const content = input.trim();

    if (!content) {
      onInvalid();
      setInput("");
      return;
    }

    onSubmit(content);
    setInput("");
  }

  return { input, changeInput, submit };
};