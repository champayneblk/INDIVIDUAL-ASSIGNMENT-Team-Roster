/* eslint-disable @next/next/no-img-element */
/* import { getAuthorBooks } from '../../api/authorData'; */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});

  const router = useRouter();
  const { firebaseKey } = router.query;

  const viewTeamDeets = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };

  useEffect(() => {
    viewTeamDeets();
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={teamDetails.image} alt={teamDetails.team_name} style={{ width: '300px' }} />
        <h3>{teamDetails.team_name}</h3>
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {teamDetails.first_name} {teamDetails.last_name}
          {teamDetails.teamObject?.team_captain ? ' 🤍' : ''}
        </h5>
        Team Email: <a href={`mailto:${teamDetails.email}`}>{teamDetails.email}</a>
        <hr />
        <div className="mt-3 d-flex flex-wrap">
          {teamDetails.members?.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={viewTeamDeets} />
          ))}
        </div>
      </div>
    </div>
  );
}
