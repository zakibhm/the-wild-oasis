import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCancel }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const { isLoading: isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  if (isWorking) {
    return <Spinner />;
  }
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      return editCabin(
        {
          newCabin: { ...data, image },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCancel?.();
          },
        }
      );
    } else {
      return createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCancel?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCancel ? "modal" : "regular"}
    >
      <FormRow label={"Cabin name"} error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "Minimum capacity is 1" },
            max: { value: 20, message: "Maximum capacity is 10" },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 1, message: "Minimum price is 1" },
            max: { value: 1000, message: "Maximum price is 1000" },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            min: { value: 0, message: "Minimum discount is 0" },
            validate: (value) => {
              const regularPrice = Number(getValues("regularPrice"));
              const discountValue = Number(value);

              return (
                discountValue <= regularPrice ||
                "Discount cannot be higher than the regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label={"Image"} error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCancel?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Update" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
