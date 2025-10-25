"use server"

import Job from "@/database/job.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { SearchParamsProps } from "@/types";

export async function getJobs(params: {
  searchQuery?: string;
  filter?: string;
  page?: number;
}) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1 } = params;
    const skipAmount = (page - 1) * 20;

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_applicants":
        sortOptions = { applicants: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "full_time":
        sortOptions = { createdAt: -1 };
        break;
      case "part_time":
        sortOptions = { createdAt: -1 };
        break;
      case "contract":
        sortOptions = { createdAt: -1 };
        break;
      case "internship":
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const query: any = { isActive: true };

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { company: { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (filter && ["full_time", "part_time", "contract", "internship"].includes(filter)) {
      query.type = filter;
    }

    const jobs = await Job.find(query)
      .populate({ path: "tags", model: "Tag" })
      .populate({ path: "author", model: "User" })
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(20);

    const totalJobs = await Job.countDocuments(query);
    const isNext = totalJobs > skipAmount + jobs.length;

    return { jobs, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getJobById(params: { jobId: string }) {
  try {
    connectToDatabase();

    const job = await Job.findById(params.jobId)
      .populate({ path: "tags", model: "Tag" })
      .populate({ path: "author", model: "User" })
      .populate({ path: "applicants", model: "User" });

    return job;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createJob(params: {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  author: string;
  applicationDeadline?: Date;
  path: string;
}) {
  try {
    connectToDatabase();

    const {
      title,
      company,
      companyLogo,
      location,
      type,
      salary,
      description,
      requirements,
      benefits,
      tags,
      author,
      applicationDeadline,
      path,
    } = params;

    const job = await Job.create({
      title,
      company,
      companyLogo,
      location,
      type,
      salary,
      description,
      requirements,
      benefits,
      tags,
      author,
      applicationDeadline,
    });

    revalidatePath(path);

    return job;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateJob(params: {
  jobId: string;
  title?: string;
  company?: string;
  companyLogo?: string;
  location?: string;
  type?: string;
  salary?: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  tags?: string[];
  applicationDeadline?: Date;
  path: string;
}) {
  try {
    connectToDatabase();

    const {
      jobId,
      title,
      company,
      companyLogo,
      location,
      type,
      salary,
      description,
      requirements,
      benefits,
      tags,
      applicationDeadline,
      path,
    } = params;

    const updateData: any = {};
    if (title) updateData.title = title;
    if (company) updateData.company = company;
    if (companyLogo) updateData.companyLogo = companyLogo;
    if (location) updateData.location = location;
    if (type) updateData.type = type;
    if (salary) updateData.salary = salary;
    if (description) updateData.description = description;
    if (requirements) updateData.requirements = requirements;
    if (benefits) updateData.benefits = benefits;
    if (tags) updateData.tags = tags;
    if (applicationDeadline) updateData.applicationDeadline = applicationDeadline;

    const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

    revalidatePath(path);

    return job;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteJob(params: { jobId: string; path: string }) {
  try {
    connectToDatabase();

    await Job.findByIdAndDelete(params.jobId);

    revalidatePath(params.path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function applyToJob(params: {
  jobId: string;
  userId: string;
  path: string;
}) {
  try {
    connectToDatabase();

    const { jobId, userId, path } = params;

    await Job.findByIdAndUpdate(jobId, {
      $addToSet: { applicants: userId },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function incrementJobViews(params: { jobId: string }) {
  try {
    connectToDatabase();

    await Job.findByIdAndUpdate(params.jobId, {
      $inc: { views: 1 },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
