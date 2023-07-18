import { IconBoxMargin, IconBrowser, IconPencil, IconSitemap, IconUser } from "@tabler/icons";
import { ExtendedPluginConfig } from "./contexts/ConfigProvider";
import coreConfig from "./corePlugin";

const coreCmsConfig: ExtendedPluginConfig= {
    extend: coreConfig,
    modules: [
        {
            type: "live_server",
            icon: IconBrowser
        },
        {
            type: "editor",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./features/editor/pages/**/*.js");
                return await pages[`./features/editor/pages/${name}.js`]();
            },
            icon: IconPencil,
        },
        {
            type: "pages",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./features/page/pages/**/*.js");
                return await pages[`./features/page/pages/${name}.js`]();
            },
            icon: IconSitemap
        },
        {
            type: "shells",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./features/shell/pages/**/*.js");
                return await pages[`./features/shell/pages/${name}.js`]();
            },
            icon: IconBoxMargin
        },
        {
            type: "users",
            resolvePage: async (name: string) => {
                const pages = import.meta.glob("./pages/cms/User/**/*.js");
                return await pages[`./pages/cms/User/${name}.js`]();
            },
            icon: IconUser
        },
    ],
}

export default coreCmsConfig;
