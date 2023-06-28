import { router } from "@inertiajs/react";
import { Button } from "@mantine/core";
import React from "react";
import { useServerConfig } from "../../../../hooks/config/useServerConfig";
import useInertiaProps from "../../../../hooks/inertia/useInertiaProps";

export function ToShellButton() {
    const shell = useInertiaProps().shell as Shell;
    const page = useInertiaProps().page as Page;
    const config = useServerConfig();

    if(!shell) {
        return null;
    }

    const toShell = () => {
        router.get(config.paths.admin+"/pages/"+page.id+"/shell/edit");
    };

    return (
        <Button onClick={toShell}>
            Edit Shell
        </Button>
    );
}