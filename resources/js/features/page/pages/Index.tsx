import React from "react";
import { Button, Container, Drawer, Group, Title } from "@mantine/core";
import PageTree from "../components/PageTree/PageTree";
import { useRouter } from "../../../exports";
import { PageForm, PageView } from "..";

interface IndexPageProps {
    page?: Page;
    pages: Page[];
    edit?: boolean;
    newPage?: boolean;
    createParentId?: string;
}

const Index = (props: IndexPageProps) => {
    const pages = props.pages as Page[];
    const router = useRouter();

    const navigateIndex = () => router.get("/", {}, { preserveState: true });

    return (
        <Container>
            <Group position="apart" pb={"md"}>
                <Title>Pages</Title>
                <Button onClick={() => router.get('/create', {}, { preserveState: true })}>New</Button>
            </Group>

            {/* Page List */}
            <PageTree pages={pages} />

            {/* Show Page */}
            <Drawer opened={!!props.page && !props.edit} onClose={navigateIndex}>
                {props.page && <PageView page={props.page} />}
            </Drawer>

            {/* Edit Page */}
            <Drawer opened={!!props.page && !!props.edit} onClose={navigateIndex}>
                <PageForm page={props.page} onCancel={navigateIndex} />
            </Drawer>

            {/* New Page */}
            <Drawer opened={!!props.newPage} onClose={navigateIndex}>
                <PageForm onCancel={navigateIndex} parent={props.createParentId} />
            </Drawer>
        </Container>
    );
};

export default Index;
