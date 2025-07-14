/**
 * @param param0 An array of arrays where the first array contains the headers and subsequent arrays contain the data rows.
 * Each header and data row should be an array of strings.
 * @returns Table element rendered in HTML.
 */
export const Table = ({ data }: { data: string[][] }) => {
  const headers = data[0];
  const rows = data.slice(1);

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

      <button className="px-4 py-2 rounded">Exportar a Excel</button>
    </div>
  );
};
