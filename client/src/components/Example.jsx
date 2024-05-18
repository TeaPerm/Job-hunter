import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

function Example() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ name: "item1" }, { name: "item2" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`items.${index}.name`)}
            defaultValue={field.name}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "" })}>
        Add Item
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
export default Example;

// {
//   "items": [
//       {
//           "name": "item1"
//       },
//       {
//           "name": "item2"
//       },
//       {
//           "name": "sad"
//       }
//   ]
// }