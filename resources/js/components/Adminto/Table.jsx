import React from 'react'
import DataGrid from './DataGrid'
import { renderToString } from 'react-dom/server'

const Table = ({ title, gridRef, rest, columns, toolBar, masterDetail, filterValue = [], onRefresh, exportable, pageSize}) => {
  
  const html = renderToString(<div>{title}</div>)
  const text = $(html).text().trim().clean('-')
  
  return (<div className="row">
    <div className="col-12">
      <div className="card">
        {
          typeof title == 'object'
            ? <div className='card-header'>{title}</div>
            : ''
        }
        <div className="card-body">
          {
            typeof title != 'object'
              ? <h4 className="header-title">
                <div id="header-title-options" className="float-end"></div>
                <span id="header-title-prefix"></span> Lista de {title} <span id="header-title-suffix"></span>
              </h4>
              : ''
          }
          <DataGrid gridRef={gridRef} rest={rest} columns={columns.filter(Boolean)} toolBar={toolBar} exportable={exportable} exportableName={text.toLowerCase()} masterDetail={masterDetail} filterValue={filterValue} pageSize={pageSize} onRefresh={onRefresh}/>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Table