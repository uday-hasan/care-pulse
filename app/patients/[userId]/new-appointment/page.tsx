import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt="Care Pulse Logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          <p className="justify-items-end text-dark-600 xl:text-left">
            &copy; 2024 Care Pulse
          </p>
        </div>
      </section>
      <Image
        src={"/assets/images/appointment-img.png"}
        alt="Patient"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
}
