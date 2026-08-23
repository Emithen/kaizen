import { Board } from "./component/Board"
import { Header } from "./component/Header"

export const App = () => {
    return <div className="app">
        <Header title="자유 게시판" />
        <Board />
    </div>
}