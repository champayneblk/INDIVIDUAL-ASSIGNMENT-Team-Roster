import React, { useEffect, useState } from 'react';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

export default function ShowTeamMembers() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div>{members.map((member) => (
      <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
    ))}
    </div>
  );
}
