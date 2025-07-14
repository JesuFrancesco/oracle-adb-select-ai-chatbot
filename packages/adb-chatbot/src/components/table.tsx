import React from "react";
import xlsx from "json-as-xlsx";

/**
 * @param param0 An array of arrays where the first array contains the headers and subsequent arrays contain the data rows.
 * Each header and data row should be an array of strings.
 * @returns Table element rendered in HTML.
 */
export const Table = ({ data }: { data: string[][] }) => {
  const headers = data[0];
  const rows = data.slice(1);

  function handleExport(_: React.MouseEvent<HTMLButtonElement>): void {
    const data = [
      {
        sheet: "Data",
        columns: headers.map((header) => ({ label: header, value: header })),
        content: rows.map((row) => {
          return row.reduce<Record<string, string>>((acc, cell, idx) => {
            acc[headers[idx]] = cell;
            return acc;
          }, {});
        }),
      },
    ];

    let settings = {
      fileName: new Date().toISOString() + "_data_export",
      extraLength: 3,
      writeMode: "writeFile",
      writeOptions: {},
    };

    xlsx(data, settings);
  }

  return (
    <div className="max-w-[90%] bg-gray-200 text-black rounded-2xl p-4">
      <table
        className="w-full border-collapse overflow-x-scroll"
        border={1}
        cellPadding={8}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead className="border-b border-gray-300">
          <tr>
            {headers.map((column) => (
              <th key={column}>{column.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-4" />

      <button onClick={handleExport} className="px-4 py-2 rounded">
        Exportar a Excel
      </button>
    </div>
  );
};
