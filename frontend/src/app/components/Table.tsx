import { SongData } from "../types/index";

interface TableProps {
  data: SongData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Difficulty</th>
          <th>Achievement Rate</th>
          <th>Skill</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {data.map((song, index) => (
          <tr key={index}>
            <td>{song.title}</td>
            <td>{song.difficulty}</td>
            <td>{song.achievementRate}</td>
            <td>{song.skill}</td>
            <td>{song.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
