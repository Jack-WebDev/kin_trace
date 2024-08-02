// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, Button, Loader, ResponseMessage, useToast } from "@/packages/ui";
// import { z } from "zod";
// import { FormInput } from "@/packages/ui";
// import { clientApi } from "@/client/react";
// import Image from "next/image";

// const forgotPasswordSchema = z.object({
//   email: z.string().email().refine((email) => email.endsWith("@ndt.co.za"), {
//     message: "Email must be a valid NDT email",
//   }),   
// });

// type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

// export function ForgotPasswordForm() {
//   const [successMessage, setSuccessMessage] = useState<string>("");
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const { toast } = useToast();

//   const form = useForm<forgotPasswordSchemaType>({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {},
//   });

//   const forgotPasswordMutation = clientApi.auths.forgotPassword.useMutation({
//     onSuccess: (data) => {
//       setSuccessMessage(data.message);
//       location.reload();
//     },
//     onError: (error) => {
//       setErrorMessage(error.message);
//       toast({
//         variant: "error",
//         title: "Error!",
//         description: error.message || "Unknown error",
//       });
//     },
//   });

//   async function onSubmit(values: forgotPasswordSchemaType) {
//     setSuccessMessage("");
//     setErrorMessage("");

//     forgotPasswordMutation.mutate(values);
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className=" flex w-full flex-col gap-6  px-0 text-gray-500"
//       >
//                   <Image src={"/7070628_3275432.svg"} alt="" width={400} height={400} />
//           <div className="flex flex-col justify-center items-start gap-y-4">
//             <>
//               <h1 className="text-5xl font-semibold text-secondary">
//                 Forgot Password?
//               </h1>
//               <p className="text-md text-gray-500">
//                 Enter your NDT email address and we&apos;ll send you an OTP to
//                 reset your password.
//               </p>
//             </>
//           </div>
//         <FormInput
//           placeholder="example@mail.com"
//           label="Email"
//           name="email"
//           fullWidth={true}
//         />
//         {forgotPasswordMutation.isPending? (
//           <Loader />
//         ) : (
//           <Button type="submit" className="login_btn w-full hover:bg-[#dda83a]">
//               Send Reset Password Email
//               </Button>
//         )}
//         <ResponseMessage
//           errorMessage={errorMessage}
//           successMessage={successMessage}
//         />
//       </form>
//     </Form>
//   );
// }
