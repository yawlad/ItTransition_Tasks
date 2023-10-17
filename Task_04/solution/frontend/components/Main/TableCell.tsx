interface TableCellData {
  children?: React.ReactNode;
  last?: boolean;
}

export default function TableCell({ children, last }: TableCellData) {
  return (
    <th
      className={`px-4 py-2 border-secondary align-top text-center ${
        last ? "" : "border-r-[1px]"
      }`}
    >
      {children}
    </th>
  );
}
