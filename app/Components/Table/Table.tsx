import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/globalProvider';

type Column = {
  header: string;
  accessor: string;
  render?: (value: any, row?: any) => React.ReactNode;
  cell?: (value: any, row: any) => React.ReactNode;
};

type Pagination = {
  per_page: number;
  current_page: number;
  next_page: number;
  previous_page: number;
  total_pages: number;
  total_count: number;
  // onPageChange: (page: number) => void;
};

type TableProps = {
  data: any[];
  columns: Column[];
  pagination: Pagination;
  handlePageChange?: (page: number) => void;
};

const Table = ({ data, columns, pagination ,handlePageChange }: TableProps) => {
  const { theme } = useGlobalState();

  return (
    <TableWrapper theme={theme}>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={`${index}-${column.accessor}`}>
                  {column.cell ? (
                    column.cell(row[column.accessor], row)
                  ) : column.render ? (
                    column.render(row[column.accessor], row)
                  ) : (
                    row[column.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange?.(pagination.current_page - 1)}
          disabled={pagination.current_page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pagination.current_page} of {pagination.total_pages}
        </span>
        <button
          onClick={() => handlePageChange?.(pagination.current_page + 1)}
          disabled={pagination.current_page === pagination.total_pages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: ${(props) => props.theme.colorBg2};
  border-radius: 1rem;
  padding: 1rem;

  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid ${(props) => props.theme.borderColor2};
    }

    th {
      background-color: ${(props) => props.theme.colorBg3};
      color: ${(props) => props.theme.colorGrey0};
      font-weight: 600;
    }

    td {
      color: ${(props) => props.theme.colorGrey2};
    }

    tr:hover td {
      background-color: ${(props) => props.theme.colorBg3};
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;

    button {
      transition: opacity 0.3s ease;
      
      &:disabled {
        cursor: not-allowed;
      }
    }

    span {
      color: ${(props) => props.theme.colorGrey2};
    }
  }
`;

export default Table;
