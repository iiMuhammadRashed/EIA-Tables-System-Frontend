import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function submitRegister(values) {
    setIsLoading(true);
    await axios
      .post('http://localhost:4000/api/v1/auth/register ', values)
      .then(({ data }) => {
        if (data.message === 'success') {
          toast.success('.تم التسجيل بنجاح', {
            style: {
              borderRadius: '10px',
              background: '#fff',
              color: '#203864',
            },
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data.err === 'Username is already exist') {
          toast('اسم المستخدم موجود بالفعل.', {
            icon: '🙅🏻',
            style: {
              borderRadius: '10px',
              background: '#fff',
              color: '#203864',
            },
          });
        }
        setIsLoading(false);
      });
  }

  let validationSchema = Yup.object({
    username: Yup.string()
      .min(4, 'يجب أن يكون اسم المستخدم من 4 حروف على الأقل')
      .max(20, 'يجب أن يكون اسم المستخدم من 20 حروف على الأكثر')
      .required('اسم المستخدم مطلوب'),

    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'الحد الأدنى ثمانية أحرف، حرف واحد ورقم واحد على الأقل'
      )
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'يجب أن تتطابق كلمة المرور مع تاكيد كلمة المرور'
      )
      .required('Re-Password is required'),
  });

  let formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      <Helmet>
        <title>تسجيل</title>
      </Helmet>
      <div className='flex justify-center items-center '>
        <div className='card bg-slate-100  rounded-lg shadow-lg m-5 p-5 lg:w-1/3 '>
          <h1 className='text-xl font-bold text-[#203864] my-2'>
            تسجيل مستخدم جديد
          </h1>
          <form className='flex flex-col' onSubmit={formik.handleSubmit}>
            <label htmlFor='username' className='text-[#203864] my-1'>
              إسم المستخدم
            </label>
            <input
              className='border border-gray-300 rounded p-2 my-2 focus:outline-none focus:outline-offset-0 focus:outline-2 focus:outline-[#32579ca8] text-[#203864] text-sm font-normal'
              type='text'
              placeholder='إسم المستخدم'
              name='username'
              id='username'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              autoComplete='username'
            />
            {formik.errors.username && formik.touched.username ? (
              <div
                className='bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-2   dark:bg-red-800/10 dark:border-red-900 dark:text-red-500'
                role='alert'
              >
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='flex-shrink-0 h-4 w-4 mt-0.5'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <path d='m15 9-6 6' />
                      <path d='m9 9 6 6' />
                    </svg>
                  </div>
                  <div className='ms-4'>
                    <h3 className='text-sm font-semibold'>
                      {formik.errors.username}
                    </h3>
                  </div>
                </div>
              </div>
            ) : null}
            <label htmlFor='password' className='text-[#203864] my-1'>
              كلمة المرور
            </label>
            <input
              className='border border-gray-300 rounded p-2 my-2 focus:outline-none focus:outline-offset-0 focus:outline-2 focus:outline-[#32579ca8] text-[#203864] text-sm font-normal'
              type='password'
              placeholder='كلمة المرور'
              name='password'
              id='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              autoComplete='new-password'
            />
            {formik.errors.password && formik.touched.password ? (
              <div
                className='bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-2   dark:bg-red-800/10 dark:border-red-900 dark:text-red-500'
                role='alert'
              >
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='flex-shrink-0 h-4 w-4 mt-0.5'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <path d='m15 9-6 6' />
                      <path d='m9 9 6 6' />
                    </svg>
                  </div>
                  <div className='ms-4'>
                    <h3 className='text-sm font-semibold'>
                      {formik.errors.password}
                    </h3>
                  </div>
                </div>
              </div>
            ) : null}
            <label htmlFor='rePassword' className='text-[#203864] my-1'>
              تأكيد كلمة المرور
            </label>
            <input
              className='border border-gray-300 rounded p-2 my-2 focus:outline-none focus:outline-offset-0 focus:outline-2 focus:outline-[#32579ca8] text-[#203864] text-sm font-normal'
              type='password'
              placeholder='تأكيد كلمة المرور'
              name='rePassword'
              id='rePassword'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              autoComplete='rePassword'
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                className='bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-2   dark:bg-red-800/10 dark:border-red-900 dark:text-red-500'
                role='alert'
              >
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <svg
                      className='flex-shrink-0 h-4 w-4 mt-0.5'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <path d='m15 9-6 6' />
                      <path d='m9 9 6 6' />
                    </svg>
                  </div>
                  <div className='ms-4'>
                    <h3 className='text-sm font-semibold'>
                      {formik.errors.rePassword}
                    </h3>
                  </div>
                </div>
              </div>
            ) : null}
            {isLoading ? (
              <button
                disabled
                className='disabled:bg-[#526b99] text-white py-2 my-2 rounded w-full'
              >
                <span>
                  جاري التسجيل <i className='fas fa-spinner fa-spin-pulse'></i>
                </span>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type='submit'
                className='bg-[#29477f] disabled:bg-[#526b99] text-white py-2 my-2 rounded w-full'
              >
                تسجيل
              </button>
            )}
          </form>

          <span className='text-[#29477f]'> لديك حساب بالفعل؟</span>
          <Link className='text-[#29477f] py-2 my-2 ms-2 ' to={'/auth/login'}>
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
