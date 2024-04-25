import { ReactNode, useCallback } from "react";
import { MantineSize, Text } from "@mantine/core";
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
        modals.open({
            title: <Text size="xl" fw={500}>{`新建${options.entityName}`}</Text>,
            fullScreen: options.fullScreen,
            size: options.size,
            children: <>{options.form({})}</>,
        });
    }, [options]);

    const edit = useCallback((id: string) => {
        modals.open({
            title: <Text size="xl" fw={500}>{`编辑${options.entityName}`}</Text>,
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

