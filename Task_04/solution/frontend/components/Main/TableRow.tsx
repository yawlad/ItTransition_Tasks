interface TableRowData {
  children?: React.ReactNode;
  head?: boolean;
}

export default function TableRow({ children, head }: TableRowData) {
  return (
    <tr
      className={`${
        head ? "border-b-[3px] text-xl" : "border-b-[1px]"
      } border-secondary`}
    >
      {children}
    </tr>
  );
}
