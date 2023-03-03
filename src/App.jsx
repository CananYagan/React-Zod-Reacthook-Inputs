import { useForm ,useWatch} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { DevTool } from "@hookform/devtools";

const schema = z.object({
  name: z.string().min(1, { message: "İsim boş bırakılamaz" }),
  password: z
    .number({
      invalid_type_error: "Boş bırakılamaz",
    })
    .min(5, { message: "Yaş 10 dan küçük olamaz" }),

  date: z.string({
    required_error: "Please select a date and time",
    invalid_type_error: "Bu bir tarih değil!",
  }),

  isActive: z.literal(true, {
      errorMap: () => ({ message: "Lüfen Kutucuğu işaretleyiniz." }),
    }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
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
    // defaultValues:{
    //   name:"Canan",
    //   date:new Date(),
    //   password:1234,
    //   isActive:true
    // },
    resolver: zodResolver(schema),
  });
   console.log(errors)
  return (
    <>
      <Form
        onSubmit={handleSubmit((onSubmit))}
      >
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg">
            Enter Name
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

        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-lg2">Email</InputGroup.Text>
          <Form.Control
            type="text"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            {...register("email")}
          />
        </InputGroup>
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <InputGroup size="lg" className="mb-3" >
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
          {...register("isActive")}
        />
        </InputGroup>
        {errors.isActive?.message && <p>{errors.isActive?.message}</p>}




        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
}
export default App