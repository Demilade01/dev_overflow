import { NextResponse } from "next/server";
import { getJobById, updateJob, deleteJob, incrementJobViews } from "@/lib/actions/job.action";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const job = await getJobById({ jobId: params.id });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Increment views when job is viewed
    await incrementJobViews({ jobId: params.id });

    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Error fetching job:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { path } = body;

    const job = await updateJob({
      jobId: params.id,
      ...body,
      path,
    });

    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Error updating job:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/jobs";

    await deleteJob({
      jobId: params.id,
      path,
    });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting job:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
