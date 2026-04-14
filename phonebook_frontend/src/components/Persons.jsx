import React from "react";

const Persons = ({ search, filteredPersons, persons, handleDelete }) => {
  return (
    <div>
      {search.trim() ? (
        filteredPersons.length > 0 ? (
          filteredPersons.map((person) => (
            <p key={person.id}>
              {person.name} <span>{person.number}</span>
              <button onClick={() => handleDelete(person)}>delete</button>
            </p>
          ))
        ) : (
          <p>No person found.</p>
        )
      ) : (
        persons.map((person) => (
          <p key={person.id}>
            {person.name} <span>{person.number}</span>
            <button onClick={() => handleDelete(person)}>delete</button>
          </p>
        ))
      )}
    </div>
  );
};

export default Persons;
