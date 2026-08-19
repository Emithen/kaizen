import { Header } from "./component/header.jsx";
import { Board } from "./component/board.jsx";

export const App = () => {
    return <div className="app">
        <Header title="자유 게시판" />
        <Board />
    </div>
}