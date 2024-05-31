import { MRT_RowData, MRT_TableInstance, MRT_TableOptions, useMantineReactTable } from 'mantine-react-table'
import { MRT_Localization_ZH_HANS } from 'mantine-react-table/locales/zh-Hans/index.esm.mjs'

const useDataTable = <TData extends MRT_RowData>(tableOptions: MRT_TableOptions<TData>): MRT_TableInstance<TData> => {
  return useMantineReactTable({
    // display
    enableColumnActions: true,
    enableColumnFilters: false,
    enableColumnPinning: true,
    enableDensityToggle: false,
    enableRowActions: true,
    enableRowNumbers: true,
    // enableStickyFooter: true,
    enableStickyHeader: true,
    localization: MRT_Localization_ZH_HANS,
    positionActionsColumn: 'last',
    positionGlobalFilter: 'left',
    positionToolbarAlertBanner: 'head-overlay',
    mantineTableProps: {
      striped: true
    },
    mantineSearchTextInputProps: {
      variant: 'default',
      w: '300'
    },
    mantinePaginationProps: {
      rowsPerPageOptions: ['10', '15', '20']
    },
    // pagination
    paginationDisplayMode: 'pages',
    // state
    initialState: {
      density: 'xs',
      showGlobalFilter: true,
      columnPinning: {
        right: ['mrt-row-actions']
      }
    },
    ...tableOptions
  })
}


export { useDataTable }
