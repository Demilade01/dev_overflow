"use server"

import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { model } from "mongoose";

const searchableTypes = ["question", "answer", "user", "tag"]

export async function globalSearch(params: SearchParams) {
  // make a call to the database to call everything at once
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: 'i' };

    let results = [];

    const modulesAndTypes = [
      { model: Question, searchField: 'title', type: 'question'},
      { model: User, searchField: 'name', type: 'user'},
      { model: Answer, searchField: 'content', type: 'answer'},
      { model: Tag , searchField: 'name', type: 'tag'},
    ]

    const typeLower = type?.toLowerCase();

    if(!typeLower || !searchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING

      for (const {model, searchField, type } of modulesAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title: type === 'answer'
            ? `Answers containing ${query}`
            : item[searchField],
            type,
            id: type === 'user'
              ?item.clerkId
              : type === 'answer'
                ? item.question
                : item._id
          }))
        )
      }
    } else {
      // SEARCH ACROSS A SPECIFIC TYPE
      const modelInfo = modulesAndTypes.find((item) => item.type === type);

      if(!modelInfo) {
        throw new Error('invalid search type');
      }

      const queryResult = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8)

      results = queryResult.map((item) => ({
        title: type === 'answer'
        ? `Answers containing ${query}`
        : item[modelInfo.searchField],
        type,
        id: type === 'user'
          ?item.clerkId
          : type === 'answer'
            ? item.question
            : item._id
      }))
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results, ${error}`);
    throw new Error;
  }
}