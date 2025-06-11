'use client'

//import ModalWrapper from "@/components/ui/modal-wrapper";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { noteSchema, NoteFormValues } from "@/app/drills-library/schemas/notes"
import { createCoachDrillNotes } from "@/app/drills-library/actions/drills"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function NoteForm({ drillId }: { drillId: string }) {
  const router = useRouter()

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      drillId,
      note: "",
    },
  })

  const onSubmit = async (values: NoteFormValues) => {
    const formData = new FormData()
    formData.append("drillId", values.drillId)
    formData.append("note", values.note)

    const res = await createCoachDrillNotes(formData)

    if (!res.success) {
      for (const key in res.errors) {
        form.setError(key as keyof NoteFormValues, {
          message: res.errors[key]?.[0]
        })
      }
      return
    }

    router.push(`/drills-library/${drillId}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* <ModalWrapper> */}
          <div className="bg-white w-[735px] h-[645px] flex flex-col p-8">
            <input type="hidden" {...form.register("drillId")} />

            <p className="py-4">Write your notes below</p>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="flex-grow flex flex-col justify-between gap-4">
                  <FormLabel className="sr-only">Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your note here"
                      className="h-full w-full resize-none border-2 border-neutral-800 p-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-5 text-center mt-6">
              <Button className="w-full" type="submit">Save</Button>
              <Button
                variant="destructive"
                className="w-full"
                type="button"
                onClick={() => router.push(`/drills-library/${drillId}`)}
              >
                Cancel
              </Button>
            </div>
          </div>
        {/* </ModalWrapper> */}
      </form>
    </Form>
  )
}