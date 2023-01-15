import React from 'react'
import './home.css'
import dataStates from '../../data/dataStates'
import dataDepartments from '../../data/dataDepartments'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { createEmployee } from '../../redux/employeeSlice'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Modal } from '@loic-anael/simple-component-modal'

const Home = () => {
  const dispatch = useDispatch()
  const [isShow, setIsShow] = React.useState(false)
  const closeModal = () => {
    setIsShow(!isShow)
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: 'Select a state...',
    zipCode: '',
    department: 'Select a department...',
  }
  //input errors messages config
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'This entry is too small')
      .max(15, 'This entry is too long')
      .required('This field is required'),
    lastName: Yup.string()
      .min(3, 'This entry is too small')
      .max(15, 'This entry is too long')
      .required('This field is required'),
    dateOfBirth: Yup.date().required('This field is required'),
    startDate: Yup.date().required('This field is required'),
    street: Yup.string()
      .min(4, 'This entry is too small')
      .max(25, 'This entry is too long')
      .required('This field is required'),
    city: Yup.string()
      .min(3, 'This entry is too small')
      .max(10, 'This entry is too long')
      .required('This field is required'),
    state: Yup.string().required('This field is required'),
    zipCode: Yup.string()
      .min(3, 'This entry is too small')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('This field is required'),
    department: Yup.string().required('This field is required'),
  })
  return (
    <main className="home">
      <h2 className="home-title">Create employee</h2>
      <div className="home-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values)
            setIsShow(true)
            dispatch(createEmployee(values))
            setSubmitting(false)
            resetForm()
          }}
        >
          <Form className="home-form">
            <div className="form-div">
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" required type="text" />
              <ErrorMessage
                name="firstName"
                component="span"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" required type="text" />
              <ErrorMessage
                name="lastName"
                component="span"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Field id="dateOfBirth" name="dateOfBirth" required type="date" />
              <ErrorMessage
                name="dateOfBirth"
                component="span"
                className="form-error"
              />
            </div>

            <div className="form-div">
              <label htmlFor="startDate">Start Date</label>
              <Field id="startDate" name="startDate" required type="date" />
              <ErrorMessage
                name="startDate"
                component="span"
                className="form-error"
              />
            </div>

            <fieldset className="form-address">
              <legend>Address:</legend>

              <div className="form-div">
                <label htmlFor="street">Street</label>
                <Field id="street" name="street" required type="text" />
                <ErrorMessage
                  name="street"
                  component="span"
                  className="form-error"
                />
              </div>

              <div className="form-div">
                <label htmlFor="city">City</label>
                <Field id="city" name="city" required type="text" />
                <ErrorMessage
                  name="city"
                  component="span"
                  className="form-error"
                />
              </div>

              <div className="form-div">
                <label htmlFor="state">State</label>
                <Field
                  id="state"
                  name="state"
                  as="select"
                  required
                  className="from__select"
                >
                  {dataStates.map((option, index) => (
                    <option value={option.abbreviation} key={index}>
                      {option.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="state"
                  component="span"
                  className="form-error"
                />
              </div>

              <div className="form-div">
                <label htmlFor="zipCode">Zip Code</label>
                <Field id="zipCode" name="zipCode" required type="number" />
                <ErrorMessage
                  name="zipCode"
                  component="span"
                  className="form-error"
                />
              </div>
            </fieldset>

            <div className="form-div">
              <label htmlFor="department">Department</label>
              <Field
                id="department"
                name="department"
                as="select"
                required
                className="from-select"
              >
                {dataDepartments.map((option, index) => (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="department"
                component="span"
                className="form-error"
              />
            </div>

            <button type="submit" className="from-button">
              Save
            </button>
          </Form>
        </Formik>
        {isShow && (
          <Modal text="Employee add" closeModal={() => closeModal()} />
        )}
      </div>
    </main>
  )
}

export default Home
