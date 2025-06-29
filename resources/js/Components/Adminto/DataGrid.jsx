import React, { useEffect } from 'react'
import { Local } from 'sode-extend-react'

const DataGrid = ({ gridRef: dataGridRef, allowQueryBuilder = true, rest, columns, toolBar, masterDetail, filterValue = null, pageSize = 10, exportable, exportableName, customizeCell = () => { }, onRefresh = () => { } }) => {
  useEffect(() => {
    DevExpress.localization.locale(navigator.language);

    $(dataGridRef.current).dxDataGrid({
      language: "es",
      dataSource: {
        load: async (params) => {
          if (filterValue && typeof params.filter === 'undefined') {
            return {
              totalCount: 0,
              data: []
            }
          }
          const data = await rest.paginate({
            ...params
          })
          onRefresh(data)
          return data
        },
      },
      onToolbarPreparing: (e) => {
        const { items } = e.toolbarOptions;
        toolBar(items)

        // items.unshift({
        //   widget: 'dxButton',
        //   location: 'after',
        //   options: {
        //     icon: 'revert',
        //     hint: 'RESTABLECER TABLA',
        //     onClick: () => {
        //       const path = location.pathname
        //       const dxSettings = Local.get('dxSettings') || {}
        //       delete dxSettings[path]
        //       Local.set('dxSettings', dxSettings)
        //       $(dataGridRef.current).dxDataGrid('instance').state({})
        //     }
        //   }
        // });
      },
      remoteOperations: true,
      columnResizingMode: "widget",
      allowColumnResizing: true,
      allowColumnReordering: true,
      columnAutoWidth: true,
      scrollbars: 'auto',
      filterPanel: { visible: allowQueryBuilder },
      searchPanel: { visible: true },
      headerFilter: { visible: true, search: { enabled: true } },
      height: 'calc(100vh - 185px)',
      filterValue,
      export: {
        enabled: exportable
      },
      onExporting: function (e) {
        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet('Main sheet');
        DevExpress.excelExporter.exportDataGrid({
          worksheet: worksheet,
          component: e.component,
          customizeCell: function (options) {
            customizeCell(options)
            options.excelCell.alignment = {
              horizontal: 'left',
              vertical: 'top',
              ...options.excelCell.alignment
            };
          }
        }).then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${exportableName}.xlsx`);
          });
        });
      },
      rowAlternationEnabled: true,
      showBorders: true,
      filterRow: {
        visible: true,
        applyFilter: "auto"
      },
      filterBuilderPopup: {
        visible: false,
        position: {
          of: window, at: 'top', my: 'top', offset: { y: 10 },
        },
      },
      paging: {
        pageSize,
      },
      pager: {
        visible: true,
        allowedPageSizes: [5, 10, 25, 50, 100],
        showPageSizeSelector: true,
        showInfo: true,
        showNavigationButtons: true,
      },
      allowFiltering: true,
      scrolling: {
        mode: 'standard',
        useNative: true,
        preloadEnabled: true,
        rowRenderingMode: 'standard'
      },
      columnChooser: {
        title: 'Mostrar/Ocultar columnas',
        enabled: true,
        mode: 'select',
        search: { enabled: true }
      },
      columns,
      masterDetail,
      onContentReady: (...props) => {
        tippy('.tippy-here', { arrow: true, animation: 'scale' })
      }
      // onColumnsChanging: () => {
      //   const dataGrid = $(dataGridRef.current).dxDataGrid('instance')
      //   const state = dataGrid.state()

      //   if (Object.keys(state) == 0) return

      //   const path = location.pathname
      //   const dxSettings = Local.get('dxSettings') || {}
      //   if (JSON.stringify(dxSettings[path]) == JSON.stringify(state)) return

      //   dxSettings[path] = {}
      //   dxSettings[path].columns = state.columns
      //   dxSettings[path].masterDetail = state.masterDetail

      //   Local.set('dxSettings', dxSettings)
      // }
    })
      .dxDataGrid('instance')

    tippy('.dx-button', { arrow: true })

    // const dxSettings = Local.get('dxSettings') || {}
    // if (dxSettings[location.pathname]) {
    //   $(dataGridRef.current).dxDataGrid('instance').state(dxSettings[location.pathname])
    // }
  }, [filterValue])

  return (
    <div ref={dataGridRef} ></div>
  )
}

export default DataGrid