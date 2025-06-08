import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EditTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editForm: { title: string; description: string };
  setEditForm: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
  onSubmit: (e: React.FormEvent) => void;
}

const EditTodoDialog: React.FC<EditTodoDialogProps> = ({ open, onOpenChange, editForm, setEditForm, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Görev Düzenle</DialogTitle>
          <DialogDescription>Görev bilgilerini güncelleyin.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            value={editForm.title}
            onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Başlık"
            required
          />
          <Textarea
            value={editForm.description}
            onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Açıklama"
          />
          <DialogFooter>
            <Button type="submit">Kaydet</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">İptal</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoDialog; 