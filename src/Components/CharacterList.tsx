import React, { useEffect, useState } from 'react'
import { useQueryClient, useQuery } from '@tanstack/react-query'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CharacterListsTableInfo } from '../Interface/CharacterListInterface';
import { useNavigate } from '@tanstack/react-router'
import { getCharacterListQuery } from '../Query/GetCharacterListQuery';
import { characterListRoute } from '../RouterConfig';
const columns: ColumnDef<CharacterListsTableInfo>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Species',
    accessorKey: 'species',
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
  },
]

function CharacterList() {
  const [page, setPage] = React.useState(1)
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pageNumber } = characterListRoute.useParams();
  useEffect(() => {
    setPage(Number(pageNumber))
  }, [])
  let { data, isLoading, error, refetch } = getCharacterListQuery(Number(page))
  const table = useReactTable({
    data: data?.results ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
  })
  useEffect(() => {
    const cached = queryClient.getQueryData(['characterList', page])
    if (!cached) refetch()
  }, [page])

  const viewCharacter = (data: any) => {
    queryClient.setQueryData(['characterData'], data);
    navigate({ to: '/character' });
  }
  let currentPage: number;
  if (data?.info.pages) {
    currentPage = data.info.pages
  }
  const handleRefresh = () => {
    refetch()
  }
  const handlePageNumber = (pageNo: Number) => {
    setPage(Number(pageNo))
    navigate({
      to: '/characterList/page/$pageNumber',
      params: { pageNumber: String(pageNo) }
    });
  }
  return (
    <div style={{ display: "grid" }} >
      <div style={{ display: "grid", gridTemplateColumns: "200px 200px", justifyContent: "space-between" }}>
        <h2>Character List</h2>
        <button onClick={handleRefresh} style={{ height: 50, width: 100, alignSelf: "center", justifySelf: "right", marginRight: 40 }}>Refresh</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error instanceof Error && <p>Error: {error.message}</p>}
      {!isLoading && !error && (
        <table border={1} cellPadding={5} cellSpacing={0}>
          <thead>
            {data && table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr onClick={() => viewCharacter(row.original)} style={{ cursor: "pointer" }} key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>)}
      <div style={{ gridGap: 10, marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3,100px)", justifyContent: "end" }}>
        <span style={{ marginLeft: 10 }}>
          Page {page} of {data?.info.pages}
        </span>
        <button onClick={() => handlePageNumber(page - 1)} disabled={data?.info.prev === null ? true : false}>
          ◀ Prev
        </button>{' '}
        <button
          onClick={() => handlePageNumber(page + 1)}
          disabled={data?.info.next === null ? true : false}
        >
          Next ▶
        </button>{' '}
      </div>

    </div>
  )
}

export default CharacterList