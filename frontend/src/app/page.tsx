"use client"; // クライアントコンポーネントとしてマーク

import { useState, useEffect } from "react";
import Table from "./components/Table";
import { fetchData, processData } from "./lib/api";
import { SongData } from "./types/index";

const HomePage: React.FC = () => {
  const [oldData, setOldData] = useState<SongData[]>([]);
  const [newData, setNewData] = useState<SongData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const oldSongs = await fetchData("old");
        const newSongs = await fetchData("new");
        setOldData(oldSongs);
        setNewData(newSongs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getSongs();
  }, []);

  const handleProcess = async (type: "old" | "new") => {
    setLoading(true);
    try {
      await processData(type);
      alert("Data processed successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Gitadora Skill Data</h1>
      <h2>Old Data</h2>
      <Table data={oldData} />
      <button onClick={() => handleProcess("old")}>Process Old Data</button>
      <h2>New Data</h2>
      <Table data={newData} />
      <button onClick={() => handleProcess("new")}>Process New Data</button>
    </div>
  );
};

export default HomePage;
