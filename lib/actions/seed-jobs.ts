"use server"

import { connectToDatabase } from "../mongoose";
import Job from "@/database/job.model";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";

export async function seedJobs() {
  try {
    connectToDatabase();

    // Check if jobs already exist
    const existingJobs = await Job.countDocuments();
    if (existingJobs > 0) {
      console.log("Jobs already exist, skipping seed");
      return;
    }

    // Get a user to be the author
    const author = await User.findOne();
    if (!author) {
      console.log("No users found, please create a user first");
      return;
    }

    // Get or create tags
    const tags = await Tag.find({ name: { $in: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'AWS'] } });

    const sampleJobs = [
      {
        title: "Senior React Developer",
        company: "TechCorp Inc.",
        companyLogo: "/assets/images/default-logo.svg",
        location: "San Francisco, CA",
        type: "full-time",
        salary: "$120k - $150k",
        description: "We are looking for an experienced React developer to join our growing team. You will be responsible for building user-facing features and reusable components using modern React patterns.",
        requirements: [
          "5+ years React experience",
          "TypeScript knowledge",
          "Redux/Context API experience",
          "Testing frameworks (Jest, React Testing Library)",
          "Git and version control"
        ],
        benefits: [
          "Health insurance",
          "401k matching",
          "Remote work flexibility",
          "Learning budget",
          "Stock options"
        ],
        tags: tags.filter(tag => ['React', 'JavaScript', 'TypeScript'].includes(tag.name)).map(tag => tag._id),
        author: author._id,
        views: 245,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
      {
        title: "Frontend Developer Intern",
        company: "StartupXYZ",
        companyLogo: "/assets/images/default-logo.svg",
        location: "New York, NY",
        type: "internship",
        salary: "$25/hour",
        description: "Perfect opportunity for students or recent graduates to gain real-world experience in frontend development. Work on exciting projects with mentorship from senior developers.",
        requirements: [
          "Basic HTML/CSS/JavaScript knowledge",
          "React fundamentals",
          "Git knowledge",
          "Eagerness to learn"
        ],
        benefits: [
          "Mentorship program",
          "Flexible hours",
          "Potential full-time offer",
          "Learning resources"
        ],
        tags: tags.filter(tag => ['React', 'JavaScript'].includes(tag.name)).map(tag => tag._id),
        author: author._id,
        views: 89,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
      },
      {
        title: "Full Stack Developer",
        company: "RemoteTech",
        companyLogo: "/assets/images/default-logo.svg",
        location: "Remote",
        type: "contract",
        salary: "$80 - $100/hour",
        description: "Join our distributed team as a full-stack developer working on cutting-edge web applications. Work with modern technologies and contribute to open-source projects.",
        requirements: [
          "Node.js experience",
          "React proficiency",
          "MongoDB knowledge",
          "AWS experience",
          "Docker familiarity"
        ],
        benefits: [
          "Fully remote work",
          "Flexible schedule",
          "Competitive hourly rate",
          "Project variety"
        ],
        tags: tags.filter(tag => ['Node.js', 'JavaScript', 'AWS'].includes(tag.name)).map(tag => tag._id),
        author: author._id,
        views: 156,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
      },
      {
        title: "Python Backend Developer",
        company: "DataFlow Solutions",
        companyLogo: "/assets/images/default-logo.svg",
        location: "Austin, TX",
        type: "full-time",
        salary: "$100k - $130k",
        description: "Looking for a Python developer to build scalable backend services and APIs. Work with Django/FastAPI and cloud technologies.",
        requirements: [
          "3+ years Python experience",
          "Django or FastAPI knowledge",
          "Database design skills",
          "Cloud deployment experience"
        ],
        benefits: [
          "Health and dental insurance",
          "401k with company match",
          "Professional development",
          "Flexible PTO"
        ],
        tags: tags.filter(tag => ['Python', 'AWS'].includes(tag.name)).map(tag => tag._id),
        author: author._id,
        views: 78,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        applicationDeadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
      }
    ];

    await Job.insertMany(sampleJobs);
    console.log("Sample jobs created successfully!");

  } catch (error) {
    console.error("Error seeding jobs:", error);
    throw error;
  }
}
