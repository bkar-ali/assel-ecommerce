import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMen,
  fetchJewelry,
  fetchWomen,
  fetchWatches,
  fetchHeels,
  fetchWomenWatches,
  fetchSneakers,
} from "./asselThunk";
import { Product } from "./asselTypes";

interface categoryState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

interface productsState {
  men: categoryState;
  jewelry: categoryState;
  women: categoryState;
  watches: categoryState;
  sneakers: categoryState;
  heels: categoryState;
  womenwatches: categoryState;
}

const createCategoryState = (): categoryState => ({
  data: [],
  loading: false,
  error: null,
});

const initialState: productsState = {
  men: createCategoryState(),
  jewelry: createCategoryState(),
  women: createCategoryState(),
  watches: createCategoryState(),
  sneakers: createCategoryState(),
  heels: createCategoryState(),
  womenwatches: createCategoryState(),
};

const categoriesList = [
  "men",
  "jewelry",
  "women",
  "watches",
  "sneakers",
  "heels",
  "womenwatches",
] as const;

const categoryThunks = {
  men: fetchMen,
  jewelry: fetchJewelry,
  women: fetchWomen,
  watches: fetchWatches,
  sneakers: fetchSneakers,
  heels: fetchHeels,
  womenwatches: fetchWomenWatches,
} as const;

const handlePending = (state: categoryState) => {
  state.loading = true;
  state.error = null;
};
const handleFulfilled = (
  state: categoryState,
  action: PayloadAction<Product[]>,
) => {
  state.loading = false;
  state.data = action.payload;
};
const handleRejected = (
  state: categoryState,
  action: PayloadAction<string | null | undefined>,
) => {
  state.loading = false;
  state.error = action.payload ?? "Error";
};
const asselSlice = createSlice({
  name: "assel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    categoriesList.forEach((cat) => {
      const thunk = categoryThunks[cat];
      builder.addCase(thunk.pending, (state) =>
        handlePending(state[cat as keyof typeof state]),
      );
      builder.addCase(thunk.fulfilled, (state, action) =>
        handleFulfilled(state[cat as keyof typeof state], action),
      );
      builder.addCase(thunk.rejected, (state, action) =>
        handleRejected(state[cat as keyof typeof state], action),
      );
    });

    //       // Men
    //       .addCase(fetchMen.pending, (state) => {
    //         handlePending(state.men);
    //       })
    //       .addCase(fetchMen.fulfilled, (state, action) => {
    //         handleFulfilled(state.men, action);
    //       })
    //       .addCase(fetchMen.rejected, (state, action) => {
    //         handleRejected(state.men, action);
    //       })

    //       // Jewelry
    //       .addCase(fetchJewelry.pending, (state) => {
    //         handlePending(state.jewelry);
    //       })
    //       .addCase(fetchJewelry.fulfilled, (state, action) => {
    //         handleFulfilled(state.jewelry, action);
    //       })
    //       .addCase(fetchJewelry.rejected, (state, action) => {
    //         handleRejected(state.jewelry, action);
    //       })

    //       // Women
    //       .addCase(fetchWomen.pending, (state) => {
    //         handlePending(state.women);
    //       })
    //       .addCase(fetchWomen.fulfilled, (state, action) => {
    //         handleFulfilled(state.women, action);
    //       })
    //       .addCase(fetchWomen.rejected, (state, action) => {
    //         handleRejected(state.women, action);
    //       })

    //       // Watche
    //       .addCase(fetchWatches.pending, (state) => {
    //         handlePending(state.watches);
    //       })
    //       .addCase(fetchWatches.fulfilled, (state, action) => {
    //         handleFulfilled(state.watches, action);
    //       })
    //       .addCase(fetchWatches.rejected, (state, action) => {
    //         handleRejected(state.watches, action);
    //       })

    //       // Casual
    //       .addCase(fetchCasual.pending, (state) => {
    //         handlePending(state.casual);
    //       })
    //       .addCase(fetchCasual.fulfilled, (state, action) => {
    //         handleFulfilled(state.casual, action);
    //       })
    //       .addCase(fetchCasual.rejected, (state, action) => {
    //         handleRejected(state.casual, action);
    //       })

    //       //Women Watches
    //       .addCase(fetchWomenWatches.pending, (state) => {
    //         handlePending(state.womenwatches);
    //       })
    //       .addCase(fetchWomenWatches.fulfilled, (state, action) => {
    //         handleFulfilled(state.womenwatches, action);
    //       })
    //       .addCase(fetchWomenWatches.rejected, (state, action) => {
    //         handleRejected(state.womenwatches, action);
    //       })

    //       //Women Shoes
    //       .addCase(fetchHeels.pending, (state) => {
    //         handlePending(state.womenshoes);
    //       })
    //       .addCase(fetchHeels.fulfilled, (state, action) => {
    //         handleFulfilled(state.womenshoes, action);
    //       })
    //       .addCase(fetchHeels.rejected, (state, action) => {
    //         handleRejected(state.womenshoes, action);
    //       });
  },
});

export const {} = asselSlice.actions;
export default asselSlice.reducer;
