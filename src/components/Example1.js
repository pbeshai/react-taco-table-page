import React from 'react';
import { TacoTable, DataType, SortDirection, Formatters, Utils, Summarizers, TdClassNames } from 'react-taco-table';
import cellLinesData from '../data/cell_lines.json';

// add some random values to the data
cellLinesData.forEach(d => {
  d.value1 = Math.random() * 100;
  d.value2 = Math.random() * 5 - 3;
  d.value3 = Math.ceil(Math.random() * 10);
});

const columns = [
  {
    id: 'name',
    value: rowData => rowData.cellLine,
    className: 'shared-class',
    header: 'Cell Line',
    renderer: cellData => <b>{cellData.label}</b>,
    sortValue: cellData => cellData.label,
    tdClassName: 'td-class-name',
    thClassName: 'th-class-name',
    type: DataType.String,
    width: 250,
  },
  {
    id: 'receptorStatus',
    header: 'Receptor Status',
    renderer: cellData => cellData.label,
    sortValue: cellData => cellData.label,
    type: DataType.String,
  },
  {
    id: 'BRCA1',
    type: DataType.String,
  },
  {
    id: 'value1',
    type: DataType.Number,
    renderer: Formatters.decFormat,
    firstSortDirection: SortDirection.Descending,
    summarize: Summarizers.minMaxSummarizer,
    tdStyle: (cellData, summary, column, rowData) => {
      const sortValue = Utils.getSortValueFromCellData(cellData, column, rowData);
      if (sortValue === summary.min) {
        return { color: 'red' };
      } else if (sortValue === summary.max) {
        return { color: 'green' };
      }

      return undefined;
    },
    tdClassName: TdClassNames.minMaxClassName,
  },
  {
    id: 'value2',
    type: DataType.Number,
    renderer: Formatters.plusMinusFormat,
    firstSortDirection: SortDirection.Ascending,
  },
  {
    id: 'value3',
    type: DataType.NumberOrdinal,
  },
  {
    id: 'Nothing',
    value: () => null,
    type: DataType.None,
  },
];

function rowClassName(rowData, rowNumber) {
  if (rowNumber % 5 === 0) {
    return 'five-row';
  }
}

class Example1 extends React.Component {
  render() {
    return (
      <div>
        <TacoTable
          columns={columns}
          data={cellLinesData}
          initialSortColumn={'name'}
          initialSortDirection={SortDirection.Descending}
          rowClassName={rowClassName}
          striped
          sortable
        />
      </div>
    );
  }
}

export default Example1;
