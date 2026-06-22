import { useDispatch } from "react-redux";
import ai_battle_thunk from "./battle.api";
import { setBattleTitle } from "./battle.slice.js";

const UseAIBAttle = ()=>{
    const dispatch = useDispatch()


const Ai_battle = async(question)=>{


const result = await dispatch(ai_battle_thunk({question}))
if(result){
    console.log(result)

    return result
}





}

const UsesetBattleTitle = async(title)=>{

    await dispatch(setBattleTitle(title))
}






return {Ai_battle,UsesetBattleTitle}

}
export default UseAIBAttle