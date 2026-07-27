import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { path } = await params;
  const pathString = path.join("/");
  
  const { searchParams } = new URL(request.url);
  const API_KEY = "c72cd25eb835aa78f74631d038086f03";
  const BASE_URL = "https://v3.football.api-sports.io";

  try {
    const url = `${BASE_URL}/${pathString}?${searchParams.toString()}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `HTTP error! status: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API proxy error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
