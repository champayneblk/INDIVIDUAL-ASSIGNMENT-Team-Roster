/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { teamCaptain } from '../../api/memberData';
import TeamCard from '../../components/TeamCard';
import { useAuth } from '../../utils/context/authContext';

export default function favoriteAuthor() {
  const { user } = useAuth();
  const [teamCap, setTeamCap] = useState([]);

  const getTeamCaptain = () => {
    teamCaptain(user.uid).then(setTeamCap);
  };

  useEffect(() => {
    getTeamCaptain();
  }, []);

  return (
    <div>{teamCap.map((team) => (<TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getTeamCaptain} />
    ))}
    </div>
  );
}
