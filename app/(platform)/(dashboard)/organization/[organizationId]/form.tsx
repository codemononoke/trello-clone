"use client";
import React from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { createdBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import FormInput from "@/components/form/form-input";

const Form = () => {
  const { execute, fieldErrors } = useAction(createdBoard, {
    onSuccess: (data) => {
      console.log("SUCCESS:", data);
    },
    onError: (error) => {
      console.log("ERROR:", error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };
  return (
    <form action={onSubmit}>
      <div className=" flex flex-col space-y-2">
        <FormInput label="Board Title" id="title" errors={fieldErrors} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
