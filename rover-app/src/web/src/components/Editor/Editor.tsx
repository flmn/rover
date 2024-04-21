import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { EditorState } from "@/hooks";

interface EditorProps {
    editor: EditorState;
}

export function Editor({editor}: EditorProps) {
    const [opened, handlers] = useDisclosure(false);

    return (
        <Modal opened={opened} onClose={handlers.close} title="Authentication">
            {editor.options.form}
        </Modal>
    );
}