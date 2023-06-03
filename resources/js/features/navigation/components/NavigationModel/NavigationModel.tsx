import React, { useEffect, useState } from 'react';
import { Finder, FinderItem } from '@jkli/react-finder';
import { LoadingOverlay, Portal } from '@mantine/core';
import { useStyles } from './styles';
import { router } from '@inertiajs/react'
import useInertiaProps from '../../../../hooks/inertia/useInertiaProps';
import { FinderItemSettings, ItemAction } from '@jkli/react-finder/dist/esm/types';
import { IconLocation, IconPlus } from '@tabler/icons';
import { parsePagesToNavi } from '../../util/parsePagesToNavi';
import { closeAllModals, openModal } from '@mantine/modals';
import { NewPageForm } from '../NewPageForm/NewPageForm';
import { useServerConfig } from '../../../../hooks/config/useServerConfig';

interface NavigationModelProps {
    close(): void
}

const NavigationModel = (props: NavigationModelProps) => {
    const [navi, setNavi] = useState<FinderItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { classes } = useStyles();
    const config = useServerConfig();
    const { params } = useServerConfig();

    useEffect(() => {
        router.reload({
            only: ['pages'],
            preserveState: true,
            preserveScroll: true,
            onSuccess: (props) => setNavi(parsePagesToNavi(props.props.pages as Page[])),
            onFinish: setIsLoading.bind(this, false),
        })
    }, []);

    const addFolder = (item?: FinderItem) => {
        openModal({
            title: 'Add new page',
            children: (<NewPageForm pageId={item?.id} onSuccess={() => {
                closeAllModals();
                props.close();
            }}/>),
            onClose: () => {
                router.reload({
                    data: {
                        [params.base+"_pps"]: {
                            use_parent_path: undefined,
                            path: undefined,
                            parent: undefined,
                        } as any //idk why typescript is complaining
                    },
                });
            }
          });
    }

    const itemDefaults: FinderItemSettings = {
        actions: [
            {
                Icon: IconPlus,
                name: "Neu",
                onClick: addFolder
            },
            {
                Icon: IconLocation,
                name: "Wechseln",
                onClick: (item) => router.visit(config.paths.cms + item?.data.path, {
                    onSuccess: props.close
                })
            },
        ],
    }

    return (
        <Portal>
            <div className={classes.background} onClick={props.close}></div>
            <div className={classes.container}>
                <LoadingOverlay visible={isLoading} overlayBlur={2} />
                <Finder tree={navi} setTree={setNavi} onClose={props.close} defaultItemSettings={itemDefaults}/>
            </div>
        </Portal>
    );
}
 
export default NavigationModel;