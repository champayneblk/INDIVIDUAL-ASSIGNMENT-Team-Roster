import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTeams } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/teams/new" passHref>
        <Button>Create New Team</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>

    </div>
  );
}
