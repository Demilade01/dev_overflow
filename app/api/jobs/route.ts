import { NextResponse } from "next/server";
import { getJobs } from "@/lib/actions/job.action";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get("q") || "";
    const filter = searchParams.get("filter") || "";
    const page = parseInt(searchParams.get("page") || "1");

    const result = await getJobs({
      searchQuery,
      filter,
      page,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching jobs:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
