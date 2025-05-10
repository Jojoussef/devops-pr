import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Plus, Trash2, CheckCircle, Play, Pause } from "lucide-react";
import { toast } from "sonner";

type Task = {
  text: string;
  completed: boolean;
  timeSpent: number; // in seconds
  isRunning: boolean;
  timer: number; // countdown in seconds
};

const POMODORO_DURATION = 25 * 60; // 25 minutes in seconds

const formatTime = (seconds: number) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.isRunning && t.timer > 0) {
            return {
              ...t,
              timer: t.timer - 1,
              timeSpent: t.timeSpent + 1,
            };
          }
          return { ...t, isRunning: t.timer === 0 ? false : t.isRunning };
        })
      );
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, []);

  const addTask = () => {
    if (task.trim() === "") {
      toast.warning("Task can't be empty.");
      return;
    }
    setTasks([
      ...tasks,
      {
        text: task,
        completed: false,
        timeSpent: 0,
        isRunning: false,
        timer: POMODORO_DURATION,
      },
    ]);
    toast.success("Task added!");
    setTask("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
    toast.info("Task removed.");
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, completed: !t.completed, isRunning: false } : t
      )
    );
    toast("Task completion toggled.");
  };

  const toggleTimer = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index
          ? { ...t, isRunning: !t.isRunning }
          : { ...t, isRunning: false }
      )
    );
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        🧠 Pomodoro To-Do
      </h1>
      <p className="text-gray-600 mb-2">
        Total: {tasks.length} | Completed: {completedTasks}
      </p>
      <Progress value={progress} className="mb-4" />
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="New task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button onClick={addTask} className="flex items-center gap-2">
          <Plus size={16} />
          Add
        </Button>
      </div>

      <ul className="space-y-4">
        <AnimatePresence>
          <LayoutGroup>
            {tasks.map((t, index) => (
              <motion.li
                layout
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`border p-4 rounded-xl flex flex-col gap-2 shadow-sm ${
                  t.completed ? "bg-green-100/70 border-green-300" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleTaskCompletion(index)}
                    >
                      <CheckCircle
                        size={20}
                        className={
                          t.completed ? "text-green-500" : "text-gray-400"
                        }
                      />
                    </Button>
                    <span
                      className={`text-base ${
                        t.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {t.text}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeTask(index)}
                    className="flex gap-1"
                  >
                    <Trash2 size={16} />
                    Remove
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    ⏳ Timer:{" "}
                    <span className="font-mono">{formatTime(t.timer)}</span>|
                    Spent:{" "}
                    <span className="font-mono">{formatTime(t.timeSpent)}</span>
                  </div>
                  <Button
                    onClick={() => toggleTimer(index)}
                    variant="ghost"
                    size="sm"
                    color="amber"
                    className="gap-1 text-white"
                    disabled={t.completed}
                  >
                    {t.isRunning ? (
                      <>
                        <Pause size={14} />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        Start
                      </>
                    )}
                  </Button>
                </div>
              </motion.li>
            ))}
          </LayoutGroup>
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default Home;
