import './home.css'
import dataStates from '../../data/dataStates'
import dataDepartments from '../../data/dataDepartments'
import { Formik, Field, Form } from 'formik'

const Home = () => {
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

  return (
    <main className="home">
      <h2 className="home-title">Create employee</h2>
      <div className="home-container">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values)
            setSubmitting(false)
            resetForm()
          }}
        >
          <Form className="home-form">
            <div className="form-div">
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" required type="text" />
            </div>

            <div className="form-div">
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" type="text" />
            </div>

            <div className="form-div">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Field id="dateOfBirth" name="dateOfBirth" type="date" />
            </div>

            <div className="form-div">
              <label htmlFor="startDate">Start Date</label>
              <Field id="startDate" name="startDate" type="date" />
            </div>

            <fieldset className="form-address">
              <legend>Address:</legend>

              <div className="form-div">
                <label htmlFor="street">Street</label>
                <Field id="street" name="street" type="text" />
              </div>

              <div className="form-div">
                <label htmlFor="city">City</label>
                <Field id="city" name="city" type="text" />
              </div>

              <div className="form-div">
                <label htmlFor="state">State</label>
                <Field
                  id="state"
                  name="state"
                  as="select"
                  className="from__select"
                >
                  {dataStates.map((option, index) => (
                    <option value={option.abbreviation} key={index}>
                      {option.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="form-div">
                <label htmlFor="zipCode">Zip Code</label>
                <Field id="zipCode" name="zipCode" type="number" />
              </div>
            </fieldset>

            <div className="form-div">
              <label htmlFor="department">Department</label>
              <Field
                id="department"
                name="department"
                as="select"
                className="from__select"
              >
                {dataDepartments.map((option, index) => (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>

            <button type="submit" className="from-button">
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  )
}
export default Home
