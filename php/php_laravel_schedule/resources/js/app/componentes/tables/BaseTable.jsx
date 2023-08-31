
/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

export default function BaseTable(props){
    const ReactTableFixedColumns = withFixedColumns(ReactTable);
    return (
        <>
            <ReactTableFixedColumns
                data={props.data}
                columns={props.columns}
                minRows={0}
                filterable = {props.filterable}
                previousText={
                    <div>
                        <i className="line-v-middle highlight middle-font fas fa-angle-left" />
                        <span className="text ">Anterior</span>
                    </div>
                }
                nextText={
                    <div>
                        <span className="text ">Siguiente</span>
                        <i className="line-v-middle highlight middle-font fas fa-angle-right" />
                    </div>
                }
                pageText='Página'
                ofText='de'
                rowsText='filas'/>
        </>
    );
}
