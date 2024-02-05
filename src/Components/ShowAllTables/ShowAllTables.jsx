import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getDepartments, getGrades, getSpecificTable } from '../APIs/Apis.js';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import TimeTable from '../TimeTable/TimeTable.jsx';
import { animated, useTransition } from '@react-spring/web';

const ShowAllTables = () => {
  const [grades, setGrades] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showTableToggle, setShowTableToggle] = useState(false);

  const transition = useTransition(showTableToggle, {
    from: { opacity: 0, x: '-100%' },
    enter: { opacity: 1, x: '0%' },
    leave: { opacity: 0, x: '100%' },
  });

  const getAllGrades = async () => {
    try {
      const { grades } = await getGrades();
      setGrades(grades);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDepartments = async () => {
    try {
      const { departments } = await getDepartments();
      setDepartments(departments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGrades();
    getAllDepartments();
  }, []);

  const getTable = async ({ grade, department, group }) => {
    try {
      const res = await getSpecificTable(grade, department, group);
      if (res.message === 'success') {
        toast.success('تم العثور على جدول بنجاح', {
          position: 'top-left',
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#203864',
          },
        });
        setShowTableToggle(true);
        setTableData(res.table);
      }
      setTableData(res.table);
    } catch (error) {
      console.log(error);
      if (error.response.data.err === 'No table found')
        toast.error('لم يتم العثور على جدول', {
          position: 'top-left',
          style: {
            borderRadius: '10px',
            background: '#fff',
            color: '#203864',
          },
        });
      setShowTableToggle(false);
    }
  };

  const validationSchema = Yup.object({
    grade: Yup.string().required('يجب تحديد الفرقة'),
    department: Yup.string().required('يجب تحديد القسم'),
    group: Yup.string().required('يجب تحديد المجموعة'),
  });

  const formik = useFormik({
    initialValues: {
      grade: '',
      department: '',
      group: '',
    },
    validationSchema,
    onSubmit: getTable,
  });

  return (
    <>
      <Helmet>
        <title>عرض الجداول الدراسية</title>
      </Helmet>
      <div className='flex justify-center items-center flex-col py-7'>
        <h1 className='text-3xl font-bold text-white '>عرض الجداول الدراسية</h1>
        <p className='text-white font-bold w-full mt-5'>
          ادخل بيانات الجدول الذي تود بعرضه :
        </p>
        <form onSubmit={formik.handleSubmit} className='w-full mt-5'>
          <div className='flex flex-col gap-3 items-center'>
            <div className='flex gap-3 w-full flex-col items-center md:flex-row'>
              <div className='flex flex-col w-full md:w-2/5'>
                <label htmlFor='grade' className='text-white '>
                  الفرقة :
                </label>
                <select
                  name='grade'
                  id='grade'
                  onChange={formik.handleChange}
                  value={formik.values.grade}
                  className='p-1 pp-1 px-2 rounded-md mt-2'
                >
                  <option value=''>اختر الفرقة</option>
                  {grades !== '' &&
                    grades.map((grade) => (
                      <option key={grade._id} value={grade._id}>
                        {grade.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='flex flex-col w-full md:w-2/5'>
                <label htmlFor='department' className='text-white '>
                  الشعبة :
                </label>
                <select
                  name='department'
                  id='department'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.department}
                  className='p-1 px-2 rounded-md mt-2'
                >
                  <option value=''>اختر الشعبة</option>
                  {departments !== '' &&
                    departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='flex flex-col w-full md:w-1/5'>
                <label htmlFor='group' className='text-white '>
                  المجموعة :
                </label>
                <select
                  name='group'
                  id='group'
                  onChange={formik.handleChange}
                  value={formik.values.group}
                  className='p-1 px-2 rounded-md mt-2'
                >
                  <option value=''>اختر المجموعة</option>
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                  <option value='C'>C</option>
                </select>
              </div>
            </div>
            <button
              type='submit'
              disabled={!(formik.isValid && formik.dirty)}
              className='mt-2 py-3 px-4 items-center font-semibold rounded-lg border border-white text-white hover:bg-white hover:text-[#203864] disabled:opacity-50 disabled:pointer-events-none w-2/4 md:w-1/4'
            >
              عرض الجدول
            </button>
          </div>
        </form>
      </div>
      {transition((styles, item) =>
        item ? (
          <animated.div style={styles}>
            <TimeTable tableData={tableData} tableCategory={'lectures'} />
          </animated.div>
        ) : (
          ''
        )
      )}
    </>
  );
};

export default ShowAllTables;
