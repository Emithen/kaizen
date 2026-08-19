import { Board } from "./component/Board.jsx"
import { Header } from "./component/Header.jsx"

export const App = () => {
    return <div className="app">
        <Header title="자유 게시판" />
        <Board />
    </div>
}