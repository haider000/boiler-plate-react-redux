import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { useSelector } from 'react-redux';
const BASE_URL = `https://flipkart-email-mock.now.sh`;

export const getAllEmailList = createAsyncThunk("emails/emailLists", async ()=>{
    try{
        const response = await axios.get(BASE_URL)
        const data = await response.data
        return data;
    }catch(e){
        console.log("Error",e)
    }
})

export const getEmailBody = createAsyncThunk("emails/emailBody", async (id)=>{
    try{
        const response = await axios.get(`${BASE_URL}/?id=${id}`)
        const data = await response.data
        return data;
    }catch(e){
        console.log("Error",e)
    }
})


const initialState = {
    emails:[],
    isEmailListLoading: true,
    isEmailBodyLoading: true,
    currentEmailBody: "",
    totalEmails: 0,
    readEmails: [],
    unreadEmails: [],
    favorites:[]
}

export const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
      addToRead: (state,action) => {
        const filteredEmail = state.emails.find((email)=>email.id===action.payload.id)
        
        if(filteredEmail){
            state.readEmails = [...state.readEmails,filteredEmail.id]
        } 
      },
      addToFavorites: (state,action) => {
        const filteredEmail = state.emails.find((email)=>email.id===action.payload.id)
        if(filteredEmail){
            state.favorites = [...state.favorites,filteredEmail.id]
        } 
      },
    },
    extraReducers:{
        [getAllEmailList.pending]:(state)=>{
            state.isEmailListLoading = true
        },
        [getAllEmailList.fulfilled]:(state,action)=>{
            state.isEmailListLoading = false
            state.emails = action.payload.list
            state.unreadEmails = action.payload.list
            state.totalEmails = action.payload.total
        },
        [getEmailBody.pending]:(state)=>{
            state.isEmailBodyLoading = true
        },
        [getEmailBody.fulfilled]:(state,action)=>{
            state.isEmailBodyLoading = false
            state.currentEmailBody = action.payload
        }
    }
  })

  
export const useEmailState = () => {
    return useSelector((state) => state.emails)
  }

export const { addToRead, addToFavorites } = emailSlice.actions;

export default emailSlice.reducer;