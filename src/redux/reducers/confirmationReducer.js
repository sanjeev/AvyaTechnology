import {ADD_DETAILE} from './../actions/types'
const initialState ={
  isConfirmatiom : false,
 user :{ 
  markers :[],
 }
}
function confirmationReducer(state = initialState,action){
  
  switch(action.type){
     case ADD_DETAILE:
      
       return{
         ...state,
         isConfirmatiom:true,
         user:action.payload,
      
       }
       default:
         return state
  }
}
export default confirmationReducer;