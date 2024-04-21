import { ReactNode, useCallback } from "react";

type EditorOptions = {
    form: ReactNode;
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
    }, []);

    return {
        options,
        create,
        edit,
    };
}

export { useEditor };
export type { EditorState };

