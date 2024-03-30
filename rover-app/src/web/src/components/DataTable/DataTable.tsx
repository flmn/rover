import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@mantine/core";

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
        <>
            <Table.ScrollContainer minWidth={800} h={600}>
                <Table verticalSpacing="xs">
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
        </>
    );
}
