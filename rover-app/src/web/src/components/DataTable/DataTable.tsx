import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Group, Stack, Table, Text } from "@mantine/core";
import classes from './DataTable.module.css';

interface DataTableProps<T> {
    columns: ColumnDef<T, any>[],
    data: T[]
}

export function DataTable<T>(props: DataTableProps<T>) {
    const table = useReactTable({
        data: props.data,
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Stack gap={100}>
            <Table.ScrollContainer minWidth={800} h="100" className={classes.table}>
                <Table striped highlightOnHover withTableBorder withColumnBorders withRowBorders={false} stickyHeader
                       stickyHeaderOffset={0}>
                    <Table.Thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Table.Tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <Table.Th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.Thead>
                    <Table.Tbody>
                        {table.getRowModel().rows.map(row => (
                            <Table.Tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <Table.Td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Group py="sm">
                <Text>共 {table.getFilteredRowModel().rows.length} 条记录</Text>
            </Group>
        </Stack>
    );
}
