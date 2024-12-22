import { SongData } from "../types/index";
export const fetchData = async (type: "old" | "new"): Promise<SongData[]> => {
  const response = await fetch(`http://localhost:3001/api/data/${type}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const processData = async (type: "old" | "new"): Promise<void> => {
  const response = await fetch(`http://localhost:3001/api/data/${type}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to process data");
  }
};
