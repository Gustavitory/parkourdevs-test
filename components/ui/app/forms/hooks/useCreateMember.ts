import { TValidPhones, ValidPhones } from "@/lib/dto/TeamMember";
import { ValidationError } from "@/lib/err/types";
import { createMember } from "@/lib/members/mutations";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type TFormData = {
  email: string;
  name: string;
  phone: string;
  address: string;
  salary: string;
  id: string;
};

const initialState: TFormData = {
  email: "",
  name: "",
  phone: "",
  address: "",
  salary: "",
  id: "",
};

export const useCreateMember = () => {
  const [isCreatingMember, startTransition] = useTransition();
  const [newMember, setNewMember] = useState<TFormData>(initialState);
  const [error, setError] = useState<Record<string, string>>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    errorValidations(newMember);
  }, [newMember]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const validated = errorValidations(newMember);
    if (!validated) return "invalid";
    const { email, name, phone, address, salary, id } = newMember;
    startTransition(async () => {
      try {
        const { error, message } = await createMember({
          email,
          name,
          id: Number(id),
          phone,
          address,
          salary: Number(salary),
        });
        if (error) {
          throw new Error(message[0]);
        }
        setNewMember(initialState);
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };
  const errorValidations = (data: TFormData): boolean => {
    const { email, name, phone, address, salary, id } = data;
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name.length === 0) {
      setError({ name: "Name is required" });
      return false;
    }
    if (name.length < 2) {
      setError({ name: "Name must contain at least two letters" });
      return false;
    }
    const parsedId = Number(id);
    if (id.length === 0) {
      setError({ id: "Id is required" });
      return false;
    }
    if (isNaN(parsedId) || typeof parsedId !== "number") {
      setError({ id: "Id must be a number" });
      return false;
    }
    if (parsedId < 10000000) {
      setError({ id: "Id must be greater than 10.000.000" });
      return false;
    }
    if (!regex.test(email)) {
      setError({ email: "Invalid email" });
      return false;
    }
    let phoneInit = phone.slice(0, 4);
    if (phone.length === 0) {
      setError({ phone: "Phone is required" });
      return false;
    }
    if (phone.length < 11 || !ValidPhones[phoneInit as TValidPhones]) {
      setError({ phone: "Invalid phone number, example: 04240000000" });
      return false;
    }
    if (address.length === 0) {
      setError({ address: "Address is required" });
      return false;
    }
    const parsedSalary = Number(salary);
    if (salary.length === 0) {
      setError({ salary: "Salary is required" });
      return false;
    }
    if (isNaN(parsedSalary) || typeof parsedSalary !== "number") {
      setError({ salary: "Salary must be a number" });
      return false;
    }
    setError({});
    return true;
  };
  return {
    error,
    handleSubmit,
    onChange,
    isCreatingMember,
  };
};
