"use server"

import { Schema, models, model, Document } from 'mongoose'

export interface IJob extends Document {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  applicants: Schema.Types.ObjectId[];
  views: number;
  createdAt: Date;
  applicationDeadline?: Date;
  isActive: boolean;
}

const JobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyLogo: { type: String },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true
  },
  salary: { type: String },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  benefits: [{ type: String }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  applicationDeadline: { type: Date },
  isActive: { type: Boolean, default: true }
})

const Job = models.Job || model('Job', JobSchema);

export default Job
