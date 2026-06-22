import { createSlice } from "@reduxjs/toolkit";
import ai_battle_thunk from "./battle.api";
const battleSlice = createSlice({
  name: "battle",
  initialState: {
    isloading: false,
    issuccess: false,
    titles: null,
    data:null
  },

  reducers: {
    addBattle: (state, action) => {
      state.data = action.payload;
    }
    ,
    setBattleTitle : (state,action)=>{
        state.titles = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(ai_battle_thunk.pending, (state) => {
      state.isloading = true;
      state.issuccess = false;
    });

    builder.addCase(ai_battle_thunk.fulfilled, (state, action) => {
      state.isloading = false;
      state.issuccess = true;
      state.data = action.payload
    
    });

    builder.addCase(ai_battle_thunk.rejected, (state) => {
      state.isloading = false;
      state.issuccess = false;
    });

   
  },
});

export const { addBattle, setBattleTitle } = battleSlice.actions;
export default battleSlice.reducer;
