import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MemberCard() {
  // const deleteThisBook = () => {
  //   if (window.confirm(`Delete ${bookObj.title}?`)) {
  //     deleteBook(bookObj.firebaseKey).then(() => onUpdate());
  //   }
  // };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title> Member Name</Card.Title>
        <Card.Title> Member Name</Card.Title>
        <Card.Title> Member Name</Card.Title>
        <Card.Link href="#">Member Details
          <Button variant="primary" className="m-2">VIEW</Button>
        </Card.Link>
        <Card.Link href="#">Edit Member Info
          <Button variant="primary" className="m-2">VIEW</Button>
        </Card.Link>
        <Button variant="primary">Remove Member</Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.prototype = {
  memberobj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    team_captian: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
export default MemberCard;
