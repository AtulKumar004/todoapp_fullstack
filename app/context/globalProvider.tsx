"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

interface StageData {
  data: any[];
  pagination: any;
  message: string;
}

export const GlobalContext = createContext<any>(null);
export const GlobalUpdateContext = createContext<any>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  // ... rest of your code remains same, just remove the type annotations from allStages

  const allStages = (page = 1, search = '') => {
    axios.get('/stage', {
      params: {
        page,
        search
      }
    })
    // ... rest of the function
  }

  // ... rest of your component
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext); 