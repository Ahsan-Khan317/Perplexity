import Api from "../../shared/Api/axiosInstance.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const ai_battle_api =async (data)=>{
    const response = await Api.post(import.meta.env.VITE_AIBATTLE,data)
        return response?.data


}

const ai_battle_thunk = createAsyncThunk("battle",
     async(data,thunkApi)=>{
try{
    const res = await ai_battle_api(data)
    return res
}catch(err){
    return thunkApi.rejectWithValue(err?.response?.data)
}
    }
)

export default ai_battle_thunk