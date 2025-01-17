interface Page {
    id: string;
    name: string;
    title: string;
    parent_id: string;
    path: string;
    node_id: string;
    parent?: Page;
    shell_id?: string;
    updated_at?: string;
    created_at?: string;
}