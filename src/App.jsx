import { useForm } from "react-hook-form";
import {  z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const schema = z.object({
  name: z.string().min(1, { message: "İsim boş bırakılamaz" }),
  password: z.number({
    invalid_type_error :"Boş bırakılamaz",
  }).min(10,{ message: "Yaş 10 dan küçük olamaz" }),

  date:z.date(new Date(),{
    required_error: "Please select a date and time",
    invalid_type_error: "Bu bir tarih değil!",
  }),

  isActive :z.boolean({
    required_error: "isActive is required",
    invalid_type_error: "isActive boolean olmalı",
  })
});



export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    // defaultValues:{
    //   name:"Canan",
    //   date:new Date(),
    //   password:1234,
    //   isActive:true
    // },
    resolver: zodResolver(schema),
  });

  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(values=>{alert(JSON.stringify(values,null,4))})}>
    
      <InputGroup size="lg" className="mb-3"  {...register('name')}>
      <InputGroup.Text id="inputGroup-sizing-lg">Enter Name</InputGroup.Text>
      <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <InputGroup size="lg" className="mb-3"  {...register('password', { valueAsNumber: true })}>
      <InputGroup.Text id="inputGroup-sizing-lg1">Password</InputGroup.Text>
      <Form.Control
      type="password"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      {errors.password?.message && <p>{errors.password?.message}</p>}

      <InputGroup size="lg" className="mb-3"  {...register('date')}>
      <InputGroup.Text id="inputGroup-sizing-lg2">Date</InputGroup.Text>
      <Form.Control
          type="date"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      {errors.date?.message && <p>{errors.date?.message}</p>}


      <InputGroup size="lg" className="mb-3" >
      <InputGroup.Text id="inputGroup-sizing-lg3">isActive</InputGroup.Text>
        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        <Form.Control aria-label="Text input with checkbox" />
      </InputGroup>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
  );
}