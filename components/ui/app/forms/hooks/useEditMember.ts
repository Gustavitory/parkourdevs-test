import { TValidPhones, ValidPhones } from "@/lib/dto/TeamMember";
import { ValidationError } from "@/lib/err/types";
import { createMember, updateMember } from "@/lib/members/mutations";
import { CompleteTeamMembers } from "@/prisma/zod";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useTeamMembersContext } from "../../contexts/TeamMembersContext";

interface TFormData extends Record<string, string> {
  email: string;
  name: string;
  phone: string;
  address: string;
  salary: string;
  id: string;
}

const initialState: TFormData = {
  email: "",
  name: "",
  phone: "",
  address: "",
  salary: "",
  id: "",
};

export const useEditMember = () => {
  const [isEditingMember, startTransition] = useTransition();
  const [Member, setMember] = useState<TFormData>(initialState);
  const [error, setError] = useState<Record<string, string>>({});
  const { update } = useTeamMembersContext();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...Member,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    errorValidations(Member);
  }, [Member]);

  const getPropsToChange = (): Partial<CompleteTeamMembers> => {
    const PropsToChange: Record<string, string | number> = {};

    for (const prop in Member) {
      if (Member[prop] !== "") {
        const parsed = Number(Member[prop]);
        PropsToChange[prop] = Member[prop];
        if (!isNaN(parsed) && typeof parsed === "number") {
          PropsToChange[prop] = parsed;
        }
      }
    }
    return PropsToChange as Partial<CompleteTeamMembers>;
  };

  const handleSubmit = async (e: React.SyntheticEvent, itemId: string) => {
    e.preventDefault();
    const validated = errorValidations(Member);
    if (!validated) return "invalid";

    const propsToChange = getPropsToChange();
    startTransition(async () => {
      await update(itemId, propsToChange);
    });
  };

  const errorValidations = (data: TFormData): boolean => {
    const { email, name, phone, address, salary, id } = data;
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const parsedId = Number(id);
    if (name.length < 2 && name.length > 0) {
      setError({ name: "Name must contain at least two letters" });
    }
    if (id.length !== 0) {
      if (isNaN(parsedId) || typeof parsedId !== "number") {
        setError({ id: "Id must be a number" });
        return false;
      }
      if (parsedId < 10000000) {
        setError({ id: "Id must be greater than 10.000.000" });
        return false;
      }
    }
    if (!regex.test(email) && email.length !== 0) {
      setError({ email: "Invalid email" });
      return false;
    }
    let phoneInit = phone.slice(0, 4);
    if (phone.length !== 0) {
      if (phone.length < 11 || !ValidPhones[phoneInit as TValidPhones]) {
        setError({ phone: "Invalid phone number, example: 04240000000" });
        return false;
      }
    }
    if (address.length !== 0 && address.length < 10) {
      setError({ address: "Address must have at least (10) characters" });
      return false;
    }
    const parsedSalary = Number(salary);
    if (salary.length !== 0) {
      if (isNaN(parsedSalary) || typeof parsedSalary !== "number") {
        setError({ salary: "Salary must be a number" });
        return false;
      }
    }
    setError({});
    return true;
  };
  return {
    error,
    handleSubmit,
    onChange,
    isEditingMember,
  };
};
