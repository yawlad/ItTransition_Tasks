import Table from "./Table";

export default function MainPage() {
  return (
      <div className="container flex justify-center items-center m-auto">
        <div className="p-10 m-auto mt-10 rounded-lg flex flex-col gap-8 justify-center items-center bg-main relative z-40 main-block">
          <Table />
        </div>
      </div>
  );
}
