import { configureStore } from "@reduxjs/toolkit";
import application from "../features/applicationSlice";
import categories from "../features/categoriesSlice";

export const store = configureStore({
    reducer: {
        application,
        categories
    }
})