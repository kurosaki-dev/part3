import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

const create = (newPersonObject) => {
  const request = axios.post(baseUrl, newPersonObject);

  // example usage:
  /*
   personService.create(newObject)
   .then((response) => response.data)
   .then((data) => setPersons(persons.concat(data)));
  */
  return request.then((response) => response.data);
};

const deleteData = (id) => {
  const request = axios.delete(`/api/persons/${id}`);

  return request.then((response) => response.data);
};

const updateData = (id, personObject) => {
  const request = axios.put(`/api/persons/${id}`, personObject);

  return request.then((response) => response.data);
};

export default { getAll, create, deleteData, updateData };
