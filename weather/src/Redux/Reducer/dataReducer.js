import produce from 'immer';
import createReducer from './ReducerUtil'

const initalState = {
    selectedLocation:[],
    selectedKey:"",
    selectedCity:"",
    listFavorite: [], 
    days:[],
}

const dataReducer = {
    setSelectedLocation(state, action) {
        debugger;
        state.selectedLocation = action.payload;
    },
    setSelectedKey(state, action) {
        debugger;
        state.selectedKey = action.payload;
    },
    setSelectedCity(state, action) {
        debugger;
        state.selectedCity = action.payload;
    },
    setListFavorite(state, action) {
        debugger
        state.listFavorite =state.listFavorite.concat(action.payload) ;
    },
    setDays(state, action) {
        debugger;
        state.days = action.payload;
    },
}

export default produce((state, action) => createReducer(state, action, dataReducer), initalState);