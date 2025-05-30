import Link from "next/link";
import Image from "next/image";

import { SignedIn } from "@clerk/nextjs";

import Filter from "@/components/shared/Filter";
import ParseHTML from "@/components/shared/ParseHTML";
import Votes from "@/components/shared/Votes";
import { getTimestamp } from "@/lib/utils";
import { AnswerFilters } from "@/constants/filter";
import { getAnswer } from "@/lib/actions/answer.action";
import Pagination from "./Pagination";
import EditDeleteAction from "./EditDeleteAction";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  userId,
  questionId,
  totalAnswers,
  filter,
  page,
}: Props) => {
  const result = await getAnswer({
    questionId,
    page: page ? +page: 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((answer: any) => {
          const showActionButtons =
            JSON.stringify(userId) === JSON.stringify(answer.author._id);

          return (
            <article key={answer._id} className="light-border border-b py-10">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      <span className="max-sm:hidden">• answered </span>
                      {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                  />
                </div>
              <ParseHTML data={answer.content} />

              <SignedIn>
                {showActionButtons && (
                  <EditDeleteAction
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                  />
                )}
              </SignedIn>
            </article>
          );
        })}
      </div>

      <div className="mt-10 w-full">
        <Pagination
          pageNumber={ page ? +page: 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </div>
  )
};

export default AllAnswers;