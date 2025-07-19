import React from "react";
import xlsx from "json-as-xlsx";
import xlsxLogo from "../assets/xlsx.png";

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

  if (rows.length === 0) {
    return (
      <div
        className={`max-w-[70%] p-2 rounded-2xl bg-gray-200 text-black self-start`}
      >
        No se encontraron datos que corresponden a la consulta.
      </div>
    );
  }

  return (
    <div className="max-w-[90%] bg-gray-200 text-black rounded-2xl p-4 overflow-x-scroll">
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
                <td key={cellIdx} className="p-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-4" />

      <button
        onClick={handleExport}
        className="rounded flex flex-row items-center gap-2"
      >
        <img src={xlsxLogo} alt="Exportar a Excel" className="h-8" />
        <p className="font-semibold">Exportar a Excel</p>
      </button>
    </div>
  );
};
