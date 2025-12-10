import * as React from "react";

export const useToast = () => {
  return {
    toast: ({ title, description }) => {
      const desc = description || "Sem descrição";
      console.log("Toast:", title, desc);
      alert(`${title}\n${desc}`);
    },
  };
};
