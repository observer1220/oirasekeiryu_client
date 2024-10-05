// 以 API 形式將資料庫內容導出，讓外部的人透過 API 進行 CRUD 操作
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// 函式名稱必須符合 HTTP Verbs GET、POST、PUT、DELETE
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({
      message: "Cabin not found",
    });
  }
}

// export async function POST() {}
