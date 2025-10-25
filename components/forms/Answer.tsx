"use client"

import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { AnswersSchema } from '@/lib/validation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Editor } from '@tinymce/tinymce-react'
import { useTheme } from '@/context/ThemeProvider'
import { Button } from '../ui/button'
import Image from 'next/image'
import { createAnswer } from '@/lib/actions/answer.action'
import { usePathname } from 'next/navigation'

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ question, questionId, authorId }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [IsSubmittingAI, setIsSubmittingAI] = useState(false)
  const { mode } = useTheme();
  const editorRef = React.useRef(null)
  const form = useForm<z.infer<typeof AnswersSchema>>({
    resolver: zodResolver(AnswersSchema),
    defaultValues: {
      answer: ''
    }
  })

  const handleCreateAnswer = async (values: z.infer<typeof AnswersSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if(editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent('');
      }
    } catch (error) {
      console.error(error)
      throw error;
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateAIAnswer = async () => {
    if (!authorId) return;

    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`, // Fixed URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch AI answer:", response.statusText);
        throw new Error("Failed to fetch AI answer");
      }

      const aiAnswer = await response.json();

      if (!aiAnswer || aiAnswer.error) {
        console.warn(
          "AI response error:",
          aiAnswer?.error || "No response received from server."
        );

        const fallbackMessage =
          "Sorry, I could not provide an answer to your question. Please try again.";
        if (editorRef.current) {
          (editorRef.current as any).setContent(fallbackMessage);
        }
        return;
      }

      const formattedAiAnswer = aiAnswer.reply.replace(/\n/g, "<br />");

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAiAnswer);
      }
    } catch (error: any) {
      console.error("Error generating AI answer:", error.message);
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-between gap-6 sm:flex-row sm:items-center sm:gap-2'>
        <h4 className='paragraph-semibold capitalize text-dark400_light800'>Write your answer here</h4>

        <Button
          className='btn lght-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500'
          onClick={generateAIAnswer}
        >
          {IsSubmittingAI ? (
            <>
              Generating..
            </>
          ) : (
            <>
              <Image
                src='/assets/icons/stars.svg'
                alt="stars"
                width={12}
                height={12}
                className='object-contain'
                />
                Generate AI Answer
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          className='mt-6 flex w-full flex-col gap-10'
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  {/* Add an Editor Component */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks','codesample', 'code', 'advcode', 'fullscreen',
                        'insertdatetime', 'media', 'table'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'codesample code |  bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist',
                      content_style: 'body { font-family:Inter; font-size:16px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light' ,
                    }}
                  />
                </FormControl>
                <FormMessage  className="text-red-500"/>
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button
              type='submit'
              className='primary-gradient w-fit text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>

      </Form>
    </div>
  )
}

export default Answer