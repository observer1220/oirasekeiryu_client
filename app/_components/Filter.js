"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams(); // 取得網址的參數
  const router = useRouter(); // 取得 router 物件
  const pathname = usePathname(); // 取得網址路徑 "/cabins"

  const activeFilter = searchParams.get("capacity") ?? "all"; // 取得參數 capacity 的值

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams); // 將參數轉為 URLSearchParams 物件
    params.set("capacity", filter); // 設定參數 capacity 的值為 filter
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // 更新網址
  };

  const Button = ({ filter, children }) => {
    return (
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter(filter)}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="border border-primary-800 flex">
      <Button filter="all">All cabins</Button>
      <Button filter="small">1&mdash;3 guests</Button>
      <Button filter="medium">4&mdash;7 guests</Button>
      <Button filter="large">8&mdash;12 guests</Button>
    </div>
  );
}
