import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import { useObjectPicker, useObjectEditor } from "../../../cmsObject";

interface EmptyOutletProps {
    nodeId: string;
    index: number;
}

export function EmptyOutlet(props: EmptyOutletProps) {
    const config = useServerConfig();
    const { open: openEditor } = useObjectEditor();
    const onObjectSelect = (obj: CmsObject) => {
        router.post(config.paths.admin+"/nodes", {
            ref_node: props.nodeId,
            outlet: props.index,
            insert: "outlet",
            type: obj.type,
            settings: JSON.stringify({}),
        }, {
            onSuccess: (page) => {
                const session_data: any = page.props.session_data;
                const created_node = session_data.created_node;
                openEditor(created_node);
            }
        })
    };

    const { open } = useObjectPicker(onObjectSelect);

    return (
        <>
            <Button onClick={open}>Einfügen</Button>
        </>
    );
}
