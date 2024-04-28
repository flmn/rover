import { ReactNode } from "react";
import { Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";

interface EditFormToolbarProps {
    entityName: string;
    enableDelete?: boolean;
    isEdit: boolean;
    isSaving: boolean;
    isDeleting?: boolean;
    deleteConfirmContent?: ReactNode;
    onDeleteConfirmed?: () => void;
}

export function EditFormToolbar(props: EditFormToolbarProps) {
    const openDeleteConfirmModal = () => {
        modals.closeAll();

        modals.openConfirmModal({
            title: '确认',
            children: props.deleteConfirmContent,
            labels: {confirm: '删除', cancel: '取消'},
            confirmProps: {color: 'red'},
            onConfirm: () => {
                if (props.onDeleteConfirmed) {
                    props.onDeleteConfirmed();

                    modals.closeAll();
                }
            },
        });
    }

    return (
        <Group justify="space-between" mt="md" mb="xs">
            {props.enableDelete && props.isEdit &&
                <Button variant="danger"
                        onClick={() => openDeleteConfirmModal()}
                        loading={props.isDeleting}>删除{props.entityName}</Button>}
            <Group flex={1} justify="end">
                <Button variant="default" onClick={() => modals.closeAll()}>取消</Button>
                <Button type="submit" loading={props.isSaving}>保存</Button>
            </Group>
        </Group>
    );
}
