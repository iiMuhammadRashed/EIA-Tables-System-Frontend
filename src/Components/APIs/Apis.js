import axios from 'axios';
const getGrades = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/v1/grades');
    return data;
  } catch (error) {
    throw error;
  }
};

const getDepartments = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:4000/api/v1/departments'
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getSpecificTable = async (grade, department, group) => {
  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/timeTables/getSpecificTable',
      { grade, department, group }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export { getGrades, getDepartments, getSpecificTable };
