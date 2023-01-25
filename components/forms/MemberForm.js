import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';
import { AddMember, updateMember } from '../../api/memberData';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  team_captain: false,
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      AddMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} A Member</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Member's First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />

      </FloatingLabel>
      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Member EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TEAM SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.team_id}
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.team_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="team_captain"
        name="team_captain"
        label="Captain"
        checked={formInput.team_captain}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            team_captain: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    team_captain: PropTypes.bool,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
