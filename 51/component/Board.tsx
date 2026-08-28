import { type ChangeEvent, useState } from "react";

import { Button } from "./Button";

import { usePosts } from "../hooks/usePosts";

import type { Post } from "../api";
import { BoardForm } from "./BoardForm";

export const Board = () => {
    const [inputError, setInputError] = useState<boolean>(false);
    const { loadPosts, posts, loadError, actionError, loading, addPost, removePost } = usePosts();

    const handleItemDelete = (id: string) => {
        removePost(id);
    };

    if (loading) return <div>로딩 중...</div>;
    if (loadError) return <div>문제가 발생했습니다. 다시 시도해 주세요.</div>;

    return (
        <div className="board-body">
            {actionError && <div>문제가 발생했습니다. 다시 시도해 주세요.</div>}
            {inputError && <div>내용을 입력해주세요.</div>}
            <Button label="새로고침" onClick={loadPosts} />
            <List data={posts} onDelete={handleItemDelete} />
            <BoardForm
                addPost={addPost}
                onInvalid={() => setInputError(true)}
                onEdit={() => setInputError(false)}
            />
        </div>
    );
}


type ListProps = { data: Post[], onDelete: (id: string) => void };

const List = ({ data, onDelete }: ListProps) => {
    return <ul className="board-list" role="list">
        {data.map(item => <Item key={item.id} content={item.content} onDelete={() => onDelete(item.id)} />)}
    </ul>
}


type ItemProps = { content: string, onDelete: () => void };

const Item = ({ content, onDelete }: ItemProps) => {
    return <li className="board-item">
        <span>{content}</span>
        <Button label="X" onClick={onDelete} />
    </li>
}


type InputProps = { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void };

const Input = ({ value, onChange }: InputProps) => {
    return <input className="input" value={value} onChange={onChange} />
}
