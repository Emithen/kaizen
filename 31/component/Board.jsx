import { useEffect, useRef, useState } from "react";

import { Button } from "./Button.jsx";

import { getPosts, savePosts } from "../api.js";

export const Board = () => {
    const nextIdRef = useRef(0);
    const [loading, setLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");

    // 마운트 시 정보 불러오기
    useEffect(() => {
        const load = async () => {
            const data = await getPosts();
            setPosts(data.map(post => ({ id: nextIdRef.current++, content: post })));
            setLoading(false);
        };

        load();
    }, []);

    // posts 갱신 시 액션
    useEffect(() => {
        if (loading) return;

        // 변경 사항 저장소에 반영
        const save = async () => {
            // 저장소에 접근하는 api 계층은 컴포넌트 계층의 데이터 포맷을 모르는 게 좋음
            await savePosts(posts.map(post => post.content));
        };

        save();
    }, [loading, posts]);

    const handleItemDelete = (id) => {
        setPosts(prev => prev.filter(post => post.id !== id));
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleAddItemButtonClick = () => {
        setPosts(prev => [...prev, { id: nextIdRef.current++, content: input }]);
        setInput("");
    }

    if (loading) return <div>로딩 중...</div>;

    return <div className="board-body">
        <List data={posts} onDelete={handleItemDelete} />
        <Input value={input} onChange={handleInputChange} />
        <Button label="항목 추가하기" onClick={handleAddItemButtonClick} />
    </div>
}



const List = ({ data, onDelete }) => {
    return <ul className="board-list" role="list">
        {data.map(item => <Item key={item.id} content={item.content} onDelete={() => onDelete(item.id)} />)}
    </ul>
}



const Item = ({ content, onDelete }) => {
    return <li className="board-item">
        <span>{content}</span>
        <Button label="X" onClick={onDelete} />
    </li>
}



const Input = ({ value, onChange }) => {
    return <input className="input" value={value} onChange={onChange} />
}
