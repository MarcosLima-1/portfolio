import { createFormHook } from "@tanstack/react-form";
import { NumberField } from "@/modules/form/components/form-fields/number-field";
import { PasswordField } from "@/modules/form/components/form-fields/password-field";
import { SubmitButton } from "@/modules/form/components/form-fields/submit-button";
import { TextField } from "@/modules/form/components/form-fields/text-field";
import { TextareaField } from "@/modules/form/components/form-fields/textarea-field";
import { fieldContext, formContext } from "../context/app-form-context";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		TextareaField,
		PasswordField,
		NumberField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
