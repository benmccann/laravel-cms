import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

// Define a type for the slice state
export interface NodeState {
    activeNodeId?: string | null;
    isSelectorOpen: boolean;
    prevSelectedObject: StaticCmsObject | null;
    activeObjectPickerUuid: string | null;
    isEditorOpen: boolean;
    editNode: CmsNode | null;
    editNodeOrigial: CmsNode | null;
}

// Define the initial state using that type
const initialState: NodeState = {
    activeNodeId: null,
    isSelectorOpen: false,
    prevSelectedObject: null,
    activeObjectPickerUuid: null,
    isEditorOpen: false,
    editNode: null,
    editNodeOrigial: null,
};

export interface UpdateNodePayload {
  target: string;
  value: any;
}

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setActiveNode: (state, action: PayloadAction<string>) => {
            state.activeNodeId = action.payload;
        },
        //Selector
        openSelector: (
            state,
            action: PayloadAction<{
                objectPickerId: string;
            }>
        ) => {
            state.isSelectorOpen = true;
            state.prevSelectedObject = null;
            state.activeObjectPickerUuid = action.payload.objectPickerId;
        },
        selectObject: (state, action: PayloadAction<StaticCmsObject>) => {
            state.isSelectorOpen = false;
            state.prevSelectedObject = action.payload;
        },
        abortSelection: (state, action: PayloadAction) => {
            state.isSelectorOpen = false;
            state.activeObjectPickerUuid = null;
        },
        //Editor
        openEditor: (state, action: PayloadAction<{ node: CmsNode }>) => {
            state.isEditorOpen = true;
            state.isSelectorOpen = false;
            state.prevSelectedObject = null;
            state.editNode = action.payload.node;
            state.editNodeOrigial = action.payload.node;
        },
        updateObject: (state, action: PayloadAction<UpdateNodePayload>) => {
            if (!state.editNode?.settings) {
                console.error("No node in edit mode.");
                return;
            }
            state.editNode.settings[action.payload.target] =
                action.payload.value;
        },
        saveObject: (state, action: PayloadAction) => {
            state.isEditorOpen = false;
            state.editNode = null;
            state.editNodeOrigial = null;
        },
        abortEdit: (state, action: PayloadAction) => {
            state.isEditorOpen = false;
            state.editNode = null;
            state.editNodeOrigial = null;
        },
    },
});

export const { 
  setActiveNode,
  openSelector,
  selectObject,
  abortSelection,
  updateObject,
  saveObject,
  abortEdit,
  openEditor, 
} = editorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAvtiveNodeId = (state: RootState) => state.editor.activeNodeId;

export const selectIsSelectorOpen = (state: RootState) =>
    state.editor.isSelectorOpen;

export const selectEditNode = (state: RootState) =>
    state.editor.editNode;

export const selectEditNodeOriginal = (state: RootState) =>
    state.editor.editNodeOrigial;

export default editorSlice.reducer;
