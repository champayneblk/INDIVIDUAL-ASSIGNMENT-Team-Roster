import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/forms/MemberForm';

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<TeamForm obj={editItem} />);
}
