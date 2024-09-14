import { Box } from '@mui/material';
import { Formik } from 'formik';


type FormContainerProps = {
  initialValue: {
    [key:string]: any;
  },
  validationSchema: {
    [key: string]: any;
  },
  children: any;
  onSubmit: () => void;
}

const FormContainer = (props:FormContainerProps) => {
  return (
    <Box>
      <Formik initialValues={props.initialValue} validationSchema={props.validationSchema} onSubmit={() => {
        props.onSubmit();
      }}>
        {
          props.children
        }
      </Formik>
    </Box>
  )
}

export default FormContainer;