import { ReactNode, useCallback } from "react";
import { MantineSize, Title } from "@mantine/core";
import { modals } from "@mantine/modals";

type EditorOptions = {
    entityName: string;
    fullScreen?: boolean,
    size?: number | MantineSize | (string & {})
    form: (props: EditorFormProps) => ReactNode;
}

interface EditorFormProps {
    id?: string;
}

type EditorState = {
    options: EditorOptions;
    create: () => void;
    edit: (id: string) => void;
}

const useEditor = (options: EditorOptions): EditorState => {
    const create = useCallback(() => {
        console.log('editor create');
    }, []);
    const edit = useCallback((id: string) => {
        console.log('editor edit', id);
        modals.open({
            title: <Title order={4}>{`编辑${options.entityName}`}</Title>,
            fullScreen: options.fullScreen,
            size: options.size,
            children: <>{options.form({id})}</>,
        });
    }, [options]);

    return {
        options,
        create,
        edit,
    };
}

export { useEditor };
export type { EditorFormProps, EditorState };

