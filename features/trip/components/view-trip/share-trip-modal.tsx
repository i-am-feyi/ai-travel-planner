import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShareModalStore } from "../../stores/use-share-modal";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const ShareTripModal = ({ link }: { link: string }) => {
  const { isOpen, setIsOpen } = useShareModalStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-start">Share this trip</DialogTitle>
          <DialogDescription className="text-start">
            Share this trip with your friends and family.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Trip Link</Label>
            <Input className="text-sm font-medium" value={link} readOnly />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleCopy}>
            <Copy className="size-4" /> Copy Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTripModal;
