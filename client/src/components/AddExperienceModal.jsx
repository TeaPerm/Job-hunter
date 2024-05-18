import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddExperienceCard from "./AddExperienceCard"

export function AddExperienceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add experiences</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add experiences</DialogTitle>
          <DialogDescription>
            Add your experiences here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddExperienceCard/>
        </div>
      </DialogContent>
    </Dialog>
  )
}
