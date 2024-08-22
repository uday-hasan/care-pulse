"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerUser } from "@/lib/actions/patient.action";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField from "../CustomFormField";
import FileUploader from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./PatientForm";

// const RegisterForm = ({ user }: { user: User }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const form = useForm<z.infer<typeof PatientFormValidation>>({
//     resolver: zodResolver(PatientFormValidation),
//     defaultValues: {
//       ...PatientFormDefaultValues,
//       name: "",
//       email: "",
//       phone: "",
//     },
//   });

//   // 2. Define a submit handler.
//   // async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
//   //   setLoading(true);
//   //   console.log({ values });
//   //   let formData;
//   //   if (values.identificationDocument && values.identificationDocument.length) {
//   //     const blob = new Blob([values.identificationDocument[0]], {
//   //       type: values.identificationDocument[0].type,
//   //     });
//   //     formData = new FormData();
//   //     formData.append("blobFile", blob);
//   //     formData.append("fileName", values.identificationDocument[0].name);
//   //   }
//   //   try {
//   //     const patientData = {
//   //       ...values,
//   //       userId: user.$id,
//   //       identificationDocument: formData,
//   //     };
//   //     const patient = await registerUser(patientData);
//   //     if (patient) router.push(`/patients/${user.$id}/new-appointment`);
//   //   } catch (error) {
//   //     console.log(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   //   console.log(values);
//   // }

//   async function onFormSubmit(values: z.infer<typeof PatientFormValidation>) {
//     try {
//       console.log({ values });
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onFormSubmit)}
//         className="space-y-12 flex-1"
//       >
//         <section className=" space-y-4">
//           <h1 className="header">Welcome </h1>
//           <p className="text-dark-700">Let us know more about you.</p>
//         </section>

//         <section className=" space-y-6">
//           <div className="mb-9 space-y-1">
//             <h1 className="sub-header">Personal Information</h1>
//           </div>
//         </section>
//         <CustomFormField
//           control={form.control}
//           fieldType={FormFieldType.INPUT}
//           name="name"
//           label="Full Name"
//           placeholder="John Doe"
//           icon="/assets/icons/user.svg"
//           iconAlt="user"
//         />

//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.INPUT}
//             name="email"
//             label="Email"
//             placeholder="john@example.com"
//             icon="/assets/icons/email.svg"
//             iconAlt="email"
//           />
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.PHONE_INPUT}
//             name="phone"
//             label="Phone Number"
//             placeholder="(+880) 17XXXXXXXX"
//           />
//         </div>

//         {/* Gender and Date Of Birth */}
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.DATE_PICKER}
//             name="birthDate"
//             label="Date Of Birth"
//           />
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.SKELETON}
//             name="gender"
//             label="Gender"
//             renderSkeleton={(field) => (
//               <FormControl>
//                 <RadioGroup
//                   className="flex h-11 gap-6 xl:justify-between"
//                   onValueChange={field.onChange}
//                   defaultValue={field.value || "Male"}
//                 >
//                   {GenderOptions.map((item) => (
//                     <div key={item} className="radio-group">
//                       <RadioGroupItem value={item} id={item} />
//                       <Label className="cursor-pointer" htmlFor={item}>
//                         {item}
//                       </Label>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             )}
//           />
//         </div>
//         {/* Gender and Date Of Birth */}

//         {/* Address and Occupation */}
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.INPUT}
//             name="address"
//             label="Address"
//             placeholder="14th street, New York"
//           />
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.INPUT}
//             name="occupation"
//             label="Occupation"
//             placeholder="Software Engineer"
//           />
//         </div>
//         {/* Address and Occupation */}

//         {/* Emergendy Contact Information */}
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.INPUT}
//             name="emergencyContactName"
//             label="Emergency Contact Name"
//             placeholder="Gurdian's Name"
//           />
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.PHONE_INPUT}
//             name="emergencyContactNumber"
//             label="Emergency Contact Number"
//             placeholder="(+880) 17XXXXXXXX"
//           />
//         </div>
//         {/* Emergendy Contact Information */}

//         {/* Medical Information Section Start */}
//         <section className=" space-y-6">
//           <div className="mb-9 space-y-1">
//             <h1 className="sub-header">Medical Information</h1>
//           </div>
//         </section>

//         {/* Primary Physican */}
//         <CustomFormField
//           control={form.control}
//           fieldType={FormFieldType.SELECT}
//           name="primaryPhysican"
//           label="Primary Physican"
//           placeholder="Select a Physican"
//         >
//           {Doctors.map((doctor) => (
//             <SelectItem key={doctor.name} value={doctor.name}>
//               <div className="flex cursor-pointer items-center gap-2">
//                 <Image
//                   src={doctor.image}
//                   alt={doctor.name}
//                   width={32}
//                   height={32}
//                   className="rounded-full border border-dark-500"
//                 />
//                 <p>{doctor.name}</p>
//               </div>
//             </SelectItem>
//           ))}
//         </CustomFormField>

//         {/* Insurance Provider */}
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.INPUT}
//             name="insuranceProvider"
//             label="Insurance Provider"
//             placeholder="Blue Shield"
//           />
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.INPUT}
//             name="insurancePolicyNumber"
//             label="Insurance Policy Number"
//             placeholder="123123123"
//           />
//         </div>

//         {/* Allergies */}
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.TEXTAREA}
//             name="allergies"
//             label="Allergies (if any)"
//             placeholder="Peanuts, Beef"
//           />
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.TEXTAREA}
//             name="currentMedication"
//             label="Current Medication (if any)"
//             placeholder="Paracetamol 200mg"
//           />
//         </div>

//         {/* Family Medication */}
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.TEXTAREA}
//             name="familyMedicalHistory"
//             label="Family Medical History(if any)"
//             placeholder="Father has allergies."
//           />
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.TEXTAREA}
//             name="pastMedicalHistory"
//             label="Past Medical History(if any)"
//             placeholder="Eye Problem"
//           />
//         </div>

//         {/* Identification and verification */}
//         <section className=" space-y-6">
//           <div className="mb-9 space-y-1">
//             <h1 className="sub-header">Identification and Verification</h1>
//           </div>
//         </section>

//         <CustomFormField
//           control={form.control}
//           fieldType={FormFieldType.SELECT}
//           name="identificationType"
//           label="Identification Type"
//           placeholder="Select an Identification Type"
//         >
//           {IdentificationTypes.map((type) => (
//             <SelectItem key={type} value={type}>
//               <div className="flex cursor-pointer items-center gap-2">
//                 <p>{type}</p>
//               </div>
//             </SelectItem>
//           ))}
//         </CustomFormField>
//         <CustomFormField
//           control={form.control}
//           fieldType={FormFieldType.INPUT}
//           name="identificationNumber"
//           label="Identification Number"
//           placeholder="12345678"
//         />
//         <CustomFormField
//           control={form.control}
//           fieldType={FormFieldType.SKELETON}
//           name="identificationDocument"
//           label="Scanned copy of the identity document"
//           renderSkeleton={(field) => (
//             <FormControl>
//               <FileUploader files={field.value} onChange={field.onChange} />
//             </FormControl>
//           )}
//         />

//         {/* Identification and verification */}
//         <section className=" space-y-6">
//           <div className="mb-9 space-y-1">
//             <h1 className="sub-header">Privacy and consent</h1>
//           </div>
//         </section>
//         {/* <div className="flex flex-col gap-6 xl:flex-row"> */}
//         <CustomFormField
//           control={form.control}
//           fieldType={FormFieldType.CHECKBOX}
//           name="treatmentConsent"
//           label="I consent to treatment"
//         />
//         <CustomFormField
//           control={form.control}
//           fieldType={FormFieldType.CHECKBOX}
//           name="disclosureConsent"
//           label="I consent to disclosure of information"
//         />
//         <CustomFormField
//           control={form.control}
//           fieldType={FormFieldType.CHECKBOX}
//           name="privacyConsent"
//           label="I consent to privacy policy"
//         />
//         {/* </div> */}

//         <SubmitButton isLoading={loading}>REGISTER</SubmitButton>
//       </form>
//     </Form>
//   );
// };

// export default RegisterForm;
const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
      };

      const newPatient = await registerUser(patient);
      console.log(newPatient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            icon="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              icon="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder=" Software Engineer"
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance provider"
              placeholder="BlueCross BlueShield"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance policy number"
              placeholder="ABC123456789"
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Pollen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medications"
              placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
