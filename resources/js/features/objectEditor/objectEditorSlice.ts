import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

// Define a type for the slice state
interface ObjectEditorState {
    isSelectorOpen: boolean;
    prevSelectedObject: CmsObject | null;
    activeObjectPicerUuid: string | null;
}

// Define the initial state using that type
const initialState: ObjectEditorState = {
  isSelectorOpen: false,
  prevSelectedObject: null,
  activeObjectPicerUuid: null,
}

export const objectEditorSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    openSelector: (state, action: PayloadAction<string>) => {
      state.isSelectorOpen = true;
      state.prevSelectedObject = null;
      state.activeObjectPicerUuid = action.payload;
    },
    selectObject: (state, action: PayloadAction<CmsObject>) => {
      state.isSelectorOpen = false;
      state.prevSelectedObject = action.payload;
    },
    abortSelection: (state, action: PayloadAction) => {
      state.isSelectorOpen = false;
      state.activeObjectPicerUuid = null;
    },
  },
})

export const { openSelector, selectObject, abortSelection } = objectEditorSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsSelectorOpen = (state: RootState) => state.objectEditor.isSelectorOpen;

export default objectEditorSlice.reducer