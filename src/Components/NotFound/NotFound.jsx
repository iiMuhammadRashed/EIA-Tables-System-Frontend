import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>عفوا لا توجد هذه الصفحة</title>
      </Helmet>
      <div className='font-bold flex justify-center items-end text-white text-lg h-72 md:text-3xl text-center'>
        <div className='card'>
          <p>
            عفوا, هذه الصفحة غير موجودة او تم حذفها{' '}
            <i className='fa-solid fa-triangle-exclamation text-4xl'></i> .
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
