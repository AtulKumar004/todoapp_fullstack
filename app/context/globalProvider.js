"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
// import axios from "axios";
import axios from "@/app/utils/axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [stageData, setStageData] = useState({
    data: [],
    pagination: {
      per_page: 10,
      current_page: 1,
      next_page: 0,
      previous_page: 0,
      total_pages: 1,
      total_count: 10,
    },
    message: ""
  });


  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [tasks, setTasks] = useState([]);

  const theme = themes[selectedTheme];

  const openModal = () => {

    console.log("openModal");
    setModal(true);
  };


  const allStages =  (page = 1,search = "" , isActive = true) => {
    axios.get('/stage', {
      params: {
        page,
        search,
        isActive
      }
    })
      .then((res) => {
        
        if (res?.status == 200) {
          setStageData({
            data: res?.data?.stages,
            pagination: res?.data?.pagination,
            message: res?.data?.message
          });


        }
      })
      .catch((err) => {
        console.log("err ====>", err)
      })
    

  }   

  // const getAllStagesData = (page: number = 1, search?: string) => {
   
  // }
  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    setIsLoading(true);
    try {
      // const res = await axios.get("/api/tasks");
      // console.log("allTasks =====>" , res)

      // const sorted = res.data.sort((a, b) => {
      //   return (
      //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   );
      // });

      // setTasks(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      // const res = await axios.delete(`/api/tasks/${id}`);
      // toast.success("Task deleted");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateTask = async (task) => {
    try {
      // const res = await axios.put(`/api/tasks`, task);

      toast.success("Task updated");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        allTasks,
        collapsed,
        collapseMenu,
        stageData,
        allStages
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
