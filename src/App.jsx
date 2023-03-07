import { useForm ,useWatch} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button,Form,InputGroup,Container,Row} from "react-bootstrap";
import { DevTool } from "@hookform/devtools";
import FormEx from "./Components/FormEx";

const schema = z.object({
  name: z.string().min(1, { message: "Bu alan boş bırakılamaz." }),
  // password: z
  //   .number({
  //     invalid_type_error: "Boş bırakılamaz.",
  //   })
  //   .min(5, { message: "Yaş 10 dan küçük olamaz" }),

  password:z.number({
       invalid_type_error: "Şifre sadece sayı olmalıdır.",
      })
       .min(5, { message: "Yaş 10 dan küçük olamaz" }).or(z.string().regex(/^\d+$/).transform(Number)),

  date: z.string({
    required_error: "Lütfen tarh seçiniz",
    invalid_type_error: "Bu bir tarih değil!",
  }),

  isActive: z.literal(true, {
      errorMap: () => ({ message: "Lütfen kutucuğu işaretleyiniz." }),
  }),
  email: z
  .string()
  .min(1, { message: "Bu alan boş bırakılamaz." })
  .email("Bu bir email değil.")
});




const onSubmit = (data) => {
  alert(JSON.stringify(data));
};


 function App() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({

    resolver: zodResolver(schema)
  });
 
 const isActiveWatch=watch("isActive")

  return (
    <>
<div class="page-header">
  <h1 className="col-md-8 mx-auto text-danger">USER LOGIN PROCESS</h1>
</div>
<br />
<br />


    <Container >
      <Form
        onSubmit={handleSubmit((onSubmit))}
      >
       
        <Row  className="col-md-12 mx-auto">
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Name Surname
          </InputGroup.Text>
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            {...register("name")}
          />
        </InputGroup>
        {errors.name?.message && <p>{errors.name?.message}</p>}
        
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg1">Password</InputGroup.Text>
          <Form.Control
            type="password"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            {...register("password", { valueAsNumber: true })}
          />
        </InputGroup>
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg2">Date</InputGroup.Text>
          <Form.Control
            type="date"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            {...register("date")}
          />
        </InputGroup>
        {errors.date?.message && <p>{errors.date?.message}</p>}

        {isActiveWatch && (<InputGroup size="lg" className="mb-3">
          <InputGroup.Text >Email</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            {...register("email")}
          />
        </InputGroup>)}
        {errors.email?.message && <p>{errors.email?.message}</p>} 

        <InputGroup size="lg" className="mb-3" id="isActive " >
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
          {...register("isActive")}
        />
        </InputGroup>
        {errors.isActive?.message && <p>{errors.isActive?.message}</p>}
         

        <Button className="mb-3"variant="primary" type="submit" >
          Submit
        </Button>
        </Row>
      </Form>
      <DevTool control={control} /> {/* set up the dev tool */}
      </Container>
    </>
  );
}
export default App