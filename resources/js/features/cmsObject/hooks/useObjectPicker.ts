import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { useCmsDispatch, useCmsStore } from "../../../hooks/redux";
import { abortSelection, openSelector } from "../cmsObject";

export function useObjectPicker(onSelect: (object: CmsObject) => void) {

    const dispatch = useCmsDispatch();
    const store = useCmsStore();
    const [uuid] = useState(v4);


    useEffect(() => {
        if(store.getState().cmsObject.prevSelectedObject) {
            return;
        }
        const unsubscribe = store.subscribe(() => {
            const obj = store.getState().cmsObject.prevSelectedObject;
            const activeUUid = store.getState().cmsObject.activeObjectPickerUuid;
            if(obj && activeUUid === uuid) {
                onSelect(obj);
                unsubscribe();
            }
        })
        return () => unsubscribe();
    }, [store, onSelect])

    const open = () => dispatch(openSelector(uuid));
    const abort = () => dispatch(abortSelection());

    return {
        open,
        abort,
    }
}