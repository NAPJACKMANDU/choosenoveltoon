import { Route, Routes } from "react-router-dom"
import {
    MAIN_PATH
} from "./index.ts"
import MainPage from "../page/mainPage.tsx"

export const RouterSetting = () => {
     return (
        <Routes>
            <Route path={MAIN_PATH()} element={<MainPage />}></Route>
        </Routes>
        )
}
 export default RouterSetting;