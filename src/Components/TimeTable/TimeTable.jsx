import Logo from '../../Assets/Images/logo.png';
import { useEffect, useRef, useState } from 'react';

const TimeTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [tableCategory, setTableCategory] = useState('');

  useEffect(() => {
    setTableData(props?.tableData);
    setTableCategory(props?.tableCategory);
    console.log(tableData);
  }, [props?.tableCategory, props?.tableData, tableData]);

  const cellRefs = useRef({
    a1: null,
    b1: null,
    c1: null,
    d1: null,
    e1: null,
    a2: null,
    b2: null,
    c2: null,
    d2: null,
    e2: null,
    a3: null,
    b3: null,
    c3: null,
    d3: null,
    e3: null,
    a4: null,
    b4: null,
    c4: null,
    d4: null,
    e4: null,
    a5: null,
    b5: null,
    c5: null,
    d5: null,
    e5: null,
    a6: null,
    b6: null,
    c6: null,
    d6: null,
    e6: null,
  });

  useEffect(() => {
    // Populate the lecture data in the corresponding cells
    if (tableCategory === 'lectures' && tableData.lectures) {
      tableData.lectures.forEach((lecture) => {
        const cellId = `${lecture.cell}`;
        const cellRef = cellRefs.current[cellId];
        if (cellRef) {
          cellRef.innerHTML = `
            <p class='pLine1'>${lecture.subject.name}</p>
            <p class='pLine2'>${lecture.instructor.name}</p>
            <p class='pLine3'>${lecture.amphitheater.name}</p>
          `;
          console.log(cellRef);
        }
      });
    }
  }, [tableCategory, tableData]);

  return (
    <>
      <div
        className='flex flex-col justify-center items-center bg-[#F8F9FA] tableBackground w-full pt-4 pb-8'
        id='exportedTable'
      >
        <div className='flex justify-around items-center w-full pb-6 mt-4'>
          <div className='text-center font-bold'>
            <p>وزارة ال تعليم العالي</p>
            <p>المعهد المصري</p>
            <p>لأكاديمية الأسكندرية للإدارة والمحاسبة</p>
          </div>
          <div className='text-center'>
            <p>{`جدول  - ${process.env.REACT_APP_TIMETABLE_SEMESTER} - ${process.env.REACT_APP_TIMETABLE_YEAR}`}</p>
            {tableCategory === 'lectures' ? (
              <p id='tableHeaderData' className='my-2 font-bold'>
                <span id='tableHeaderData1'>{tableData.grade.name}</span> -{' '}
                <span id='tableHeaderData2'>{tableData.department.name}</span>
              </p>
            ) : (
              ''
            )}
            {tableCategory === 'lectures' ? (
              process.env.REACT_APP_TIMETABLE_GROUP === 'true' ? (
                <p>
                  مجموعة: <span id='tableGroup'>{tableData.group}</span>
                </p>
              ) : (
                ''
              )
            ) : (
              ''
            )}
            {tableCategory === 'preoccupations' ? (
              <p className='font-bold'>
                نوع: <span id='tableGroup'></span>
              </p>
            ) : (
              ''
            )}
          </div>
          <div className='logoImg'>
            <img className='w-full' src={Logo} alt='logo' />
          </div>
        </div>
        <div className='w-11/12'>
          <table className='w-full' id='timeTable'>
            <tbody>
              <tr>
                <td className='times'>اليوم</td>
                <td className='times'>8 - 10</td>
                <td className='times'>10 - 12</td>
                <td className='times'>12 - 2</td>
                <td className='times'>2 - 4</td>
                <td className='times'>4 - 6</td>
              </tr>
              <tr>
                <td className='day'>السبت</td>
                <td className='subject' ref={cellRefs.current.a1}></td>
                <td className='subject' ref={cellRefs.current.b1}></td>
                <td className='subject' ref={cellRefs.current.c1}></td>
                <td className='subject' ref={cellRefs.current.d1}></td>
                <td className='subject' ref={cellRefs.current.e1}></td>
              </tr>
              <tr>
                <td className='day'>الأحد</td>
                <td className='subject' ref={cellRefs.current.a2}></td>
                <td className='subject' ref={cellRefs.current.b2}></td>
                <td className='subject' ref={cellRefs.current.c2}></td>
                <td className='subject' ref={cellRefs.current.d2}></td>
                <td className='subject' ref={cellRefs.current.e2}></td>
              </tr>
              <tr>
                <td className='day'>الأثنين</td>
                <td className='subject' ref={cellRefs.current.a3}></td>
                <td className='subject' ref={cellRefs.current.b3}></td>
                <td className='subject' ref={cellRefs.current.c3}></td>
                <td className='subject' ref={cellRefs.current.d3}></td>
                <td className='subject' ref={cellRefs.current.e3}></td>
              </tr>
              <tr>
                <td className='day'>الثلاثاء</td>
                <td className='subject' ref={cellRefs.current.a4}></td>
                <td className='subject' ref={cellRefs.current.b4}></td>
                <td className='subject' ref={cellRefs.current.c4}></td>
                <td className='subject' ref={cellRefs.current.d4}></td>
                <td className='subject' ref={cellRefs.current.e4}></td>
              </tr>
              <tr>
                <td className='day'>الأربعاء</td>
                <td className='subject' ref={cellRefs.current.a5}></td>
                <td className='subject' ref={cellRefs.current.b5}></td>
                <td className='subject' ref={cellRefs.current.c5}></td>
                <td className='subject' ref={cellRefs.current.d5}></td>
                <td className='subject' ref={cellRefs.current.e5}></td>
              </tr>
              <tr>
                <td className='day'>الخميس</td>
                <td className='subject' ref={cellRefs.current.a6}></td>
                <td className='subject' ref={cellRefs.current.b6}></td>
                <td className='subject' ref={cellRefs.current.c6}></td>
                <td className='subject' ref={cellRefs.current.d6}></td>
                <td className='subject' ref={cellRefs.current.e6}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex w-10/12 pt-6 justify-end'>
          <div className='text-center deanName font-bold text-[0.9rem]'>
            <p>عميد المعهد</p>
            <p>{`ا.د/ ${process.env.REACT_APP_DEAN_NAME}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTable;
