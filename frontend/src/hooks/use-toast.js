import * as React from "react";

export const useToast = () => {
  return {
    toast: ({ title, description }) => {
      // Garante que description tenha algo
      const desc = description || "Sem descrição";
      console.log("Toast:", title, desc);
      alert(`${title}\n${desc}`);
    },
  };
};
