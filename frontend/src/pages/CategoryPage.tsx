import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchTodos } from "@/store/slices/todoSlice";
import { getCategories } from "@/services/categoryService";
import { useTodos } from "@/hooks/useTodos";
import CategoryTabs from "@/components/category/CategoryTabs";
import CategoryCard from "@/components/category/CategoryCard";
import EditTodoDialog from "@/components/category/EditTodoDialog";
import DeleteTodoDialog from "@/components/category/DeleteTodoDialog";

interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  todoCount?: number;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  category_ids: string[];
}

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tokenFromStore = useSelector((state: RootState) => state.user.token);
  const token = tokenFromStore || localStorage.getItem("token");
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("");
  const allTodos = useSelector((state: RootState) => state.todos.todos as Todo[]);
  const { deleteTodo: useTodosDeleteTodo, updateTodo: useTodosUpdateTodo } = useTodos();
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchPageData = async () => {
      if (token) {
        try {
          const fetchedCategories = await getCategories(token);
          setCategories(fetchedCategories);
          if (fetchedCategories.length > 0) {
            setActiveTabId(fetchedCategories[0].id);
          } else {
            setActiveTabId("");
          }
          dispatch(fetchTodos(token));
        } catch (error) {
          console.error("Kategori ve todo verileri getirilirken hata oluştu:", error);
        }
      }
    };
    fetchPageData();
  }, [token, dispatch]);

  const handleEditClick = (todo: Todo) => {
    setEditTodo(todo);
    setEditForm({
      title: todo.title,
      description: todo.description || "",
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTodo) return;
    try {
      await useTodosUpdateTodo(editTodo.id, {
        title: editForm.title,
        description: editForm.description,
      });
      setEditTodo(null);
    } catch (err) {
      alert("Güncelleme başarısız.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await useTodosDeleteTodo(deleteId);
      setDeleteId(null);
      if (token) {
        dispatch(fetchTodos(token));
      }
    } catch (err) {
      alert("Silme başarısız.");
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Kategori Yönetimi</h1>
      </div>
      <CategoryTabs
        categories={categories}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        allTodos={allTodos}
      />
      {categories
        .filter((category) => category.id === activeTabId)
        .map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            allTodos={allTodos}
            onEdit={() => {}}
            onDelete={() => {}}
            onAddTodo={() => {}}
            onShowStats={() => {}}
            onShowTodos={() => {}}
            onEditTodo={handleEditClick}
            onDeleteTodo={setDeleteId}
          />
        ))}
      <EditTodoDialog
        open={!!editTodo}
        onOpenChange={(open) => !open && setEditTodo(null)}
        editForm={editForm}
        setEditForm={setEditForm}
        onSubmit={handleEditSubmit}
      />
      <DeleteTodoDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CategoryPage;
