import { useParams } from "react-router-dom";

const TeamStats = () => {
  const { teamName } = useParams();

  return (
    <div className="text-white p-4 mt-16">
      <h1 className="text-2xl">Statistics for {teamName}</h1>
      <p>stats </p>
    </div>
  );
};

export default TeamStats;
