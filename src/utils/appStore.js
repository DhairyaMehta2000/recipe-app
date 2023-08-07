import {configureStore} from '@reduxjs/toolkit'
import ingridientReducer from './ingridientSlice'

const appStore = configureStore({
    reducer:{
            ingridient:ingridientReducer,
    }
})

export default appStore